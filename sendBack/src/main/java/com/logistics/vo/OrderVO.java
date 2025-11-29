package com.logistics.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Schema(description = "订单信息")
public class OrderVO {

    @Schema(description = "订单ID")
    private Long id;

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

    @Schema(description = "物品名称")
    private String itemName;

    @Schema(description = "寄件人姓名")
    private String senderName;

    @Schema(description = "寄件人电话")
    private String senderPhone;

    @Schema(description = "寄件人地址")
    private String senderAddress;

    @Schema(description = "收件人姓名")
    private String receiverName;

    @Schema(description = "收件人电话")
    private String receiverPhone;

    @Schema(description = "收件人地址")
    private String receiverAddress;

    @Schema(description = "预计送达时间")
    private String estimatedTime;

    @Schema(description = "创建时间")
    private LocalDateTime createdAt;

    @Schema(description = "物流信息列表")
    private List<LogisticsNodeVO> logisticsNodes;
}
