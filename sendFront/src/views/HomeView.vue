<script setup lang="ts">
import { showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import InkTabBar from '@/components/InkTabBar.vue'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()

const trackingNumber = ref('')

const stats = computed(() => orderStore.orderStats)

// 加载订单数据
onMounted(async () => {
  await orderStore.loadOrders()
})

async function handleSearch() {
  if (!trackingNumber.value.trim()) {
    showToast('请输入快递单号')
    return
  }

  const order = await orderStore.searchByTrackingNumber(trackingNumber.value.trim())
  if (order) {
    router.push(`/order/${order.id}`)
  } else {
    showToast('未找到该快递单号')
  }
}

function goToOrders(status: string = 'all') {
  router.push({
    path: '/orders',
    query: status !== 'all' ? { status } : {},
  })
}
</script>

<template>
  <div class="home-page ink-page">
    <!-- 顶部用户信息 -->
    <div class="user-card mb-5">
      <div class="user-info flex items-center">
        <div class="avatar-wrapper">
          <img
            :src="userStore.currentUser?.avatar"
            alt="avatar"
            class="avatar h-14 w-14 rounded-full"
          />
        </div>
        <div class="user-details ml-4">
          <div class="username mb-1 text-lg text-ink-black font-bold">
            {{ userStore.currentUser?.username }}
          </div>
          <div class="welcome-text text-sm text-ink-gray">欢迎使用水墨快递</div>
        </div>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="search-section mb-5">
      <div class="search-card ink-card">
        <div class="search-title mb-3 text-base text-ink-black font-medium">快递查询</div>
        <div class="search-input-wrapper flex items-center">
          <input
            v-model="trackingNumber"
            type="text"
            placeholder="请输入快递单号"
            class="search-input flex-1 ink-input"
            @keyup.enter="handleSearch"
          />
          <button
            class="search-btn ml-3 rounded-ink bg-ink-green px-6 py-3 text-ink-white"
            @click="handleSearch"
          >
            查询
          </button>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access mb-5">
      <div class="section-title mb-3 text-lg text-ink-black font-bold">快捷入口</div>
      <div class="grid grid-cols-3 gap-3">
        <div class="quick-card ink-card text-center" @click="goToOrders('all')">
          <div class="icon mb-2 text-3xl">📦</div>
          <div class="label mb-1 text-sm text-ink-gray">全部订单</div>
          <div class="count text-lg text-ink-black font-bold">
            {{ stats.total }}
          </div>
        </div>
        <div class="quick-card ink-card text-center" @click="goToOrders('in_transit')">
          <div class="icon mb-2 text-3xl">🚚</div>
          <div class="label mb-1 text-sm text-ink-gray">运输中</div>
          <div class="count text-lg text-ink-green font-bold">
            {{ stats.inTransit }}
          </div>
        </div>
        <div class="quick-card ink-card text-center" @click="goToOrders('delivered')">
          <div class="icon mb-2 text-3xl">✅</div>
          <div class="label mb-1 text-sm text-ink-gray">已完成</div>
          <div class="count text-lg text-ink-black font-bold">
            {{ stats.delivered }}
          </div>
        </div>
      </div>
    </div>

    <!-- 最近订单 -->
    <div class="recent-orders">
      <div class="section-title mb-3 text-lg text-ink-black font-bold">最近订单</div>
      <div v-if="orderStore.orders.length > 0" class="recent-list">
        <div
          v-for="order in orderStore.orders.slice(0, 3)"
          :key="order.id"
          class="recent-item mb-3 flex items-center justify-between ink-card"
          @click="router.push(`/order/${order.id}`)"
        >
          <div class="flex flex-1 items-center">
            <span class="courier-logo mr-3 text-2xl">
              <img :src="order.courierLogo" alt="" class="h-4 w-4" />
            </span>
            <div>
              <div class="mb-1 text-sm text-ink-black font-medium">
                {{ order.itemName }}
              </div>
              <div class="text-xs text-ink-light">
                {{ order.trackingNumber }}
              </div>
            </div>
          </div>
          <div class="text-sm text-ink-green">查看 →</div>
        </div>
      </div>
      <div v-else class="empty-state py-8 text-center text-ink-light">暂无订单</div>
    </div>

    <!-- 底部装饰 -->
    <div class="footer-decoration mb-20 mt-8">
      <svg viewBox="0 0 800 200" class="ink-mountain">
        <path
          d="M0,150 Q100,100 200,120 T400,110 Q500,90 600,130 T800,120 L800,200 L0,200 Z"
          fill="rgba(124, 156, 142, 0.1)"
        />
        <path
          d="M0,170 Q150,140 300,160 T600,150 Q700,130 800,170 L800,200 L0,200 Z"
          fill="rgba(124, 156, 142, 0.05)"
        />
      </svg>
    </div>

    <!-- 底部导航 -->
    <InkTabBar />
  </div>
</template>

<style scoped>
.home-page {
  padding: 20px;
  padding-bottom: 80px;
}

.user-card {
  padding: 16px;
  background: linear-gradient(135deg, rgba(124, 156, 142, 0.1) 0%, rgba(124, 156, 142, 0.05) 100%);
  border-radius: 16px;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  border: 3px solid rgba(124, 156, 142, 0.3);
  object-fit: cover;
}

.username,
.welcome-text,
.search-title,
.section-title {
  font-family: 'LXGW WenKai', serif;
}

.search-card {
  background: linear-gradient(to bottom, #ffffff, rgba(248, 248, 246, 0.5));
}

.search-input {
  border: 2px solid #e0e0e0;
}

.search-input:focus {
  outline: none;
  border-color: #7c9c8e;
}

.search-btn {
  font-family: 'LXGW WenKai', serif;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.search-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.search-btn:active {
  transform: translateY(0);
}

.quick-card {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 16px 12px;
}

.quick-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 24px rgba(44, 44, 44, 0.12);
}

.quick-card:active {
  transform: translateY(-2px);
}

.quick-card .label,
.quick-card .count {
  font-family: 'LXGW WenKai', serif;
}

.recent-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.recent-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(44, 44, 44, 0.1);
}

.ink-mountain {
  width: 100%;
  height: auto;
  opacity: 0.8;
}
</style>
