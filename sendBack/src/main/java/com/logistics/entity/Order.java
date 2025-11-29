package com.logistics.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("t_order")
@Schema(description = "订单实体")
public class Order {

    @TableId(type = IdType.AUTO)
    @Schema(description = "订单ID")
    private Long id;

    @Schema(description = "快递单号")
    private String trackingNumber;

    @Schema(description = "快递公司")
    private String courierCompany;

    @Schema(description = "快递公司Logo")
    private String courierLogo;

    @Schema(description = "订单状态(pending-待取件,in_transit-运输中,delivered-已签收,exception-异常)")
    private String status;

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

    @Schema(description = "用户ID")
    private Long userId;

    @TableField(fill = FieldFill.INSERT)
    @Schema(description = "创建时间")
    private LocalDateTime createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @Schema(description = "更新时间")
    private LocalDateTime updatedAt;

    @TableLogic
    @Schema(description = "是否删除")
    private Integer deleted;
}
