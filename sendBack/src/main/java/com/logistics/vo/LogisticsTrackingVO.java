package com.logistics.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "物流追踪信息")
public class LogisticsTrackingVO {

    @Schema(description = "订单ID")
    private Long orderId;

    @Schema(description = "快递单号")
    private String trackingNumber;

    @Schema(description = "快递公司")
    private String courierCompany;

    @Schema(description = "快递公司Logo")
    private String courierLogo;

    @Schema(description = "订单状态")
    private String status;

    @Schema(description = "订单状态文本")
    private String statusText;

    @Schema(description = "物流节点列表")
    private List<LogisticsNodeVO> nodes;
}
