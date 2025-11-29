package com.logistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "添加物流节点请求")
public class LogisticsNodeDTO {

    @NotNull(message = "订单ID不能为空")
    @Schema(description = "订单ID", example = "1")
    private Long orderId;

    @Schema(description = "物流时间，默认为当前时间")
    private LocalDateTime time;

    @Schema(description = "当前位置", example = "深圳市")
    private String location;

    @NotBlank(message = "物流状态不能为空")
    @Schema(description = "物流状态", example = "运输中")
    private String status;

    @Schema(description = "物流描述", example = "快件已到达深圳集散中心")
    private String description;

    @Schema(description = "是否设置为当前节点", example = "true")
    private Boolean isActive = true;
}
