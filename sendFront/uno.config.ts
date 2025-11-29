import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  theme: {
    colors: {
      ink: {
        black: '#2C2C2C', // 浓墨
        gray: '#666666', // 中墨
        light: '#999999', // 淡墨
        green: '#7C9C8E', // 墨绿
        bg: '#F8F8F6', // 宣纸白
        white: '#FFFFFF', // 纯白
        accent: '#8B9A8F', // 雅致绿
      },
    },
    fontFamily: {
      ink: ['LXGW WenKai', 'Source Han Serif', 'serif'], // 霞鹜文楷、思源宋体
    },
    borderRadius: {
      'ink': '16px', // 水墨风圆角
      'ink-sm': '8px',
      'ink-lg': '24px',
    },
    boxShadow: {
      'ink': '0 2px 12px rgba(44, 44, 44, 0.08)', // 纸张阴影
      'ink-lg': '0 4px 20px rgba(44, 44, 44, 0.12)',
    },
  },
  shortcuts: {
    // 水墨风卡片
    'ink-card': 'bg-ink-white rounded-ink shadow-ink p-4',
    // 水墨风按钮
    'ink-btn':
      'bg-ink-green text-ink-white rounded-ink px-6 py-3 active:opacity-80 transition-opacity',
    // 水墨风输入框
    'ink-input': 'bg-ink-bg border-1 border-ink-light rounded-ink px-4 py-3',
    // 页面容器
    'ink-page': 'min-h-screen bg-ink-bg font-ink',
  },
})
