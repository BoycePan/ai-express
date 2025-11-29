package com.logistics.config;

import com.logistics.common.BusinessException;
import com.logistics.common.ResultCode;
import com.logistics.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.List;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    // 白名单路径
    private final List<String> whiteList = Arrays.asList(
            "/api/auth/login",
            "/api/auth/register",
            "/api/orders/tracking/**",
            "/api/areas/data",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/webjars/**",
            "/error"
    );

    public JwtInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 放行OPTIONS请求
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String requestPath = request.getRequestURI();

        // 检查白名单
        for (String pattern : whiteList) {
            if (pathMatcher.match(pattern, requestPath)) {
                return true;
            }
        }

        // 获取Token
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            throw new BusinessException(ResultCode.UNAUTHORIZED);
        }

        String token = header.substring(7);

        // 验证Token
        if (!jwtUtil.validateToken(token)) {
            throw new BusinessException(ResultCode.TOKEN_INVALID);
        }

        return true;
    }
}
