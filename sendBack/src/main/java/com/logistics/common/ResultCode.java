package com.logistics.common;

import lombok.Getter;

@Getter
public enum ResultCode {
    SUCCESS(200, "操作成功"),
    ERROR(500, "操作失败"),
    UNAUTHORIZED(401, "未授权，请先登录"),
    FORBIDDEN(403, "没有权限访问"),
    NOT_FOUND(404, "资源不存在"),
    BAD_REQUEST(400, "请求参数错误"),
    TOKEN_EXPIRED(401, "Token已过期"),
    TOKEN_INVALID(401, "Token无效"),
    USER_NOT_FOUND(1001, "用户不存在"),
    USER_PASSWORD_ERROR(1002, "密码错误"),
    USER_PHONE_EXISTS(1003, "手机号已存在"),
    ORDER_NOT_FOUND(2001, "订单不存在"),
    ADDRESS_NOT_FOUND(3001, "地址不存在");

    private final Integer code;
    private final String message;

    ResultCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
