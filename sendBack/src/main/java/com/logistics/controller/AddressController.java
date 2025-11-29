package com.logistics.controller;

import com.logistics.common.Result;
import com.logistics.config.UserContext;
import com.logistics.dto.AddressDTO;
import com.logistics.service.AddressService;
import com.logistics.vo.AddressVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "地址管理", description = "地址管理相关接口")
@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;
    private final UserContext userContext;

    public AddressController(AddressService addressService, UserContext userContext) {
        this.addressService = addressService;
        this.userContext = userContext;
    }

    @Operation(summary = "获取地址列表", description = "获取当前用户的地址列表，支持按类型筛选")
    @GetMapping
    public Result<List<AddressVO>> getAddressList(
            @Parameter(description = "地址类型(sender-寄件,receiver-收件)")
            @RequestParam(required = false) String type) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(addressService.getAddressList(userId, type));
    }

    @Operation(summary = "获取地址详情", description = "根据ID获取地址详情")
    @GetMapping("/{id}")
    public Result<AddressVO> getAddressById(@PathVariable Long id) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(addressService.getAddressById(id, userId));
    }

    @Operation(summary = "新增地址", description = "创建新的地址")
    @PostMapping
    public Result<AddressVO> createAddress(@Valid @RequestBody AddressDTO addressDTO) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(addressService.createAddress(userId, addressDTO));
    }

    @Operation(summary = "更新地址", description = "更新指定地址信息")
    @PutMapping("/{id}")
    public Result<AddressVO> updateAddress(
            @PathVariable Long id,
            @Valid @RequestBody AddressDTO addressDTO) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(addressService.updateAddress(id, userId, addressDTO));
    }

    @Operation(summary = "删除地址", description = "删除指定地址")
    @DeleteMapping("/{id}")
    public Result<Void> deleteAddress(@PathVariable Long id) {
        Long userId = userContext.getCurrentUserId();
        addressService.deleteAddress(id, userId);
        return Result.success();
    }

    @Operation(summary = "设置默认地址", description = "将指定地址设置为默认地址")
    @PutMapping("/{id}/default")
    public Result<Void> setDefaultAddress(@PathVariable Long id) {
        Long userId = userContext.getCurrentUserId();
        addressService.setDefaultAddress(id, userId);
        return Result.success();
    }
}
