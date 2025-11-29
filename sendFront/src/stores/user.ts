import type { UserVO } from '@/api/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api'
import { storage } from '@/utils/storage'

// 前端使用的用户类型，兼容原有接口
export interface User {
  id: string
  username: string
  phone: string
  avatar?: string
  createdAt: string
}

// 将后端用户数据转换为前端格式
function convertUser(vo: UserVO): User {
  return {
    id: String(vo.id),
    username: vo.username,
    phone: vo.phone,
    avatar: vo.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${vo.username}`,
    createdAt: vo.createdAt,
  }
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const currentUser = ref<User | null>(null)
  const isLoggedIn = ref(false)

  // 初始化：从 localStorage 加载用户信息
  function init() {
    const token = storage.get<string>('token')
    const savedUser = storage.get<User>('current_user')
    if (token && savedUser) {
      currentUser.value = savedUser
      isLoggedIn.value = true
    }
  }

  // 登录
  async function login(phone: string, password: string): Promise<boolean> {
    try {
      const res = await authApi.login({ phone, password })
      const { token, user } = res.data

      // 保存 token 和用户信息
      storage.set('token', token)
      const convertedUser = convertUser(user)
      currentUser.value = convertedUser
      isLoggedIn.value = true
      storage.set('current_user', convertedUser)

      return true
    } catch {
      return false
    }
  }

  // 注册
  async function register(username: string, phone: string, password: string): Promise<boolean> {
    try {
      const res = await authApi.register({ username, phone, password })
      const convertedUser = convertUser(res.data)

      // 注册成功后自动登录
      const loginRes = await authApi.login({ phone, password })
      storage.set('token', loginRes.data.token)
      currentUser.value = convertedUser
      isLoggedIn.value = true
      storage.set('current_user', convertedUser)

      return true
    } catch {
      return false
    }
  }

  // 登出
  function logout() {
    currentUser.value = null
    isLoggedIn.value = false
    storage.remove('token')
    storage.remove('current_user')
  }

  // 更新用户信息
  async function updateUser(userData: Partial<User>) {
    try {
      const res = await authApi.updateUser({
        username: userData.username,
        avatar: userData.avatar,
      })
      const convertedUser = convertUser(res.data)
      currentUser.value = convertedUser
      storage.set('current_user', convertedUser)
      return true
    } catch {
      return false
    }
  }

  // 刷新用户信息
  async function refreshUser() {
    try {
      const res = await authApi.getCurrentUser()
      const convertedUser = convertUser(res.data)
      currentUser.value = convertedUser
      storage.set('current_user', convertedUser)
      return true
    } catch {
      return false
    }
  }

  return {
    currentUser,
    isLoggedIn,
    init,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  }
})
