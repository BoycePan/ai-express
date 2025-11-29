package com.logistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "订单查询请求")
public class OrderQueryDTO {

    @Schema(description = "当前页码", example = "1")
    private Integer page = 1;

    @Schema(description = "每页数量", example = "10")
    private Integer pageSize = 10;

    @Schema(description = "订单状态(pending,in_transit,delivered,exception)")
    private String status;

    @Schema(description = "搜索关键词(单号、收件人姓名、电话)")
    private String keyword;
}
