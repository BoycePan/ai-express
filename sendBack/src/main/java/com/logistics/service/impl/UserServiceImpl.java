package com.logistics.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.logistics.common.BusinessException;
import com.logistics.common.ResultCode;
import com.logistics.dto.LoginDTO;
import com.logistics.dto.RegisterDTO;
import com.logistics.dto.UserUpdateDTO;
import com.logistics.entity.User;
import com.logistics.mapper.UserMapper;
import com.logistics.service.UserService;
import com.logistics.util.JwtUtil;
import com.logistics.vo.LoginVO;
import com.logistics.vo.UserVO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public LoginVO login(LoginDTO loginDTO) {
        // 查询用户
        User user = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getPhone, loginDTO.getPhone())
        );

        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        // 验证密码
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new BusinessException(ResultCode.USER_PASSWORD_ERROR);
        }

        // 生成Token
        String token = jwtUtil.generateToken(user.getId(), user.getPhone());

        // 构建返回结果
        LoginVO loginVO = new LoginVO();
        loginVO.setToken(token);
        loginVO.setUser(convertToUserVO(user));

        return loginVO;
    }

    @Override
    public UserVO register(RegisterDTO registerDTO) {
        // 检查手机号是否已存在
        Long count = userMapper.selectCount(
                new LambdaQueryWrapper<User>().eq(User::getPhone, registerDTO.getPhone())
        );

        if (count > 0) {
            throw new BusinessException(ResultCode.USER_PHONE_EXISTS);
        }

        // 创建用户
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPhone(registerDTO.getPhone());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=" + registerDTO.getPhone());

        userMapper.insert(user);

        return convertToUserVO(user);
    }

    @Override
    public UserVO getUserInfo(Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }
        return convertToUserVO(user);
    }

    @Override
    public UserVO updateUserInfo(Long userId, UserUpdateDTO userUpdateDTO) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_FOUND);
        }

        // 更新字段
        if (userUpdateDTO.getUsername() != null) {
            user.setUsername(userUpdateDTO.getUsername());
        }
        if (userUpdateDTO.getAvatar() != null) {
            user.setAvatar(userUpdateDTO.getAvatar());
        }

        userMapper.updateById(user);

        return convertToUserVO(user);
    }

    private UserVO convertToUserVO(User user) {
        UserVO userVO = new UserVO();
        BeanUtil.copyProperties(user, userVO);
        return userVO;
    }
}
