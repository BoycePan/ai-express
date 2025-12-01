<script setup lang="ts">
import type { OrderStatus } from '@/types'
import { useOrderStatus } from '@/composables/useOrderStatus'

interface Props {
  status: OrderStatus
  size?: 'small' | 'medium' | 'large'
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  showIcon: true,
})

const { getStatusText, getStatusIcon, getStatusColor } = useOrderStatus()
</script>

<template>
  <div
    class="status-badge"
    :class="[`size-${props.size}`]"
    :style="{ borderColor: getStatusColor(props.status), color: getStatusColor(props.status) }"
  >
    <span v-if="showIcon" class="status-icon">{{ getStatusIcon(props.status) }}</span>
    <span class="status-text">{{ getStatusText(props.status) }}</span>
  </div>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 12px;
  font-family: 'LXGW WenKai', serif;
  transition: all 0.3s ease;
}

.status-badge.size-small {
  padding: 2px 8px;
  font-size: 11px;
}

.status-badge.size-medium {
  padding: 4px 12px;
  font-size: 12px;
}

.status-badge.size-large {
  padding: 6px 16px;
  font-size: 14px;
}

.status-icon {
  font-size: 1em;
}

.status-text {
  font-weight: 500;
}
</style>
