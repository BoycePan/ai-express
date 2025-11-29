package com.logistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(description = "地址请求")
public class AddressDTO {

    @NotBlank(message = "联系人姓名不能为空")
    @Schema(description = "联系人姓名", example = "张三")
    private String name;

    @NotBlank(message = "联系电话不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    @Schema(description = "联系电话", example = "13800138001")
    private String phone;

    @NotBlank(message = "省份不能为空")
    @Schema(description = "省份", example = "广东省")
    private String province;

    @NotBlank(message = "城市不能为空")
    @Schema(description = "城市", example = "深圳市")
    private String city;

    @NotBlank(message = "区县不能为空")
    @Schema(description = "区县", example = "南山区")
    private String district;

    @NotBlank(message = "详细地址不能为空")
    @Schema(description = "详细地址", example = "科技园南路88号")
    private String detail;

    @Schema(description = "地址标签(home-家,company-公司,school-学校)", example = "home")
    private String tag;

    @Schema(description = "是否默认地址", example = "false")
    private Boolean isDefault = false;

    @NotBlank(message = "地址类型不能为空")
    @Pattern(regexp = "^(sender|receiver)$", message = "地址类型只能是sender或receiver")
    @Schema(description = "地址类型(sender-寄件,receiver-收件)", example = "receiver")
    private String type;
}
