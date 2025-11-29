<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import InkHeader from '@/components/InkHeader.vue'
import LogisticsTimeline from '@/components/LogisticsTimeline.vue'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const orderStore = useOrderStore()

const orderId = computed(() => route.params.id as string)
const order = computed(() => orderStore.currentOrder)
const logistics = computed(() => orderStore.currentLogistics)
const loading = ref(true)

const latestNode = computed(() => {
  if (!logistics.value?.timeline) return null
  return logistics.value.timeline.find(node => node.isActive)
})

onMounted(async () => {
  loading.value = true
  await orderStore.setCurrentOrder(orderId.value)
  loading.value = false
})
</script>

<template>
  <div class="logistics-page ink-page">
    <InkHeader title="物流详情" :show-back="true" />

    <div v-if="!loading && order && logistics" class="logistics-content">
      <!-- 订单概览 -->
      <div class="order-overview mb-4 ink-card">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center">
            <span class="courier-logo mr-2 text-2xl">
              <img :src="order.courierLogo" alt="" class="h-6 w-6" />
            </span>
            <span class="text-base text-ink-black font-medium">{{ order.courierCompany }}</span>
          </div>
          <div class="tracking-number text-sm text-ink-gray">
            {{ order.trackingNumber }}
          </div>
        </div>
        <div class="item-name text-sm text-ink-gray">
          {{ order.itemName }}
        </div>
      </div>

      <!-- 当前状态 -->
      <div v-if="latestNode" class="current-status mb-4 ink-card">
        <div class="status-header mb-3 flex items-center">
          <div class="status-dot" />
          <div class="status-label ml-2 text-sm text-ink-green font-medium">最新动态</div>
        </div>
        <div class="status-location mb-2 text-lg text-ink-black font-bold">
          {{ latestNode.location }}
        </div>
        <div class="status-description mb-2 text-sm text-ink-gray">
          {{ latestNode.description }}
        </div>
        <div class="status-time text-xs text-ink-light">
          {{ latestNode.time }}
        </div>
      </div>

      <!-- 物流时间轴 -->
      <div class="timeline-section ink-card">
        <div class="timeline-title mb-4 text-base text-ink-black font-bold">物流轨迹</div>
        <LogisticsTimeline :timeline="logistics.timeline" />
      </div>

      <!-- 底部装饰 -->
      <div class="footer-decoration mb-4 mt-6">
        <svg viewBox="0 0 400 100" class="delivery-illustration">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: rgba(124, 156, 142, 0.2); stop-opacity: 1" />
              <stop offset="100%" style="stop-color: rgba(124, 156, 142, 0.05); stop-opacity: 1" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q100,30 200,50 T400,50"
            stroke="url(#grad)"
            stroke-width="2"
            fill="none"
            stroke-dasharray="5,5"
          />
          <circle cx="0" cy="50" r="4" fill="rgba(124, 156, 142, 0.5)" />
          <circle cx="400" cy="50" r="4" fill="rgba(124, 156, 142, 0.8)" />
        </svg>
      </div>
    </div>

    <div v-else-if="loading" class="loading-state py-20 text-center">
      <div class="text-lg text-ink-gray">加载中...</div>
    </div>

    <div v-else class="loading-state py-20 text-center">
      <div class="text-lg text-ink-gray">暂无物流信息</div>
    </div>
  </div>
</template>

<style scoped>
.logistics-page {
  padding: 0;
}

.logistics-content {
  padding: 16px;
}

.order-overview {
  background: linear-gradient(to bottom, #ffffff, rgba(248, 248, 246, 0.5));
}

.courier-logo {
  font-family: 'LXGW WenKai', serif;
}

.current-status {
  background: linear-gradient(135deg, rgba(124, 156, 142, 0.08) 0%, rgba(124, 156, 142, 0.03) 100%);
  border-left: 4px solid #7c9c8e;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #7c9c8e;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(124, 156, 142, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(124, 156, 142, 0);
  }
}

.status-label,
.timeline-title {
  font-family: 'LXGW WenKai', serif;
}

.status-location {
  font-family: 'LXGW WenKai', serif;
}

.timeline-section {
  background: #ffffff;
}

.delivery-illustration {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}
</style>
