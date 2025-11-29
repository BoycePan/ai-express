<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import InkTabBar from '@/components/InkTabBar.vue'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()

const user = computed(() => userStore.currentUser)
const stats = computed(() => orderStore.orderStats)

const menuItems = [
  {
    icon: '📦',
    label: '我的订单',
    value: stats.value.total,
    action: () => router.push('/orders'),
  },
  {
    icon: '📍',
    label: '常用地址',
    value: '2个',
    action: () => router.push('/address'),
  },
  {
    icon: '⚙️',
    label: '设置',
    value: '',
    action: () => showToast('功能开发中'),
  },
  {
    icon: 'ℹ️',
    label: '关于我们',
    value: '',
    action: () => showToast('水墨快递 v1.0'),
  },
]

async function handleLogout() {
  try {
    await showConfirmDialog({
      title: '确认退出',
      message: '确定要退出登录吗？',
      confirmButtonText: '退出',
      cancelButtonText: '取消',
    })

    userStore.logout()
    showToast('已退出登录')
    router.push('/login')
  } catch {
    // 用户取消
  }
}
</script>

<template>
  <div class="profile-page ink-page">
    <!-- 用户信息卡片 -->
    <div class="user-header">
      <div class="user-card">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <img :src="user?.avatar" alt="avatar" class="avatar" />
          </div>
          <div class="user-info mt-4">
            <div class="username mb-2 text-2xl text-ink-black font-bold">
              {{ user?.username }}
            </div>
            <div class="phone text-sm text-ink-gray">
              {{ user?.phone }}
            </div>
          </div>
        </div>

        <!-- 统计信息 -->
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-value text-2xl text-ink-green font-bold">
              {{ stats.inTransit }}
            </div>
            <div class="stat-label mt-1 text-xs text-ink-gray">运输中</div>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <div class="stat-value text-2xl text-ink-black font-bold">
              {{ stats.delivered }}
            </div>
            <div class="stat-label mt-1 text-xs text-ink-gray">已完成</div>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <div class="stat-value text-2xl text-ink-gray font-bold">
              {{ stats.total }}
            </div>
            <div class="stat-label mt-1 text-xs text-ink-gray">总订单</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 菜单列表 -->
    <div class="menu-section">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item mb-3 flex items-center justify-between ink-card"
        @click="item.action"
      >
        <div class="flex items-center">
          <span class="menu-icon mr-3 text-2xl">{{ item.icon }}</span>
          <span class="menu-label text-base text-ink-black">{{ item.label }}</span>
        </div>
        <div class="flex items-center">
          <span v-if="item.value" class="menu-value mr-2 text-sm text-ink-gray">
            {{ item.value }}
          </span>
          <span class="menu-arrow text-ink-light">→</span>
        </div>
      </div>

      <!-- 退出登录按钮 -->
      <button
        class="logout-btn mt-4 w-full flex items-center justify-center ink-card"
        @click="handleLogout"
      >
        <span class="text-base text-ink-gray">退出登录</span>
      </button>
    </div>

    <!-- 装饰元素 -->
    <div class="profile-decoration">
      <svg viewBox="0 0 400 300" class="bamboo-decoration">
        <!-- 竹子 -->
        <line
          x1="50"
          y1="300"
          x2="50"
          y2="100"
          stroke="rgba(124, 156, 142, 0.2)"
          stroke-width="4"
        />
        <line x1="50" y1="100" x2="30" y2="70" stroke="rgba(124, 156, 142, 0.2)" stroke-width="3" />
        <line x1="50" y1="100" x2="70" y2="70" stroke="rgba(124, 156, 142, 0.2)" stroke-width="3" />
        <line
          x1="50"
          y1="200"
          x2="35"
          y2="175"
          stroke="rgba(124, 156, 142, 0.2)"
          stroke-width="3"
        />
        <line
          x1="50"
          y1="200"
          x2="65"
          y2="175"
          stroke="rgba(124, 156, 142, 0.2)"
          stroke-width="3"
        />

        <!-- 云朵 -->
        <ellipse cx="320" cy="50" rx="40" ry="20" fill="rgba(124, 156, 142, 0.1)" />
        <ellipse cx="350" cy="45" rx="30" ry="15" fill="rgba(124, 156, 142, 0.08)" />
      </svg>
    </div>

    <!-- 底部导航 -->
    <InkTabBar />
  </div>
</template>

<style scoped>
.profile-page {
  padding: 0;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
}

.user-header {
  padding: 32px 20px;
  background: linear-gradient(180deg, rgba(124, 156, 142, 0.1) 0%, rgba(248, 248, 246, 1) 100%);
}

.user-card {
  position: relative;
  z-index: 1;
}

.avatar-section {
  text-align: center;
  margin-bottom: 24px;
}

.avatar-wrapper {
  display: inline-block;
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid rgba(124, 156, 142, 0.3);
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(44, 44, 44, 0.1);
}

.username,
.stat-label,
.menu-label {
  font-family: 'LXGW WenKai', serif;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-family: 'LXGW WenKai', serif;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(124, 156, 142, 0.3), transparent);
}

.menu-section {
  padding: 20px;
  position: relative;
  z-index: 1;
}

.menu-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(44, 44, 44, 0.1);
}

.menu-item:active {
  transform: translateX(2px);
}

.menu-icon {
  width: 32px;
  text-align: center;
}

.logout-btn {
  cursor: pointer;
  padding: 16px;
  transition: all 0.3s ease;
  border: none;
  font-family: 'LXGW WenKai', serif;
}

.logout-btn:hover {
  background: rgba(211, 47, 47, 0.05);
  color: #d32f2f !important;
}

.logout-btn:hover span {
  color: #d32f2f;
}

.profile-decoration {
  position: absolute;
  bottom: 80px;
  right: 0;
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}

.bamboo-decoration {
  width: 200px;
  height: auto;
}
</style>
