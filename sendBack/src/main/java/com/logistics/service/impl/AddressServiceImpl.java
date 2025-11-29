package com.logistics.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.logistics.common.BusinessException;
import com.logistics.common.ResultCode;
import com.logistics.dto.AddressDTO;
import com.logistics.entity.Address;
import com.logistics.mapper.AddressMapper;
import com.logistics.service.AddressService;
import com.logistics.vo.AddressVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressMapper addressMapper;

    public AddressServiceImpl(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    @Override
    public List<AddressVO> getAddressList(Long userId, String type) {
        LambdaQueryWrapper<Address> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Address::getUserId, userId);

        if (StrUtil.isNotBlank(type)) {
            queryWrapper.eq(Address::getType, type);
        }

        queryWrapper.orderByDesc(Address::getIsDefault)
                .orderByDesc(Address::getCreatedAt);

        List<Address> addresses = addressMapper.selectList(queryWrapper);

        return addresses.stream()
                .map(this::convertToAddressVO)
                .collect(Collectors.toList());
    }

    @Override
    public AddressVO getAddressById(Long id, Long userId) {
        Address address = addressMapper.selectOne(
                new LambdaQueryWrapper<Address>()
                        .eq(Address::getId, id)
                        .eq(Address::getUserId, userId)
        );

        if (address == null) {
            throw new BusinessException(ResultCode.ADDRESS_NOT_FOUND);
        }

        return convertToAddressVO(address);
    }

    @Override
    @Transactional
    public AddressVO createAddress(Long userId, AddressDTO addressDTO) {
        Address address = new Address();
        BeanUtil.copyProperties(addressDTO, address);
        address.setUserId(userId);
        address.setIsDefault(Boolean.TRUE.equals(addressDTO.getIsDefault()) ? 1 : 0);

        // 如果设置为默认地址，先取消其他同类型默认地址
        if (Boolean.TRUE.equals(addressDTO.getIsDefault())) {
            cancelDefaultAddress(userId, addressDTO.getType());
        }

        addressMapper.insert(address);

        return convertToAddressVO(address);
    }

    @Override
    @Transactional
    public AddressVO updateAddress(Long id, Long userId, AddressDTO addressDTO) {
        Address address = addressMapper.selectOne(
                new LambdaQueryWrapper<Address>()
                        .eq(Address::getId, id)
                        .eq(Address::getUserId, userId)
        );

        if (address == null) {
            throw new BusinessException(ResultCode.ADDRESS_NOT_FOUND);
        }

        BeanUtil.copyProperties(addressDTO, address);
        address.setIsDefault(Boolean.TRUE.equals(addressDTO.getIsDefault()) ? 1 : 0);

        // 如果设置为默认地址，先取消其他同类型默认地址
        if (Boolean.TRUE.equals(addressDTO.getIsDefault())) {
            cancelDefaultAddress(userId, addressDTO.getType());
        }

        addressMapper.updateById(address);

        return convertToAddressVO(address);
    }

    @Override
    public void deleteAddress(Long id, Long userId) {
        int rows = addressMapper.delete(
                new LambdaQueryWrapper<Address>()
                        .eq(Address::getId, id)
                        .eq(Address::getUserId, userId)
        );

        if (rows == 0) {
            throw new BusinessException(ResultCode.ADDRESS_NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public void setDefaultAddress(Long id, Long userId) {
        Address address = addressMapper.selectOne(
                new LambdaQueryWrapper<Address>()
                        .eq(Address::getId, id)
                        .eq(Address::getUserId, userId)
        );

        if (address == null) {
            throw new BusinessException(ResultCode.ADDRESS_NOT_FOUND);
        }

        // 取消同类型其他默认地址
        cancelDefaultAddress(userId, address.getType());

        // 设置当前地址为默认
        address.setIsDefault(1);
        addressMapper.updateById(address);
    }

    private void cancelDefaultAddress(Long userId, String type) {
        addressMapper.update(null,
                new LambdaUpdateWrapper<Address>()
                        .eq(Address::getUserId, userId)
                        .eq(Address::getType, type)
                        .eq(Address::getIsDefault, 1)
                        .set(Address::getIsDefault, 0)
        );
    }

    private AddressVO convertToAddressVO(Address address) {
        AddressVO vo = new AddressVO();
        BeanUtil.copyProperties(address, vo);
        vo.setIsDefault(address.getIsDefault() == 1);
        vo.setFullAddress(address.getProvince() + address.getCity() + address.getDistrict() + address.getDetail());
        return vo;
    }
}
