package com.logistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "更新用户信息请求")
public class UserUpdateDTO {

    @Size(min = 2, max = 20, message = "用户名长度需在2-20之间")
    @Schema(description = "用户名", example = "张三")
    private String username;

    @Schema(description = "头像URL")
    private String avatar;
}
