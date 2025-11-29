package com.logistics.service;

import com.logistics.dto.OrderCreateDTO;
import com.logistics.dto.OrderQueryDTO;
import com.logistics.dto.OrderStatusDTO;
import com.logistics.vo.OrderVO;
import com.logistics.vo.PageVO;

public interface OrderService {

    OrderVO createOrder(Long userId, OrderCreateDTO orderCreateDTO);

    PageVO<OrderVO> getOrderList(Long userId, OrderQueryDTO queryDTO);

    OrderVO getOrderById(Long id, Long userId);

    OrderVO updateOrderStatus(Long id, Long userId, OrderStatusDTO statusDTO);

    void deleteOrder(Long id, Long userId);

    OrderVO getOrderByTrackingNumber(String trackingNumber);
}
