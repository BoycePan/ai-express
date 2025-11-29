<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { name: 'Home', path: '/', label: '首页', icon: '🏠' },
  { name: 'OrderList', path: '/orders', label: '订单', icon: '📦' },
  { name: 'Profile', path: '/profile', label: '我的', icon: '👤' },
]

const activeTab = computed(() => {
  return tabs.findIndex(tab => tab.path === route.path)
})

function handleTabChange(index: number) {
  const tab = tabs[index]
  if (tab) {
    router.push(tab.path)
  }
}
</script>

<template>
  <div class="ink-tabbar">
    <div class="tabbar-container">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.name"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="handleTabChange(index)"
      >
        <div class="tab-icon text-2xl">
          {{ tab.icon }}
        </div>
        <div class="tab-label mt-1 text-xs">
          {{ tab.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ink-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0 -2px 12px rgba(44, 44, 44, 0.08);
  z-index: 100;
  padding: env(safe-area-inset-bottom, 0);
}

.tabbar-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  max-width: 600px;
  margin: 0 auto;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #999999;
  font-family: 'LXGW WenKai', serif;
}

.tab-item:active {
  transform: scale(0.95);
}

.tab-item.active {
  color: #7c9c8e;
}

.tab-item.active .tab-icon {
  transform: scale(1.1);
}

.tab-icon {
  transition: transform 0.3s ease;
}

.tab-label {
  font-weight: 500;
}
</style>
