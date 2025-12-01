<script setup lang="ts">
interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: '加载中...',
})
</script>

<template>
  <div class="loading-state">
    <div class="loading-spinner">
      <div class="spinner" />
    </div>
    <div class="loading-message">{{ message }}</div>
  </div>
</template>

<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  min-height: 300px;
}

.loading-spinner {
  margin-bottom: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(124, 156, 142, 0.2);
  border-top-color: #7c9c8e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-message {
  font-size: 14px;
  color: #999999;
  font-family: 'LXGW WenKai', serif;
}
</style>
