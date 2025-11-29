package com.logistics.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "物流节点信息")
public class LogisticsNodeVO {

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
    private Boolean isActive;
}
