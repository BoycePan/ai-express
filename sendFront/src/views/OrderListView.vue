<script setup lang="ts">
import type { OrderStatus } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import InkTabBar from '@/components/InkTabBar.vue'
import OrderCard from '@/components/OrderCard.vue'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const orderStore = useOrderStore()

const searchKeyword = ref('')
const showSearch = ref(false)
const activeFilter = ref<OrderStatus | 'all'>('all')

const filters = [
  { value: 'all', label: '全部' },
  { value: 'in_transit', label: '运输中' },
  { value: 'delivered', label: '已签收' },
  { value: 'exception', label: '异常' },
]

const filteredOrders = computed(() => {
  let orders = orderStore.filterByStatus(activeFilter.value)

  if (searchKeyword.value.trim()) {
    orders = orderStore.searchOrders(searchKeyword.value.trim())
  }

  return orders
})

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchKeyword.value = ''
  }
}

function handleFilterChange(value: OrderStatus | 'all') {
  activeFilter.value = value
}

onMounted(async () => {
  // 从路由参数获取初始筛选状态
  const status = route.query.status as OrderStatus | undefined
  if (status) {
    activeFilter.value = status
  }
  // 加载订单数据
  await orderStore.loadOrders()
})
</script>

<template>
  <div class="order-list-page ink-page">
    <!-- 顶部搜索区 -->
    <div class="search-header">
      <div class="header-bar flex items-center justify-between px-4 py-3">
        <div class="page-title text-xl text-ink-black font-bold">订单列表</div>
        <button class="search-toggle-btn text-base text-ink-green" @click="toggleSearch">
          {{ showSearch ? '取消' : '🔍 搜索' }}
        </button>
      </div>

      <transition name="slide-down">
        <div v-if="showSearch" class="search-bar px-4 pb-3">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索单号或物品名称"
            class="w-full ink-input"
          />
        </div>
      </transition>

      <!-- 筛选标签 -->
      <div class="filter-tabs flex px-4 pb-3">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-tab"
          :class="{ active: activeFilter === filter.value }"
          @click="handleFilterChange(filter.value as OrderStatus | 'all')"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="order-list px-4 pb-20">
      <div v-if="filteredOrders.length > 0">
        <OrderCard v-for="order in filteredOrders" :key="order.id" :order="order" />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon mb-4 text-6xl">📭</div>
        <div class="empty-text text-base text-ink-gray">暂无订单</div>
      </div>
    </div>

    <!-- 底部导航 -->
    <InkTabBar />
  </div>
</template>

<style scoped>
.order-list-page {
  padding: 0;
}

.search-header {
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(44, 44, 44, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.page-title {
  font-family: 'LXGW WenKai', serif;
}

.search-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'LXGW WenKai', serif;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.search-toggle-btn:hover {
  opacity: 0.7;
}

.search-bar {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.filter-tabs {
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-tabs::-webkit-scrollbar {
  display: none;
}

.filter-tab {
  padding: 8px 20px;
  border-radius: 24px;
  background: #f8f8f6;
  border: 1px solid #e0e0e0;
  color: #666666;
  font-size: 14px;
  font-family: 'LXGW WenKai', serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-tab:hover {
  background: rgba(124, 156, 142, 0.1);
}

.filter-tab.active {
  background: #7c9c8e;
  color: #ffffff;
  border-color: #7c9c8e;
}

.order-list {
  padding-top: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-text {
  font-family: 'LXGW WenKai', serif;
}
</style>
