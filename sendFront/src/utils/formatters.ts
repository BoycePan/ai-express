/**
 * 格式化工具函数集合
 */

/**
 * 格式化日期
 */
export function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } catch {
    return dateStr
  }
}

/**
 * 格式化完整地址
 */
export function formatFullAddress(address: {
  province?: string
  city?: string
  district?: string
  detail?: string
}): string {
  const parts = [address.province, address.city, address.district, address.detail].filter(Boolean)
  return parts.join('')
}

/**
 * 格式化短地址（省市区）
 */
export function formatShortAddress(address: {
  province?: string
  city?: string
  district?: string
}): string {
  const parts = [address.province, address.city, address.district].filter(Boolean)
  return parts.join('')
}

/**
 * 格式化电话号码
 * 将 13800138000 格式化为 138****8000
 */
export function formatPhoneForDisplay(phone: string): string {
  if (!phone || phone.length < 11) return phone
  return `${phone.substring(0, 3)}****${phone.substring(7)}`
}

/**
 * 格式化订单号
 */
export function formatOrderNumber(id: string, courierCompany: string): string {
  return `${courierCompany}-${id.substring(0, 8)}`
}

/**
 * 格式化时间差（用于相对时间显示）
 */
export function formatTimeAgo(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`

    return formatDate(dateStr)
  } catch {
    return dateStr
  }
}
