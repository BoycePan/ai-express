/**
 * 订单状态Hook
 * 订单状态相关的计算和映射
 */

import type { OrderStatus } from '@/types'
import { computed } from 'vue'
import { ORDER_STATUS_COLORS, ORDER_STATUS_ICONS, ORDER_STATUS_MAP } from '@/utils/constants'

/**
 * 订单状态Hook
 */
export function useOrderStatus() {
  /**
   * 获取状态文本
   */
  const getStatusText = (status: OrderStatus): string => {
    return ORDER_STATUS_MAP[status] || '未知'
  }

  /**
   * 获取状态图标
   */
  const getStatusIcon = (status: OrderStatus): string => {
    return ORDER_STATUS_ICONS[status] || '❓'
  }

  /**
   * 获取状态颜色
   */
  const getStatusColor = (status: OrderStatus): string => {
    return ORDER_STATUS_COLORS[status] || '#999999'
  }

  /**
   * 获取状态对象
   */
  const getStatusData = (status: OrderStatus) => {
    return {
      text: getStatusText(status),
      icon: getStatusIcon(status),
      color: getStatusColor(status),
    }
  }

  /**
   * 订单是否可删除
   */
  const canDelete = (status: OrderStatus): boolean => {
    return status !== 'in_transit'
  }

  /**
   * 获取状态描述
   */
  const getStatusDescription = (status: OrderStatus): string => {
    const descriptions: Record<OrderStatus, string> = {
      pending: '等待物流公司揽收',
      in_transit: '正在运输中',
      delivered: '已签收',
      exception: '物流异常，请联系客服',
    }
    return descriptions[status] || ''
  }

  return {
    getStatusText,
    getStatusIcon,
    getStatusColor,
    getStatusData,
    canDelete,
    getStatusDescription,
  }
}

/**
 * 创建订单状态的响应式计算属性
 */
export function useOrderStatusComputed(status: Readonly<{ value: OrderStatus }>) {
  const { getStatusText, getStatusIcon, getStatusColor } = useOrderStatus()

  const statusText = computed(() => getStatusText(status.value))
  const statusIcon = computed(() => getStatusIcon(status.value))
  const statusColor = computed(() => getStatusColor(status.value))

  return {
    statusText,
    statusIcon,
    statusColor,
  }
}
