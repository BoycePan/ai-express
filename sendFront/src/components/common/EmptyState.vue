<script setup lang="ts">
interface Props {
  icon?: string
  message: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  icon: '📭',
})

defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon }}</div>
    <div class="empty-message">{{ message }}</div>
    <button v-if="actionText" class="empty-action ink-btn" @click="$emit('action')">
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
  min-height: 300px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-message {
  font-size: 14px;
  color: #999999;
  margin-bottom: 24px;
  font-family: 'LXGW WenKai', serif;
  max-width: 200px;
}

.empty-action {
  width: 120px;
  height: 40px;
  font-family: 'LXGW WenKai', serif;
}
</style>
