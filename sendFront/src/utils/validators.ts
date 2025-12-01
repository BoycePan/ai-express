/**
 * 验证工具函数集合
 */

/**
 * 验证手机号
 */
export function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 验证密码
 * 密码长度要求：6-20位
 */
export function validatePassword(password: string): boolean {
  return password.length >= 6 && password.length <= 20
}

/**
 * 验证用户名
 * 用户名长度要求：2-20位
 */
export function validateUsername(username: string): boolean {
  return username.trim().length >= 2 && username.trim().length <= 20
}

/**
 * 验证必填字段
 */
export function validateRequired(value: string, fieldName: string): { valid: boolean; message: string } {
  if (!value || !value.trim()) {
    return {
      valid: false,
      message: `请输入${fieldName}`,
    }
  }
  return {
    valid: true,
    message: '',
  }
}

/**
 * 验证联系人姓名
 */
export function validateName(name: string): { valid: boolean; message: string } {
  const trimmed = name.trim()
  if (!trimmed) {
    return {
      valid: false,
      message: '请输入联系人姓名',
    }
  }
  if (trimmed.length > 20) {
    return {
      valid: false,
      message: '联系人姓名不能超过20个字符',
    }
  }
  return {
    valid: true,
    message: '',
  }
}

/**
 * 验证详细地址
 */
export function validateAddress(address: string): { valid: boolean; message: string } {
  const trimmed = address.trim()
  if (!trimmed) {
    return {
      valid: false,
      message: '请输入详细地址',
    }
  }
  if (trimmed.length > 100) {
    return {
      valid: false,
      message: '详细地址不能超过100个字符',
    }
  }
  return {
    valid: true,
    message: '',
  }
}

/**
 * 验证地区信息
 */
export function validateArea(province: string, city: string, district: string): { valid: boolean; message: string } {
  if (!province || !city || !district) {
    return {
      valid: false,
      message: '请选择完整的省市区信息',
    }
  }
  return {
    valid: true,
    message: '',
  }
}
