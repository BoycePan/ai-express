/**
 * LocalStorage 封装工具
 */

const STORAGE_PREFIX = 'express_tracker_'

export const storage = {
  /**
   * 设置存储
   */
  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(STORAGE_PREFIX + key, serializedValue)
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  /**
   * 获取存储
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  },

  /**
   * 删除存储
   */
  remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key)
  },

  /**
   * 清空所有存储
   */
  clear(): void {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  },
}
