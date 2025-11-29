import { del, get, post, put } from './request'

// 地址类型
export type AddressType = 'sender' | 'receiver'

// 地址请求参数
export interface AddressDTO {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  tag?: string
  isDefault: boolean
  type: AddressType
}

// 地址响应（与后端一致）
export interface AddressVO {
  id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  fullAddress: string
  tag: string | null
  isDefault: boolean
  type: AddressType
  createdAt: string
}

// 获取地址列表
export function getAddressList() {
  return get<AddressVO[]>('/addresses')
}

// 根据类型获取地址列表
export function getAddressByType(type: AddressType) {
  return get<AddressVO[]>('/addresses', { params: { type } })
}

// 获取地址详情
export function getAddressById(id: number) {
  return get<AddressVO>(`/addresses/${id}`)
}

// 添加地址
export function addAddress(data: AddressDTO) {
  return post<AddressVO>('/addresses', data)
}

// 更新地址
export function updateAddress(id: number, data: Partial<AddressDTO>) {
  return put<AddressVO>(`/addresses/${id}`, data)
}

// 删除地址
export function deleteAddress(id: number) {
  return del<void>(`/addresses/${id}`)
}

// 设为默认地址
export function setDefaultAddress(id: number) {
  return put<AddressVO>(`/addresses/${id}/default`, {})
}
