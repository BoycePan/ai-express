<script setup lang="ts">
import type { Address, AddressType } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useAddressStore } from '@/stores/address'

const props = defineProps<{
  type: AddressType
  modelValue?: Address | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Address | null): void
  (e: 'select', value: Address): void
  (e: 'add'): void
}>()

const addressStore = useAddressStore()

// 是否展开
const expanded = ref(false)

// 根据类型筛选地址
const filteredAddresses = computed(() => {
  return addressStore.filterByType(props.type)
})

// 默认地址
const defaultAddress = computed(() => {
  return props.type === 'sender'
    ? addressStore.defaultSenderAddress
    : addressStore.defaultReceiverAddress
})

// 当前选中的地址
const selectedAddress = computed(() => {
  return props.modelValue || defaultAddress.value
})

// 获取完整地址
function getFullAddress(address: Address) {
  return `${address.province}${address.city}${address.district}${address.detail}`
}

// 获取类型文本
const typeText = computed(() => {
  return props.type === 'sender' ? '寄件人' : '收件人'
})

// 选择地址
function handleSelect(address: Address) {
  emit('update:modelValue', address)
  emit('select', address)
  expanded.value = false
}

// 添加新地址
function handleAdd() {
  emit('add')
}

// 切换展开
function toggleExpand() {
  if (filteredAddresses.value.length > 0) {
    expanded.value = !expanded.value
  }
}

onMounted(() => {
  addressStore.init()
})
</script>

<template>
  <div class="address-selector">
    <!-- 已选地址展示 -->
    <div class="selected-address" @click="toggleExpand">
      <div class="address-type-label">
        <span class="type-icon">{{ type === 'sender' ? '📤' : '📥' }}</span>
        <span class="type-text">{{ typeText }}</span>
      </div>

      <div v-if="selectedAddress" class="address-info">
        <div class="address-header">
          <span class="contact-name">{{ selectedAddress.name }}</span>
          <span class="contact-phone">{{ selectedAddress.phone }}</span>
          <span v-if="selectedAddress.tag" class="address-tag">{{ selectedAddress.tag }}</span>
          <span v-if="selectedAddress.isDefault" class="default-badge">默认</span>
        </div>
        <div class="address-detail">
          {{ getFullAddress(selectedAddress) }}
        </div>
      </div>

      <div v-else class="empty-address" @click.stop="handleAdd">
        <span class="empty-icon">+</span>
        <span class="empty-text">添加{{ typeText }}地址</span>
      </div>

      <div v-if="filteredAddresses.length > 1" class="expand-arrow">
        <span :class="{ rotated: expanded }">▼</span>
      </div>
    </div>

    <!-- 地址列表 -->
    <div v-if="expanded" class="address-list">
      <div
        v-for="address in filteredAddresses"
        :key="address.id"
        class="address-item"
        :class="[{ selected: selectedAddress?.id === address.id }]"
        @click="handleSelect(address)"
      >
        <div class="address-radio">
          <div class="radio-dot" :class="[{ active: selectedAddress?.id === address.id }]" />
        </div>
        <div class="address-content">
          <div class="address-header">
            <span class="contact-name">{{ address.name }}</span>
            <span class="contact-phone">{{ address.phone }}</span>
            <span v-if="address.tag" class="address-tag">{{ address.tag }}</span>
            <span v-if="address.isDefault" class="default-badge">默认</span>
          </div>
          <div class="address-detail">
            {{ getFullAddress(address) }}
          </div>
        </div>
      </div>

      <!-- 添加新地址 -->
      <div class="add-address-item" @click="handleAdd">
        <span class="add-icon">+</span>
        <span class="add-text">添加新地址</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.address-selector {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(44, 44, 44, 0.05);
}

.selected-address {
  padding: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
}

.selected-address:active {
  background: rgba(124, 156, 142, 0.05);
}

.address-type-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.type-icon {
  font-size: 16px;
}

.type-text {
  font-size: 12px;
  color: #666666;
  font-family: 'LXGW WenKai', serif;
}

.address-info {
  padding-right: 24px;
}

.address-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.contact-name {
  font-size: 16px;
  font-weight: bold;
  color: #2c2c2c;
  font-family: 'LXGW WenKai', serif;
}

.contact-phone {
  font-size: 14px;
  color: #666666;
}

.address-tag {
  padding: 2px 8px;
  font-size: 12px;
  color: #7c9c8e;
  background: rgba(124, 156, 142, 0.15);
  border-radius: 4px;
}

.default-badge {
  padding: 2px 8px;
  font-size: 12px;
  color: white;
  background: #7c9c8e;
  border-radius: 4px;
}

.address-detail {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
}

.empty-address {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  color: #7c9c8e;
}

.empty-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #7c9c8e;
  border-radius: 50%;
  font-size: 16px;
}

.empty-text {
  font-size: 14px;
  font-family: 'LXGW WenKai', serif;
}

.expand-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999999;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.expand-arrow span {
  display: inline-block;
  transition: transform 0.3s ease;
}

.expand-arrow span.rotated {
  transform: rotate(180deg);
}

.address-list {
  border-top: 1px solid rgba(124, 156, 142, 0.1);
  max-height: 300px;
  overflow-y: auto;
}

.address-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(124, 156, 142, 0.05);
}

.address-item:last-of-type {
  border-bottom: none;
}

.address-item:active,
.address-item.selected {
  background: rgba(124, 156, 142, 0.05);
}

.address-radio {
  padding-top: 4px;
}

.radio-dot {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(124, 156, 142, 0.4);
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease;
}

.radio-dot.active {
  border-color: #7c9c8e;
}

.radio-dot.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #7c9c8e;
  border-radius: 50%;
}

.address-content {
  flex: 1;
}

.add-address-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  cursor: pointer;
  color: #7c9c8e;
  transition: background 0.2s ease;
  border-top: 1px dashed rgba(124, 156, 142, 0.2);
}

.add-address-item:active {
  background: rgba(124, 156, 142, 0.05);
}

.add-icon {
  font-size: 16px;
  font-weight: bold;
}

.add-text {
  font-size: 14px;
  font-family: 'LXGW WenKai', serif;
}
</style>
