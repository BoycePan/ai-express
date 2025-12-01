/**
 * 常量定义
 */

import type { OrderStatus } from '@/types'

/**
 * 订单状态文本映射
 */
export const ORDER_STATUS_MAP: Record<OrderStatus, string> = {
  pending: '待发货',
  in_transit: '运输中',
  delivered: '已签收',
  exception: '异常',
}

/**
 * 订单状态图标映射
 */
export const ORDER_STATUS_ICONS: Record<OrderStatus, string> = {
  pending: '⏳',
  in_transit: '🚚',
  delivered: '✅',
  exception: '⚠️',
}

/**
 * 订单状态颜色映射
 */
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#FFA500',
  in_transit: '#3B82F6',
  delivered: '#10B981',
  exception: '#EF4444',
}

/**
 * 地址标签选项
 */
export const ADDRESS_TAGS = ['家', '公司', '学校', '仓库']

/**
 * 地址类型选项
 */
export const ADDRESS_TYPE_OPTIONS = [
  { label: '寄件人', value: 'sender' as const, icon: '📤' },
  { label: '收件人', value: 'receiver' as const, icon: '📥' },
]

/**
 * 常用地址筛选选项
 */
export const ADDRESS_FILTER_OPTIONS = [
  { label: '全部', value: 'all' as const },
  { label: '寄件人', value: 'sender' as const },
  { label: '收件人', value: 'receiver' as const },
]
