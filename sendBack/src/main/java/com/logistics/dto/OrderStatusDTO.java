package com.logistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(description = "更新订单状态请求")
public class OrderStatusDTO {

    @NotBlank(message = "订单状态不能为空")
    @Pattern(regexp = "^(pending|in_transit|delivered|exception)$", message = "订单状态无效")
    @Schema(description = "订单状态", example = "in_transit")
    private String status;
}
