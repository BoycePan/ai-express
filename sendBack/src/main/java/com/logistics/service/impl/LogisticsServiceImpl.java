package com.logistics.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.logistics.common.BusinessException;
import com.logistics.common.ResultCode;
import com.logistics.dto.LogisticsNodeDTO;
import com.logistics.entity.LogisticsNode;
import com.logistics.entity.Order;
import com.logistics.mapper.LogisticsNodeMapper;
import com.logistics.mapper.OrderMapper;
import com.logistics.service.LogisticsService;
import com.logistics.vo.LogisticsNodeVO;
import com.logistics.vo.LogisticsTrackingVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LogisticsServiceImpl implements LogisticsService {

    private final LogisticsNodeMapper logisticsNodeMapper;
    private final OrderMapper orderMapper;

    private static final Map<String, String> STATUS_TEXT_MAP = new HashMap<>();

    static {
        STATUS_TEXT_MAP.put("pending", "待取件");
        STATUS_TEXT_MAP.put("in_transit", "运输中");
        STATUS_TEXT_MAP.put("delivered", "已签收");
        STATUS_TEXT_MAP.put("exception", "异常");
    }

    public LogisticsServiceImpl(LogisticsNodeMapper logisticsNodeMapper, OrderMapper orderMapper) {
        this.logisticsNodeMapper = logisticsNodeMapper;
        this.orderMapper = orderMapper;
    }

    @Override
    public LogisticsTrackingVO getLogisticsByOrderId(Long orderId) {
        // 查询订单
        Order order = orderMapper.selectById(orderId);
        if (order == null) {
            throw new BusinessException(ResultCode.ORDER_NOT_FOUND);
        }

        // 查询物流节点
        List<LogisticsNode> nodes = logisticsNodeMapper.selectList(
                new LambdaQueryWrapper<LogisticsNode>()
                        .eq(LogisticsNode::getOrderId, orderId)
                        .orderByDesc(LogisticsNode::getTime)
        );

        // 构建返回结果
        LogisticsTrackingVO vo = new LogisticsTrackingVO();
        vo.setOrderId(orderId);
        vo.setTrackingNumber(order.getTrackingNumber());
        vo.setCourierCompany(order.getCourierCompany());
        vo.setCourierLogo(order.getCourierLogo());
        vo.setStatus(order.getStatus());
        vo.setStatusText(STATUS_TEXT_MAP.getOrDefault(order.getStatus(), "未知"));

        List<LogisticsNodeVO> nodeVOs = nodes.stream().map(node -> {
            LogisticsNodeVO nodeVO = new LogisticsNodeVO();
            BeanUtil.copyProperties(node, nodeVO);
            nodeVO.setIsActive(node.getIsActive() == 1);
            return nodeVO;
        }).collect(Collectors.toList());

        vo.setNodes(nodeVOs);

        return vo;
    }

    @Override
    @Transactional
    public LogisticsNodeVO addLogisticsNode(LogisticsNodeDTO nodeDTO) {
        // 验证订单存在
        Order order = orderMapper.selectById(nodeDTO.getOrderId());
        if (order == null) {
            throw new BusinessException(ResultCode.ORDER_NOT_FOUND);
        }

        // 如果设置为当前节点，先取消其他节点的active状态
        if (Boolean.TRUE.equals(nodeDTO.getIsActive())) {
            logisticsNodeMapper.update(null,
                    new LambdaUpdateWrapper<LogisticsNode>()
                            .eq(LogisticsNode::getOrderId, nodeDTO.getOrderId())
                            .set(LogisticsNode::getIsActive, 0)
            );
        }

        // 创建新节点
        LogisticsNode node = new LogisticsNode();
        node.setOrderId(nodeDTO.getOrderId());
        node.setTrackingNumber(order.getTrackingNumber());
        node.setTime(nodeDTO.getTime() != null ? nodeDTO.getTime() : LocalDateTime.now());
        node.setLocation(nodeDTO.getLocation());
        node.setStatus(nodeDTO.getStatus());
        node.setDescription(nodeDTO.getDescription());
        node.setIsActive(Boolean.TRUE.equals(nodeDTO.getIsActive()) ? 1 : 0);

        logisticsNodeMapper.insert(node);

        // 返回结果
        LogisticsNodeVO vo = new LogisticsNodeVO();
        BeanUtil.copyProperties(node, vo);
        vo.setIsActive(node.getIsActive() == 1);

        return vo;
    }
}
