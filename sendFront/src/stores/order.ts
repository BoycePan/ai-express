import type { OrderVO } from '@/api/order'
import type { LogisticsInfo, Order, OrderStatus } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { logisticsApi, orderApi } from '@/api'

// 将后端订单数据转换为前端格式
function convertOrder(vo: OrderVO): Order {
  return {
    id: String(vo.id),
    trackingNumber: vo.trackingNumber,
    courierCompany: vo.courierCompany,
    courierLogo: vo.courierLogo || '📦',
    status: vo.status,
    itemName: vo.itemName,
    sender: {
      name: vo.senderName,
      phone: vo.senderPhone,
      address: vo.senderAddress,
    },
    receiver: {
      name: vo.receiverName,
      phone: vo.receiverPhone,
      address: vo.receiverAddress,
    },
    estimatedTime: vo.estimatedTime || undefined,
    createdAt: vo.createdAt,
    updatedAt: vo.createdAt, // 后端没有updatedAt，用createdAt代替
  }
}

export const useOrderStore = defineStore('order', () => {
  // 状态
  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const currentLogistics = ref<LogisticsInfo | null>(null)
  const loading = ref(false)
  const totalCount = ref(0)

  // 计算属性：根据状态过滤订单
  const pendingOrders = computed(() => orders.value.filter(order => order.status === 'pending'))

  const inTransitOrders = computed(() =>
    orders.value.filter(order => order.status === 'in_transit'),
  )

  const deliveredOrders = computed(() => orders.value.filter(order => order.status === 'delivered'))

  const exceptionOrders = computed(() => orders.value.filter(order => order.status === 'exception'))

  // 计算属性：订单统计
  const orderStats = computed(() => ({
    total: totalCount.value,
    pending: pendingOrders.value.length,
    inTransit: inTransitOrders.value.length,
    delivered: deliveredOrders.value.length,
    exception: exceptionOrders.value.length,
  }))

  // 加载订单列表
  async function loadOrders(params?: {
    status?: OrderStatus
    keyword?: string
    page?: number
    pageSize?: number
  }) {
    loading.value = true
    try {
      const res = await orderApi.getOrderList(params)
      orders.value = res.data.list.map(convertOrder)
      totalCount.value = res.data.total
      return true
    } catch {
      return false
    } finally {
      loading.value = false
    }
  }

  // 根据ID获取订单
  function getOrderById(orderId: string): Order | undefined {
    return orders.value.find(order => order.id === orderId)
  }

  // 根据快递单号查询订单
  async function searchByTrackingNumber(trackingNumber: string): Promise<Order | null> {
    try {
      const res = await orderApi.getOrderByTrackingNumber(trackingNumber)
      return convertOrder(res.data)
    } catch {
      return null
    }
  }

  // 搜索订单（支持单号和物品名称）
  function searchOrders(keyword: string): Order[] {
    if (!keyword) return orders.value

    const lowerKeyword = keyword.toLowerCase()
    return orders.value.filter(
      order =>
        order.trackingNumber.toLowerCase().includes(lowerKeyword) ||
        order.itemName.toLowerCase().includes(lowerKeyword) ||
        order.courierCompany.toLowerCase().includes(lowerKeyword),
    )
  }

  // 根据状态过滤订单
  function filterByStatus(status: OrderStatus | 'all'): Order[] {
    if (status === 'all') return orders.value
    return orders.value.filter(order => order.status === status)
  }

  // 设置当前订单并加载物流信息
  async function setCurrentOrder(orderId: string) {
    // 先从本地查找
    let order = getOrderById(orderId)

    // 本地没有则从服务器获取
    if (!order) {
      try {
        const res = await orderApi.getOrderById(Number(orderId))
        order = convertOrder(res.data)
      } catch {
        return false
      }
    }

    currentOrder.value = order
    // 同时加载物流信息
    await loadLogistics(orderId)
    return true
  }

  // 加载物流信息
  async function loadLogistics(orderId: string) {
    try {
      const res = await logisticsApi.getLogisticsByOrderId(Number(orderId))
      currentLogistics.value = {
        orderId,
        trackingNumber: res.data.trackingNumber,
        timeline: res.data.nodes.map(node => ({
          time: node.time,
          location: node.location,
          status: node.status,
          description: node.description,
          isActive: node.isActive,
        })),
      }
      return true
    } catch {
      currentLogistics.value = null
      return false
    }
  }

  // 添加订单
  async function addOrder(orderData: {
    itemName: string
    sender: { name: string; phone: string; address: string }
    receiver: { name: string; phone: string; address: string }
    courierCompany?: string
  }) {
    try {
      // 转换为后端期望的格式
      const createDTO = {
        courierCompany: orderData.courierCompany || '顺丰速运',
        itemName: orderData.itemName,
        senderName: orderData.sender.name,
        senderPhone: orderData.sender.phone,
        senderAddress: orderData.sender.address,
        receiverName: orderData.receiver.name,
        receiverPhone: orderData.receiver.phone,
        receiverAddress: orderData.receiver.address,
      }
      const res = await orderApi.createOrder(createDTO)
      const newOrder = convertOrder(res.data)
      orders.value.unshift(newOrder)
      totalCount.value++
      return newOrder
    } catch {
      return null
    }
  }

  // 删除订单
  async function deleteOrder(orderId: string) {
    try {
      await orderApi.deleteOrder(Number(orderId))
      const index = orders.value.findIndex(order => order.id === orderId)
      if (index > -1) {
        orders.value.splice(index, 1)
        totalCount.value--
      }
      return true
    } catch {
      return false
    }
  }

  // 更新订单状态
  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      await orderApi.updateOrderStatus(Number(orderId), status)
      const order = getOrderById(orderId)
      if (order) {
        order.status = status
        order.updatedAt = new Date().toISOString()
      }
      return true
    } catch {
      return false
    }
  }

  return {
    orders,
    currentOrder,
    currentLogistics,
    loading,
    totalCount,
    pendingOrders,
    inTransitOrders,
    deliveredOrders,
    exceptionOrders,
    orderStats,
    loadOrders,
    getOrderById,
    searchByTrackingNumber,
    searchOrders,
    filterByStatus,
    setCurrentOrder,
    loadLogistics,
    addOrder,
    deleteOrder,
    updateOrderStatus,
  }
})
