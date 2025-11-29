<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title: string
  showBack?: boolean
  rightText?: string
}

const _props = withDefaults(defineProps<Props>(), {
  showBack: false,
  rightText: '',
})
// Suppress unused variable warning

const emit = defineEmits<{
  rightClick: []
}>()

const router = useRouter()

function handleBack() {
  router.back()
}

function handleRightClick() {
  emit('rightClick')
}
</script>

<template>
  <div class="ink-header">
    <div class="header-content">
      <button v-if="showBack" class="back-btn text-ink-gray" @click="handleBack">← 返回</button>
      <div v-else class="back-placeholder" />

      <div class="header-title text-lg text-ink-black font-bold">
        {{ title }}
      </div>

      <button v-if="rightText" class="right-btn text-ink-green" @click="handleRightClick">
        {{ rightText }}
      </button>
      <div v-else class="right-placeholder" />
    </div>
  </div>
</template>

<style scoped>
.ink-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(44, 44, 44, 0.05);
  z-index: 99;
  padding-top: env(safe-area-inset-top, 0);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  max-width: 600px;
  margin: 0 auto;
}

.header-title {
  flex: 1;
  text-align: center;
  font-family: 'LXGW WenKai', serif;
}

.back-btn,
.right-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  transition: opacity 0.3s ease;
  font-family: 'LXGW WenKai', serif;
  white-space: nowrap;
}

.back-btn:hover,
.right-btn:hover {
  opacity: 0.7;
}

.back-placeholder,
.right-placeholder {
  width: 60px;
}
</style>
