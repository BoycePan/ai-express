import { get, post } from './request'

// 物流节点响应
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

// 物流追踪响应
export interface LogisticsTrackingVO {
  orderId: number
  trackingNumber: string
  courierCompany: string
  courierLogo: string | null
  status: string
  statusText: string
  nodes: LogisticsNodeVO[]
}

// 添加物流节点请求参数
export interface LogisticsNodeDTO {
  orderId: number
  time?: string
  location: string
  status: string
  description: string
  isActive?: boolean
}

// 获取物流信息
export function getLogisticsByOrderId(orderId: number) {
  return get<LogisticsTrackingVO>(`/logistics/${orderId}`)
}

// 添加物流节点
export function addLogisticsNode(data: LogisticsNodeDTO) {
  return post<LogisticsNodeVO>('/logistics', data)
}
