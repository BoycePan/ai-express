<script setup lang="ts">
import type { Order } from '@/types'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  order: Order
}

const props = defineProps<Props>()
const router = useRouter()

const statusText = computed(() => {
  const map = {
    pending: '待发货',
    in_transit: '运输中',
    delivered: '已签收',
    exception: '异常',
  }
  return map[props.order.status]
})

const statusColor = computed(() => {
  const map = {
    pending: '#999999',
    in_transit: '#7C9C8E',
    delivered: '#2C2C2C',
    exception: '#D32F2F',
  }
  return map[props.order.status]
})

function handleClick() {
  router.push(`/order/${props.order.id}`)
}
</script>

<template>
  <div class="order-card ink-card" @click="handleClick">
    <div class="card-header mb-3 flex items-center justify-between">
      <div class="courier-info flex items-center">
        <span class="courier-logo mr-2 text-2xl">
          <img :src="order.courierLogo" alt="" class="h-6 w-6" />
        </span>
        <span class="courier-name text-base text-ink-black font-medium">
          {{ order.courierCompany }}
        </span>
      </div>
      <div
        class="status-badge rounded-full px-3 py-1 text-sm"
        :style="{ color: statusColor, backgroundColor: `${statusColor}15` }"
      >
        {{ statusText }}
      </div>
    </div>

    <div class="card-body mb-3">
      <div class="tracking-number mb-2 text-sm text-ink-gray">单号：{{ order.trackingNumber }}</div>
      <div class="item-name text-base text-ink-black font-medium">
        {{ order.itemName }}
      </div>
    </div>

    <div class="card-footer flex items-center justify-between">
      <div class="estimated-time text-xs text-ink-light">
        <span v-if="order.estimatedTime">预计送达：{{ order.estimatedTime }}</span>
        <span v-else>{{ new Date(order.createdAt).toLocaleDateString() }}</span>
      </div>
      <div class="view-btn text-sm text-ink-green">查看详情 →</div>
    </div>
  </div>
</template>

<style scoped>
.order-card {
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(44, 44, 44, 0.12);
}

.order-card:active {
  transform: translateY(0);
}

.courier-info,
.card-body,
.card-footer {
  font-family: 'LXGW WenKai', serif;
}

.status-badge {
  font-weight: 500;
  font-family: 'LXGW WenKai', serif;
}

.view-btn {
  font-family: 'LXGW WenKai', serif;
  font-weight: 500;
}
</style>
