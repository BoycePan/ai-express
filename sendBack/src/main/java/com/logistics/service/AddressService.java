package com.logistics.service;

import com.logistics.dto.AddressDTO;
import com.logistics.vo.AddressVO;

import java.util.List;

public interface AddressService {

    List<AddressVO> getAddressList(Long userId, String type);

    AddressVO getAddressById(Long id, Long userId);

    AddressVO createAddress(Long userId, AddressDTO addressDTO);

    AddressVO updateAddress(Long id, Long userId, AddressDTO addressDTO);

    void deleteAddress(Long id, Long userId);

    void setDefaultAddress(Long id, Long userId);
}
