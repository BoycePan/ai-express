<script setup lang="ts">
import type { LogisticsNode } from '@/types'

interface Props {
  timeline: LogisticsNode[]
}

defineProps<Props>()
</script>

<template>
  <div class="logistics-timeline">
    <div
      v-for="(node, index) in timeline"
      :key="index"
      class="timeline-item"
      :class="{ active: node.isActive }"
    >
      <div class="timeline-dot">
        <div class="dot-inner" />
      </div>
      <div v-if="index < timeline.length - 1" class="timeline-line" />

      <div class="timeline-content">
        <div class="node-time text-xs" :class="node.isActive ? 'text-ink-green' : 'text-ink-light'">
          {{ node.time }}
        </div>
        <div
          class="node-location text-sm font-medium"
          :class="node.isActive ? 'text-ink-black' : 'text-ink-gray'"
        >
          {{ node.location }}
        </div>
        <div
          class="node-description text-sm"
          :class="node.isActive ? 'text-ink-gray' : 'text-ink-light'"
        >
          {{ node.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logistics-timeline {
  position: relative;
  padding: 16px 0;
}

.timeline-item {
  position: relative;
  display: flex;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e0e0e0;
  margin-right: 16px;
  margin-top: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-dot {
  background: #7c9c8e;
  box-shadow: 0 0 0 4px rgba(124, 156, 142, 0.2);
  animation: pulse 2s infinite;
}

.dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 4px rgba(124, 156, 142, 0.2);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(124, 156, 142, 0.1);
  }
}

.timeline-line {
  position: absolute;
  left: 7px;
  top: 20px;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item.active .timeline-line {
  background: linear-gradient(to bottom, #7c9c8e, #e0e0e0);
}

.timeline-content {
  flex: 1;
  font-family: 'LXGW WenKai', serif;
}

.node-time {
  margin-bottom: 4px;
  font-weight: 500;
}

.node-location {
  margin-bottom: 4px;
}

.node-description {
  line-height: 1.5;
}
</style>
