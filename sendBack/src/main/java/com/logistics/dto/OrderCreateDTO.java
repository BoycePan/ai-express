package com.logistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(description = "创建订单请求")
public class OrderCreateDTO {

    @NotBlank(message = "快递公司不能为空")
    @Schema(description = "快递公司", example = "顺丰速运")
    private String courierCompany;

    @Schema(description = "快递公司Logo")
    private String courierLogo;

    @Schema(description = "物品名称", example = "电子产品")
    private String itemName;

    @NotBlank(message = "寄件人姓名不能为空")
    @Schema(description = "寄件人姓名", example = "张三")
    private String senderName;

    @NotBlank(message = "寄件人电话不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "寄件人手机号格式不正确")
    @Schema(description = "寄件人电话", example = "13800138001")
    private String senderPhone;

    @NotBlank(message = "寄件人地址不能为空")
    @Schema(description = "寄件人地址", example = "广东省深圳市南山区科技园南路88号")
    private String senderAddress;

    @NotBlank(message = "收件人姓名不能为空")
    @Schema(description = "收件人姓名", example = "李四")
    private String receiverName;

    @NotBlank(message = "收件人电话不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "收件人手机号格式不正确")
    @Schema(description = "收件人电话", example = "13800138002")
    private String receiverPhone;

    @NotBlank(message = "收件人地址不能为空")
    @Schema(description = "收件人地址", example = "上海市浦东新区世纪大道100号")
    private String receiverAddress;

    @Schema(description = "预计送达时间", example = "预计明天送达")
    private String estimatedTime;
}
