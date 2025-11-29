package com.logistics.controller;

import com.logistics.common.Result;
import com.logistics.config.UserContext;
import com.logistics.dto.LoginDTO;
import com.logistics.dto.RegisterDTO;
import com.logistics.dto.UserUpdateDTO;
import com.logistics.service.UserService;
import com.logistics.vo.LoginVO;
import com.logistics.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(name = "认证管理", description = "用户认证相关接口")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserContext userContext;

    public AuthController(UserService userService, UserContext userContext) {
        this.userService = userService;
        this.userContext = userContext;
    }

    @Operation(summary = "用户登录", description = "使用手机号和密码登录，返回JWT Token")
    @PostMapping("/login")
    public Result<LoginVO> login(@Valid @RequestBody LoginDTO loginDTO) {
        return Result.success(userService.login(loginDTO));
    }

    @Operation(summary = "用户注册", description = "注册新用户")
    @PostMapping("/register")
    public Result<UserVO> register(@Valid @RequestBody RegisterDTO registerDTO) {
        return Result.success(userService.register(registerDTO));
    }

    @Operation(summary = "获取当前用户信息", description = "获取当前登录用户的详细信息")
    @GetMapping("/user-info")
    public Result<UserVO> getUserInfo() {
        Long userId = userContext.getCurrentUserId();
        return Result.success(userService.getUserInfo(userId));
    }

    @Operation(summary = "更新用户信息", description = "更新当前登录用户的信息")
    @PutMapping("/user-info")
    public Result<UserVO> updateUserInfo(@Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        Long userId = userContext.getCurrentUserId();
        return Result.success(userService.updateUserInfo(userId, userUpdateDTO));
    }
}
