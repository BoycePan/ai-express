<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InkHeader from '@/components/InkHeader.vue'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const orderId = computed(() => route.params.id as string)
const order = computed(() => orderStore.currentOrder)

const statusText = computed(() => {
  if (!order.value) return ''
  const map = {
    pending: '待发货',
    in_transit: '运输中',
    delivered: '已签收',
    exception: '异常',
  }
  return map[order.value.status]
})

const statusIcon = computed(() => {
  if (!order.value) return '📦'
  const map = {
    pending: '⏳',
    in_transit: '🚚',
    delivered: '✅',
    exception: '⚠️',
  }
  return map[order.value.status]
})

function handleViewLogistics() {
  router.push(`/logistics/${orderId.value}`)
}

function handleCopyTrackingNumber() {
  if (order.value) {
    navigator.clipboard.writeText(order.value.trackingNumber)
    showToast('单号已复制')
  }
}

async function handleDeleteOrder() {
  try {
    await showConfirmDialog({
      title: '确认删除',
      message: '确定要删除这个订单吗？',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    })

    orderStore.deleteOrder(orderId.value)
    showToast('订单已删除')
    router.push('/orders')
  } catch {
    // 用户取消
  }
}

onMounted(() => {
  orderStore.setCurrentOrder(orderId.value)
})
</script>

<template>
  <div class="order-detail-page ink-page">
    <InkHeader title="订单详情" :show-back="true" />

    <div v-if="order" class="detail-content">
      <!-- 状态卡片 -->
      <div class="status-card mb-4 ink-card">
        <div class="status-icon mb-3 text-center text-6xl">
          {{ statusIcon }}
        </div>
        <div class="status-text mb-2 text-center text-2xl text-ink-black font-bold">
          {{ statusText }}
        </div>
        <div v-if="order.estimatedTime" class="estimated-time text-center text-sm text-ink-gray">
          预计送达：{{ order.estimatedTime }}
        </div>
      </div>

      <!-- 快递信息 -->
      <div class="info-card mb-4 ink-card">
        <div class="card-title mb-4 text-base text-ink-black font-bold">快递信息</div>

        <div class="info-row mb-3 flex items-center justify-between">
          <span class="info-label text-sm text-ink-gray">快递公司</span>
          <span class="info-value flex items-center text-sm text-ink-black">
            <span class="mr-2">{{ order.courierLogo }}</span>
            {{ order.courierCompany }}
          </span>
        </div>

        <div class="info-row mb-3 flex items-center justify-between">
          <span class="info-label text-sm text-ink-gray">快递单号</span>
          <span class="info-value text-sm text-ink-black">{{ order.trackingNumber }}</span>
        </div>

        <div class="info-row flex items-center justify-between">
          <span class="info-label text-sm text-ink-gray">物品名称</span>
          <span class="info-value text-sm text-ink-black">{{ order.itemName }}</span>
        </div>
      </div>

      <!-- 收寄信息 -->
      <div class="contact-card mb-4 ink-card">
        <div class="card-title mb-4 text-base text-ink-black font-bold">收寄信息</div>

        <div class="contact-section mb-4">
          <div class="section-label mb-2 text-sm text-ink-green">寄件人</div>
          <div class="mb-1 text-sm text-ink-black">
            {{ order.sender.name }} {{ order.sender.phone }}
          </div>
          <div class="text-sm text-ink-gray">
            {{ order.sender.address }}
          </div>
        </div>

        <div class="divider mb-4" />

        <div class="contact-section">
          <div class="section-label mb-2 text-sm text-ink-green">收件人</div>
          <div class="mb-1 text-sm text-ink-black">
            {{ order.receiver.name }} {{ order.receiver.phone }}
          </div>
          <div class="text-sm text-ink-gray">
            {{ order.receiver.address }}
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="action-btn primary mb-3 w-full ink-btn" @click="handleViewLogistics">
          查看物流
        </button>
        <div class="flex gap-3">
          <button
            class="action-btn secondary flex-1 border-2 border-ink-green rounded-ink px-4 py-3 text-ink-green"
            @click="handleCopyTrackingNumber"
          >
            复制单号
          </button>
          <button
            class="action-btn secondary flex-1 border-2 border-ink-light rounded-ink px-4 py-3 text-ink-gray"
            @click="handleDeleteOrder"
          >
            删除订单
          </button>
        </div>
      </div>

      <!-- 装饰元素 -->
      <div class="decoration-corner top-left">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M0,0 L0,30 Q0,0 30,0 Z" fill="rgba(124, 156, 142, 0.1)" />
        </svg>
      </div>
      <div class="decoration-corner top-right">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M60,0 L30,0 Q60,0 60,30 Z" fill="rgba(124, 156, 142, 0.1)" />
        </svg>
      </div>
    </div>

    <div v-else class="loading-state py-20 text-center">
      <div class="text-lg text-ink-gray">加载中...</div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-page {
  padding: 0;
  position: relative;
}

.detail-content {
  padding: 16px;
  position: relative;
}

.status-card {
  padding: 32px 24px;
  background: linear-gradient(135deg, rgba(124, 156, 142, 0.05) 0%, rgba(124, 156, 142, 0.1) 100%);
}

.status-text,
.card-title {
  font-family: 'LXGW WenKai', serif;
}

.info-card,
.contact-card {
  position: relative;
}

.info-label,
.section-label {
  font-family: 'LXGW WenKai', serif;
}

.info-row {
  padding: 8px 0;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(124, 156, 142, 0.2), transparent);
}

.action-buttons {
  margin-top: 24px;
  margin-bottom: 24px;
}

.action-btn {
  font-family: 'LXGW WenKai', serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.secondary {
  background: transparent;
  transition: all 0.3s ease;
}

.action-btn.secondary:hover {
  transform: translateY(-2px);
}

.action-btn.secondary:active {
  transform: translateY(0);
}

.decoration-corner {
  position: fixed;
  pointer-events: none;
  opacity: 0.5;
  z-index: 0;
}

.decoration-corner.top-left {
  top: 56px;
  left: 0;
}

.decoration-corner.top-right {
  top: 56px;
  right: 0;
}
</style>
