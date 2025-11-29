package com.logistics.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("t_address")
@Schema(description = "地址实体")
public class Address {

    @TableId(type = IdType.AUTO)
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

    @Schema(description = "地址标签(home-家,company-公司,school-学校)")
    private String tag;

    @Schema(description = "是否默认地址")
    private Integer isDefault;

    @Schema(description = "地址类型(sender-寄件,receiver-收件)")
    private String type;

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
