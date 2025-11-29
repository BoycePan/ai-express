package com.logistics.service;

import com.logistics.dto.LoginDTO;
import com.logistics.dto.RegisterDTO;
import com.logistics.dto.UserUpdateDTO;
import com.logistics.vo.LoginVO;
import com.logistics.vo.UserVO;

public interface UserService {

    LoginVO login(LoginDTO loginDTO);

    UserVO register(RegisterDTO registerDTO);

    UserVO getUserInfo(Long userId);

    UserVO updateUserInfo(Long userId, UserUpdateDTO userUpdateDTO);
}
