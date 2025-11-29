// 联系人信息
export interface ContactInfo {
  name: string
  phone: string
  address: string
}

// 用户信息
export interface User {
  id: string
  username: string
  phone: string
  avatar?: string
  createdAt: string
}

// 订单状态
export type OrderStatus = 'pending' | 'in_transit' | 'delivered' | 'exception'

// 订单信息
export interface Order {
  id: string
  trackingNumber: string // 快递单号
  courierCompany: string // 快递公司
  courierLogo: string // 公司logo
  status: OrderStatus
  itemName: string // 物品名称
  sender: ContactInfo
  receiver: ContactInfo
  estimatedTime?: string // 预计送达
  createdAt: string
  updatedAt: string
}

// 物流节点
export interface LogisticsNode {
  time: string
  location: string
  status: string
  description: string
  isActive: boolean
}

// 物流信息
export interface LogisticsInfo {
  orderId: string
  trackingNumber: string
  timeline: LogisticsNode[]
}

// 地址类型
export type AddressType = 'sender' | 'receiver'

// 地址信息
export interface Address {
  id: string
  name: string // 联系人姓名
  phone: string // 联系电话
  province: string // 省
  city: string // 市
  district: string // 区
  detail: string // 详细地址
  fullAddress?: string // 完整地址
  tag?: string // 标签（家、公司等）
  isDefault: boolean // 是否默认地址
  type: AddressType // 地址类型：寄件人/收件人
  createdAt: string
}

// 地址表单数据（用于新增/编辑）
export interface AddressFormData {
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
