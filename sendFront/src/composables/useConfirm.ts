/**
 * 确认对话框Hook
 * 统一包装Vant的确认对话框功能
 */

import { showConfirmDialog as vantShowConfirmDialog } from 'vant'

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

/**
 * 显示确认对话框，返回Promise
 */
export function useConfirm() {
  const confirm = async (options: ConfirmOptions): Promise<boolean> => {
    try {
      await vantShowConfirmDialog({
        title: options.title,
        message: options.message,
        confirmButtonText: options.confirmText || '确认',
        cancelButtonText: options.cancelText || '取消',
      })
      return true
    } catch {
      // 用户点击取消
      return false
    }
  }

  return {
    confirm,
  }
}
