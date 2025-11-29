package com.logistics.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.logistics.common.BusinessException;
import com.logistics.common.ResultCode;
import com.logistics.dto.OrderCreateDTO;
import com.logistics.dto.OrderQueryDTO;
import com.logistics.dto.OrderStatusDTO;
import com.logistics.entity.LogisticsNode;
import com.logistics.entity.Order;
import com.logistics.mapper.LogisticsNodeMapper;
import com.logistics.mapper.OrderMapper;
import com.logistics.service.OrderService;
import com.logistics.vo.LogisticsNodeVO;
import com.logistics.vo.OrderVO;
import com.logistics.vo.PageVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;
    private final LogisticsNodeMapper logisticsNodeMapper;

    private static final Map<String, String> STATUS_TEXT_MAP = new HashMap<>();

    static {
        STATUS_TEXT_MAP.put("pending", "待取件");
        STATUS_TEXT_MAP.put("in_transit", "运输中");
        STATUS_TEXT_MAP.put("delivered", "已签收");
        STATUS_TEXT_MAP.put("exception", "异常");
    }

    public OrderServiceImpl(OrderMapper orderMapper, LogisticsNodeMapper logisticsNodeMapper) {
        this.orderMapper = orderMapper;
        this.logisticsNodeMapper = logisticsNodeMapper;
    }

    @Override
    @Transactional
    public OrderVO createOrder(Long userId, OrderCreateDTO orderCreateDTO) {
        Order order = new Order();
        BeanUtil.copyProperties(orderCreateDTO, order);
        order.setUserId(userId);
        order.setStatus("pending");
        // 生成快递单号
        order.setTrackingNumber(generateTrackingNumber(orderCreateDTO.getCourierCompany()));

        orderMapper.insert(order);

        // 创建初始物流节点
        LogisticsNode node = new LogisticsNode();
        node.setOrderId(order.getId());
        node.setTrackingNumber(order.getTrackingNumber());
        node.setTime(LocalDateTime.now());
        node.setLocation(extractCity(orderCreateDTO.getSenderAddress()));
        node.setStatus("待取件");
        node.setDescription("快递员已接单，等待上门取件");
        node.setIsActive(1);
        logisticsNodeMapper.insert(node);

        return convertToOrderVO(order);
    }

    @Override
    public PageVO<OrderVO> getOrderList(Long userId, OrderQueryDTO queryDTO) {
        LambdaQueryWrapper<Order> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Order::getUserId, userId);

        // 状态筛选
        if (StrUtil.isNotBlank(queryDTO.getStatus())) {
            queryWrapper.eq(Order::getStatus, queryDTO.getStatus());
        }

        // 关键词搜索
        if (StrUtil.isNotBlank(queryDTO.getKeyword())) {
            queryWrapper.and(w -> w
                    .like(Order::getTrackingNumber, queryDTO.getKeyword())
                    .or().like(Order::getReceiverName, queryDTO.getKeyword())
                    .or().like(Order::getReceiverPhone, queryDTO.getKeyword())
                    .or().like(Order::getSenderName, queryDTO.getKeyword())
            );
        }

        queryWrapper.orderByDesc(Order::getCreatedAt);

        Page<Order> page = new Page<>(queryDTO.getPage(), queryDTO.getPageSize());
        Page<Order> result = orderMapper.selectPage(page, queryWrapper);

        List<OrderVO> orderVOList = result.getRecords().stream()
                .map(this::convertToOrderVO)
                .collect(Collectors.toList());

        return PageVO.of(orderVOList, result.getTotal(), queryDTO.getPage(), queryDTO.getPageSize());
    }

    @Override
    public OrderVO getOrderById(Long id, Long userId) {
        Order order = orderMapper.selectOne(
                new LambdaQueryWrapper<Order>()
                        .eq(Order::getId, id)
                        .eq(Order::getUserId, userId)
        );

        if (order == null) {
            throw new BusinessException(ResultCode.ORDER_NOT_FOUND);
        }

        OrderVO orderVO = convertToOrderVO(order);
        // 加载物流信息
        orderVO.setLogisticsNodes(getLogisticsNodes(order.getId()));

        return orderVO;
    }

    @Override
    @Transactional
    public OrderVO updateOrderStatus(Long id, Long userId, OrderStatusDTO statusDTO) {
        Order order = orderMapper.selectOne(
                new LambdaQueryWrapper<Order>()
                        .eq(Order::getId, id)
                        .eq(Order::getUserId, userId)
        );

        if (order == null) {
            throw new BusinessException(ResultCode.ORDER_NOT_FOUND);
        }

        order.setStatus(statusDTO.getStatus());
        orderMapper.updateById(order);

        return convertToOrderVO(order);
    }

    @Override
    public void deleteOrder(Long id, Long userId) {
        int rows = orderMapper.delete(
                new LambdaQueryWrapper<Order>()
                        .eq(Order::getId, id)
                        .eq(Order::getUserId, userId)
        );

        if (rows == 0) {
            throw new BusinessException(ResultCode.ORDER_NOT_FOUND);
        }
    }

    @Override
    public OrderVO getOrderByTrackingNumber(String trackingNumber) {
        Order order = orderMapper.selectOne(
                new LambdaQueryWrapper<Order>()
                        .eq(Order::getTrackingNumber, trackingNumber)
        );

        if (order == null) {
            throw new BusinessException(ResultCode.ORDER_NOT_FOUND);
        }

        OrderVO orderVO = convertToOrderVO(order);
        orderVO.setLogisticsNodes(getLogisticsNodes(order.getId()));

        return orderVO;
    }

    private List<LogisticsNodeVO> getLogisticsNodes(Long orderId) {
        List<LogisticsNode> nodes = logisticsNodeMapper.selectList(
                new LambdaQueryWrapper<LogisticsNode>()
                        .eq(LogisticsNode::getOrderId, orderId)
                        .orderByDesc(LogisticsNode::getTime)
        );

        return nodes.stream().map(node -> {
            LogisticsNodeVO vo = new LogisticsNodeVO();
            BeanUtil.copyProperties(node, vo);
            vo.setIsActive(node.getIsActive() == 1);
            return vo;
        }).collect(Collectors.toList());
    }

    private OrderVO convertToOrderVO(Order order) {
        OrderVO vo = new OrderVO();
        BeanUtil.copyProperties(order, vo);
        vo.setStatusText(STATUS_TEXT_MAP.getOrDefault(order.getStatus(), "未知"));
        return vo;
    }

    private String generateTrackingNumber(String courierCompany) {
        String prefix;
        if (courierCompany.contains("顺丰")) {
            prefix = "SF";
        } else if (courierCompany.contains("圆通")) {
            prefix = "YT";
        } else if (courierCompany.contains("中通")) {
            prefix = "ZTO";
        } else if (courierCompany.contains("韵达")) {
            prefix = "YD";
        } else if (courierCompany.contains("申通")) {
            prefix = "STO";
        } else {
            prefix = "EX";
        }
        return prefix + IdUtil.getSnowflakeNextIdStr().substring(0, 12);
    }

    private String extractCity(String address) {
        // 简单提取城市名
        if (address.contains("市")) {
            int idx = address.indexOf("市");
            int start = Math.max(0, idx - 5);
            String sub = address.substring(start, idx + 1);
            // 查找省份后的位置
            int provinceEnd = sub.lastIndexOf("省");
            if (provinceEnd >= 0) {
                return sub.substring(provinceEnd + 1);
            }
            return sub;
        }
        return address.length() > 10 ? address.substring(0, 10) : address;
    }
}
