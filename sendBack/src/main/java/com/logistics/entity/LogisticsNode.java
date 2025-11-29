package com.logistics.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("t_logistics_node")
@Schema(description = "物流节点实体")
public class LogisticsNode {

    @TableId(type = IdType.AUTO)
    @Schema(description = "节点ID")
    private Long id;

    @Schema(description = "订单ID")
    private Long orderId;

    @Schema(description = "快递单号")
    private String trackingNumber;

    @Schema(description = "物流时间")
    private LocalDateTime time;

    @Schema(description = "当前位置")
    private String location;

    @Schema(description = "物流状态")
    private String status;

    @Schema(description = "物流描述")
    private String description;

    @Schema(description = "是否当前节点")
    private Integer isActive;

    @TableField(fill = FieldFill.INSERT)
    @Schema(description = "创建时间")
    private LocalDateTime createdAt;
}
