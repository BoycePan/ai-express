package com.logistics.controller;

import com.logistics.common.Result;
import com.logistics.dto.LogisticsNodeDTO;
import com.logistics.service.LogisticsService;
import com.logistics.vo.LogisticsNodeVO;
import com.logistics.vo.LogisticsTrackingVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "物流追踪", description = "物流追踪相关接口")
@RestController
@RequestMapping("/api/logistics")
public class LogisticsController {

    private final LogisticsService logisticsService;

    public LogisticsController(LogisticsService logisticsService) {
        this.logisticsService = logisticsService;
    }

    @Operation(summary = "获取物流信息", description = "根据订单ID获取物流追踪信息")
    @GetMapping("/{orderId}")
    public Result<LogisticsTrackingVO> getLogisticsByOrderId(
            @Parameter(description = "订单ID") @PathVariable Long orderId) {
        return Result.success(logisticsService.getLogisticsByOrderId(orderId));
    }

    @Operation(summary = "添加物流节点", description = "为订单添加新的物流节点")
    @PostMapping
    public Result<LogisticsNodeVO> addLogisticsNode(@Valid @RequestBody LogisticsNodeDTO nodeDTO) {
        return Result.success(logisticsService.addLogisticsNode(nodeDTO));
    }
}
