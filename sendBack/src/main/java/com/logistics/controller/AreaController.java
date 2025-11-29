package com.logistics.controller;

import com.logistics.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Tag(name = "地区信息", description = "地区信息相关接口")
@RestController
@RequestMapping("/api/areas")
public class AreaController {

    private final RestTemplate restTemplate;

    public AreaController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Operation(summary = "获取地区数据", description = "获取省市区数据")
    @GetMapping("/data")
    public Result<Map<String, Object>> getAreaData() {
        try {
            String externalUrl = "https://img1.fhd001.com/source/area/4.25/area_mini.json";
            Map<String, Object> areaData = restTemplate.getForObject(externalUrl, Map.class);
            return Result.success(areaData);
        } catch (Exception e) {
            return Result.error("获取地区数据失败: " + e.getMessage());
        }
    }
}
