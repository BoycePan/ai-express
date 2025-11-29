import { del, get, post, put } from './request'

// 订单状态
export type OrderStatus = 'pending' | 'in_transit' | 'delivered' | 'exception'

// 联系人信息
export interface ContactInfo {
  name: string
  phone: string
  address: string
}

// 创建订单请求参数（与后端DTO对应）
export interface OrderCreateDTO {
  courierCompany: string
  courierLogo?: string
  itemName: string
  senderName: string
  senderPhone: string
  senderAddress: string
  receiverName: string
  receiverPhone: string
  receiverAddress: string
  estimatedTime?: string
}

// 订单查询参数（与后端DTO对应）
export interface OrderQueryDTO {
  status?: OrderStatus
  keyword?: string
  page?: number
  pageSize?: number
}

// 订单响应
export interface OrderVO {
  id: number
  trackingNumber: string
  courierCompany: string
  courierLogo: string | null
  status: OrderStatus
  statusText: string
  itemName: string
  senderName: string
  senderPhone: string
  senderAddress: string
  receiverName: string
  receiverPhone: string
  receiverAddress: string
  estimatedTime: string | null
  createdAt: string
  logisticsNodes?: LogisticsNodeVO[]
}

// 物流节点响应（嵌入订单中）
export interface LogisticsNodeVO {
  id: number
  orderId: number
  trackingNumber: string
  time: string
  location: string
  status: string
  description: string
  isActive: boolean
}

// 分页响应（与后端一致）
export interface PageVO<T> {
  list: T[]
  total: number
  totalPages: number
  page: number
  pageSize: number
}

// 获取订单列表
export function getOrderList(params?: OrderQueryDTO) {
  return get<PageVO<OrderVO>>('/orders', { params })
}

// 获取订单详情
export function getOrderById(id: number) {
  return get<OrderVO>(`/orders/${id}`)
}

// 根据快递单号查询订单
export function getOrderByTrackingNumber(trackingNumber: string) {
  return get<OrderVO>(`/orders/tracking/${trackingNumber}`)
}

// 创建订单
export function createOrder(data: OrderCreateDTO) {
  return post<OrderVO>('/orders', data)
}

// 更新订单状态
export function updateOrderStatus(id: number, status: OrderStatus) {
  return put<OrderVO>(`/orders/${id}/status`, { status })
}

// 删除订单
export function deleteOrder(id: number) {
  return del<void>(`/orders/${id}`)
}
