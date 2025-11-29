package com.logistics.config;

import com.logistics.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class UserContext {

    private final JwtUtil jwtUtil;

    public UserContext(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public Long getCurrentUserId() {
        String token = getTokenFromRequest();
        if (token != null) {
            return jwtUtil.getUserId(token);
        }
        return null;
    }

    public String getCurrentPhone() {
        String token = getTokenFromRequest();
        if (token != null) {
            return jwtUtil.getPhone(token);
        }
        return null;
    }

    private String getTokenFromRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String header = request.getHeader("Authorization");
            if (header != null && header.startsWith("Bearer ")) {
                return header.substring(7);
            }
        }
        return null;
    }
}
