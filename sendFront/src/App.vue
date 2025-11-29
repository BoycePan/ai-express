<script setup lang="ts">
import { ConfigProvider } from 'vant'

// 水墨快递 - 主应用组件
// Vant 4 主题配置
const themeVars = {
  primaryColor: '#7C9C8E', // 墨绿色
  textColor: '#2C2C2C', // 浓墨
  borderRadius: '16px', // 统一圆角
}
</script>

<template>
  <ConfigProvider :theme-vars="themeVars">
    <div class="app-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </ConfigProvider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8f8f6;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
