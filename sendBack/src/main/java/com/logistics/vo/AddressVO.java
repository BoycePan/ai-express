package com.logistics.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "地址信息")
public class AddressVO {

    @Schema(description = "地址ID")
    private Long id;

    @Schema(description = "联系人姓名")
    private String name;

    @Schema(description = "联系电话")
    private String phone;

    @Schema(description = "省份")
    private String province;

    @Schema(description = "城市")
    private String city;

    @Schema(description = "区县")
    private String district;

    @Schema(description = "详细地址")
    private String detail;

    @Schema(description = "完整地址")
    private String fullAddress;

    @Schema(description = "地址标签")
    private String tag;

    @Schema(description = "是否默认地址")
    private Boolean isDefault;

    @Schema(description = "地址类型")
    private String type;

    @Schema(description = "创建时间")
    private LocalDateTime createdAt;
}
