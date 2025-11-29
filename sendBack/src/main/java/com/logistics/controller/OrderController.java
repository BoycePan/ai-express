package com.logistics.controller;

import com.logistics.common.Result;
import com.logistics.config.UserContext;
import com.logistics.dto.OrderCreateDTO;
import com.logistics.dto.OrderQueryDTO;
import com.logistics.dto.OrderStatusDTO;
import com.logistics.service.OrderService;
import com.logistics.vo.OrderVO;
import com.logistics.vo.PageVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "订单管理", description = "订单管理相关接口")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserContext userContext;

    public OrderController(OrderService orderService, UserContext userContext) {
        this.orderService = orderService;
        this.userContext = userContext;
    }

    @Operation(summary = "创建订单", description = "创建新的快递订单")
    @PostMapping
    public Result<OrderVO> createOrder(@Valid @RequestBody OrderCreateDTO orderCreateDTO) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(orderService.createOrder(userId, orderCreateDTO));
    }

    @Operation(summary = "获取订单列表", description = "获取当前用户的订单列表，支持分页、状态筛选和关键词搜索")
    @GetMapping
    public Result<PageVO<OrderVO>> getOrderList(OrderQueryDTO queryDTO) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(orderService.getOrderList(userId, queryDTO));
    }

    @Operation(summary = "获取订单详情", description = "根据ID获取订单详情")
    @GetMapping("/{id}")
    public Result<OrderVO> getOrderById(@PathVariable Long id) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(orderService.getOrderById(id, userId));
    }

    @Operation(summary = "更新订单状态", description = "更新指定订单的状态")
    @PutMapping("/{id}/status")
    public Result<OrderVO> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusDTO statusDTO) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(orderService.updateOrderStatus(id, userId, statusDTO));
    }

    @Operation(summary = "删除订单", description = "删除指定订单")
    @DeleteMapping("/{id}")
    public Result<Void> deleteOrder(@PathVariable Long id) {
        Long userId = userContext.getCurrentUserId();
        orderService.deleteOrder(id, userId);
        return Result.success();
    }

    @Operation(summary = "根据单号查询订单", description = "根据快递单号查询订单信息（无需登录）")
    @GetMapping("/tracking/{trackingNumber}")
    public Result<OrderVO> getOrderByTrackingNumber(
            @Parameter(description = "快递单号") @PathVariable String trackingNumber) {
        return Result.success(orderService.getOrderByTrackingNumber(trackingNumber));
    }
}
