import { get, post, put } from './request'

// 登录请求参数
export interface LoginDTO {
  phone: string
  password: string
}

// 注册请求参数
export interface RegisterDTO {
  username: string
  phone: string
  password: string
}

// 用户信息更新参数
export interface UserUpdateDTO {
  username?: string
  avatar?: string
}

// 用户信息响应
export interface UserVO {
  id: number
  username: string
  phone: string
  avatar: string | null
  createdAt: string
}

// 登录响应
export interface LoginVO {
  token: string
  user: UserVO
}

// 登录
export function login(data: LoginDTO) {
  return post<LoginVO>('/auth/login', data)
}

// 注册
export function register(data: RegisterDTO) {
  return post<UserVO>('/auth/register', data)
}

// 获取当前用户信息
export function getCurrentUser() {
  return get<UserVO>('/auth/user-info')
}

// 更新用户信息
export function updateUser(data: UserUpdateDTO) {
  return put<UserVO>('/auth/user-info', data)
}
