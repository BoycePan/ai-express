import type { AddressVO } from '@/api/address'
import type { Address, AddressFormData, AddressType } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { addressApi } from '@/api'
import { useUserStore } from './user'

// 将后端地址数据转换为前端格式
function convertAddress(vo: AddressVO): Address {
  return {
    id: String(vo.id),
    name: vo.name,
    phone: vo.phone,
    province: vo.province,
    city: vo.city,
    district: vo.district,
    detail: vo.detail,
    fullAddress: vo.fullAddress,
    tag: vo.tag || undefined,
    isDefault: vo.isDefault,
    type: vo.type as AddressType,
    createdAt: vo.createdAt,
  }
}

export const useAddressStore = defineStore('address', () => {
  // 状态
  const addresses = ref<Address[]>([])
  const loading = ref(false)

  // 获取用户store
  const userStore = useUserStore()

  // 地址列表（后端API已经根据token筛选用户了）
  const userAddresses = computed(() => {
    return addresses.value
  })

  // 寄件人地址列表
  const senderAddresses = computed(() => {
    return userAddresses.value.filter(addr => addr.type === 'sender')
  })

  // 收件人地址列表
  const receiverAddresses = computed(() => {
    return userAddresses.value.filter(addr => addr.type === 'receiver')
  })

  // 默认寄件人地址
  const defaultSenderAddress = computed(() => {
    return senderAddresses.value.find(addr => addr.isDefault) || senderAddresses.value[0] || null
  })

  // 默认收件人地址
  const defaultReceiverAddress = computed(() => {
    return (
      receiverAddresses.value.find(addr => addr.isDefault) || receiverAddresses.value[0] || null
    )
  })

  // 地址统计
  const addressStats = computed(() => ({
    total: userAddresses.value.length,
    sender: senderAddresses.value.length,
    receiver: receiverAddresses.value.length,
  }))

  // 初始化：从服务器加载地址
  async function init() {
    if (!userStore.isLoggedIn) return false
    return loadAddresses()
  }

  // 加载地址列表
  async function loadAddresses() {
    loading.value = true
    try {
      const res = await addressApi.getAddressList()
      addresses.value = res.data.map(convertAddress)
      return true
    } catch {
      return false
    } finally {
      loading.value = false
    }
  }

  // 根据ID获取地址
  function getAddressById(id: string): Address | null {
    return addresses.value.find(addr => addr.id === id) || null
  }

  // 添加地址
  async function addAddress(formData: AddressFormData): Promise<Address | null> {
    try {
      const res = await addressApi.addAddress(formData)
      const newAddress = convertAddress(res.data)

      // 如果设为默认地址，更新本地同类型地址的默认状态
      if (newAddress.isDefault) {
        addresses.value.forEach(addr => {
          if (addr.type === newAddress.type) {
            addr.isDefault = false
          }
        })
      }

      addresses.value.push(newAddress)
      return newAddress
    } catch {
      return null
    }
  }

  // 更新地址
  async function updateAddress(id: string, formData: Partial<AddressFormData>): Promise<boolean> {
    try {
      const res = await addressApi.updateAddress(Number(id), formData)
      const updatedAddress = convertAddress(res.data)

      const index = addresses.value.findIndex(addr => addr.id === id)
      if (index !== -1) {
        // 如果设为默认地址，更新本地同类型地址的默认状态
        if (updatedAddress.isDefault) {
          addresses.value.forEach(addr => {
            if (addr.type === updatedAddress.type && addr.id !== id) {
              addr.isDefault = false
            }
          })
        }
        addresses.value[index] = updatedAddress
      }

      return true
    } catch {
      return false
    }
  }

  // 删除地址
  async function deleteAddress(id: string): Promise<boolean> {
    try {
      await addressApi.deleteAddress(Number(id))
      const index = addresses.value.findIndex(addr => addr.id === id)
      if (index !== -1) {
        addresses.value.splice(index, 1)
      }
      return true
    } catch {
      return false
    }
  }

  // 设为默认地址
  async function setDefaultAddress(id: string): Promise<boolean> {
    try {
      await addressApi.setDefaultAddress(Number(id))

      const address = addresses.value.find(addr => addr.id === id)
      if (address) {
        // 取消同类型的其他默认地址
        addresses.value.forEach(addr => {
          if (addr.type === address.type) {
            addr.isDefault = addr.id === id
          }
        })
      }

      return true
    } catch {
      return false
    }
  }

  // 按类型筛选地址
  function filterByType(type: AddressType | 'all'): Address[] {
    if (type === 'all') return userAddresses.value
    return userAddresses.value.filter(addr => addr.type === type)
  }

  // 搜索地址
  function searchAddresses(keyword: string): Address[] {
    if (!keyword.trim()) return userAddresses.value
    const lowerKeyword = keyword.toLowerCase()
    return userAddresses.value.filter(
      addr =>
        addr.name.toLowerCase().includes(lowerKeyword) ||
        addr.phone.includes(keyword) ||
        addr.province.includes(keyword) ||
        addr.city.includes(keyword) ||
        addr.district.includes(keyword) ||
        addr.detail.toLowerCase().includes(lowerKeyword) ||
        (addr.tag && addr.tag.toLowerCase().includes(lowerKeyword)),
    )
  }

  // 获取地址完整字符串
  function getFullAddress(address: Address): string {
    return `${address.province}${address.city}${address.district}${address.detail}`
  }

  // 转换为 ContactInfo 格式（用于订单）
  function toContactInfo(address: Address) {
    return {
      name: address.name,
      phone: address.phone,
      address: getFullAddress(address),
    }
  }

  return {
    addresses,
    loading,
    userAddresses,
    senderAddresses,
    receiverAddresses,
    defaultSenderAddress,
    defaultReceiverAddress,
    addressStats,
    init,
    loadAddresses,
    getAddressById,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    filterByType,
    searchAddresses,
    getFullAddress,
    toContactInfo,
  }
})
