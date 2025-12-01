/**
 * Toast提示Hook
 * 统一包装Vant的toast功能
 */

import { closeToast, showLoadingToast, showToast as vantShowToast } from 'vant'

interface ToastOptions {
  message: string
  duration?: number
  forbidClick?: boolean
}

/**
 * 显示普通提示
 */
export function useToast() {
  const toast = (message: string, duration = 2000) => {
    vantShowToast({
      message,
      duration,
    })
  }

  /**
   * 显示加载提示
   */
  const loading = (message = '加载中...') => {
    showLoadingToast({
      message,
      forbidClick: true,
      duration: 0,
    })
  }

  /**
   * 关闭当前提示
   */
  const close = () => {
    closeToast()
  }

  /**
   * 显示成功提示
   */
  const success = (message: string, duration = 2000) => {
    vantShowToast({
      message,
      duration,
      icon: 'success',
    })
  }

  /**
   * 显示错误提示
   */
  const error = (message: string, duration = 2000) => {
    vantShowToast({
      message,
      duration,
      icon: 'cross',
    })
  }

  return {
    toast,
    loading,
    close,
    success,
    error,
  }
}
