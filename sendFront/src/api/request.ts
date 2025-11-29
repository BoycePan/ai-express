import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { showToast } from 'vant'
import { storage } from '@/utils/storage'

// API 响应结构
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从 localStorage 获取 token
    const token = storage.get<string>('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data

    // 业务状态码判断
    if (res.code !== 200) {
      showToast(res.message || '请求失败')

      // 401: 未登录或 token 过期
      if (res.code === 401) {
        storage.remove('token')
        storage.remove('current_user')
        window.location.href = '/login'
      }

      return Promise.reject(new Error(res.message || '请求失败'))
    }

    return response
  },
  error => {
    // HTTP 错误处理
    let message = '网络错误，请稍后重试'

    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未登录或登录已过期'
          storage.remove('token')
          storage.remove('current_user')
          window.location.href = '/login'
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求资源不存在'
          break
        case 500:
          message = '服务器错误'
          break
        default:
          message = error.response.data?.message || `请求失败(${status})`
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
    }

    showToast(message)
    return Promise.reject(error)
  },
)

// 封装 GET 请求
export function get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return request.get(url, config).then(res => res.data)
}

// 封装 POST 请求
export function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return request.post(url, data, config).then(res => res.data)
}

// 封装 PUT 请求
export function put<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return request.put(url, data, config).then(res => res.data)
}

// 封装 DELETE 请求
export function del<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return request.delete(url, config).then(res => res.data)
}

export default request
