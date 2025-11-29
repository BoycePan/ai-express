<script setup lang="ts">
import type { AddressType } from '@/types'
import { showConfirmDialog, showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InkHeader from '@/components/InkHeader.vue'
import { useAddressStore } from '@/stores/address'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

// 是否为选择模式（从其他页面跳转来选择地址）
const selectMode = computed(() => route.query.select === 'true')
const selectType = computed(() => (route.query.type as AddressType | 'all') || 'all')

// 当前筛选类型
const currentType = ref<AddressType | 'all'>('all')

// 根据类型筛选地址
const filteredAddresses = computed(() => {
  if (selectMode.value && selectType.value !== 'all') {
    return addressStore.filterByType(selectType.value)
  }
  return addressStore.filterByType(currentType.value)
})

// 类型标签
const typeOptions = [
  { label: '全部', value: 'all' },
  { label: '寄件人', value: 'sender' },
  { label: '收件人', value: 'receiver' },
]

// 获取完整地址
function getFullAddress(address: any) {
  return `${address.province}${address.city}${address.district}${address.detail}`
}

// 获取类型文本
function getTypeText(type: AddressType) {
  return type === 'sender' ? '寄件' : '收件'
}

// 点击地址
function handleAddressClick(address: any) {
  if (selectMode.value) {
    // 选择模式，返回选中的地址
    router.back()
    // 通过事件总线或状态管理传递选中的地址
    showToast(`已选择: ${address.name}`)
  } else {
    // 编辑模式
    router.push(`/address/edit/${address.id}`)
  }
}

// 添加新地址
function handleAdd() {
  const type =
    selectMode.value && selectType.value !== 'all' ? (selectType.value as AddressType) : ''
  router.push(`/address/add${type ? `?type=${type}` : ''}`)
}

// 设为默认
async function handleSetDefault(address: any) {
  const success = await addressStore.setDefaultAddress(address.id)
  if (success) {
    showToast('已设为默认地址')
  }
}

// 删除地址
async function handleDelete(address: any) {
  try {
    await showConfirmDialog({
      title: '确认删除',
      message: `确定要删除 ${address.name} 的地址吗？`,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    })
    const success = await addressStore.deleteAddress(address.id)
    if (success) {
      showToast('删除成功')
    }
  } catch {
    // 用户取消
  }
}

onMounted(async () => {
  await addressStore.init()
})
</script>

<template>
  <div class="address-list-page ink-page">
    <!-- 头部 -->
    <InkHeader
      :title="selectMode ? '选择地址' : '常用地址'"
      :show-back="true"
      right-text="添加"
      @right-click="handleAdd"
    />

    <!-- 类型筛选 -->
    <div v-if="!selectMode" class="type-filter">
      <div
        v-for="option in typeOptions"
        :key="option.value"
        class="filter-item"
        :class="[{ active: currentType === option.value }]"
        @click="currentType = option.value as AddressType | 'all'"
      >
        {{ option.label }}
      </div>
    </div>

    <!-- 地址列表 -->
    <div class="address-list">
      <div
        v-for="address in filteredAddresses"
        :key="address.id"
        class="address-item ink-card"
        @click="handleAddressClick(address)"
      >
        <!-- 地址信息 -->
        <div class="address-content">
          <div class="address-header">
            <span class="contact-name">{{ address.name }}</span>
            <span class="contact-phone">{{ address.phone }}</span>
            <span v-if="address.tag" class="address-tag">{{ address.tag }}</span>
            <span class="type-badge" :class="[address.type]">{{ getTypeText(address.type) }}</span>
            <span v-if="address.isDefault" class="default-badge">默认</span>
          </div>
          <div class="address-detail">
            {{ getFullAddress(address) }}
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="address-actions" @click.stop>
          <button v-if="!address.isDefault" class="action-btn" @click="handleSetDefault(address)">
            设为默认
          </button>
          <button class="action-btn edit" @click="router.push(`/address/edit/${address.id}`)">
            编辑
          </button>
          <button class="action-btn delete" @click="handleDelete(address)">删除</button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredAddresses.length === 0" class="empty-state">
        <div class="empty-icon">📍</div>
        <div class="empty-text">暂无地址</div>
        <button class="add-btn ink-btn" @click="handleAdd">添加新地址</button>
      </div>
    </div>

    <!-- 底部添加按钮 -->
    <div v-if="filteredAddresses.length > 0" class="bottom-action">
      <button class="add-btn w-full ink-btn" @click="handleAdd">+ 添加新地址</button>
    </div>
  </div>
</template>

<style scoped>
.address-list-page {
  padding-top: 60px;
  padding-bottom: 100px;
  min-height: 100vh;
}

.type-filter {
  display: flex;
  padding: 12px 16px;
  gap: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(124, 156, 142, 0.1);
}

.filter-item {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #666666;
  background: rgba(124, 156, 142, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'LXGW WenKai', serif;
}

.filter-item.active {
  background: #7c9c8e;
  color: white;
}

.address-list {
  padding: 16px;
}

.address-item {
  margin-bottom: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.address-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(44, 44, 44, 0.1);
}

.address-item:active {
  transform: translateY(0);
}

.address-content {
  margin-bottom: 12px;
}

.address-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
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

.type-badge {
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.type-badge.sender {
  color: #e65100;
  background: rgba(230, 81, 0, 0.1);
}

.type-badge.receiver {
  color: #1565c0;
  background: rgba(21, 101, 192, 0.1);
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

.address-actions {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px dashed rgba(124, 156, 142, 0.2);
}

.action-btn {
  padding: 6px 12px;
  font-size: 12px;
  color: #666666;
  background: transparent;
  border: 1px solid rgba(124, 156, 142, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'LXGW WenKai', serif;
}

.action-btn:hover {
  border-color: #7c9c8e;
  color: #7c9c8e;
}

.action-btn.edit:hover {
  border-color: #7c9c8e;
  color: #7c9c8e;
}

.action-btn.delete:hover {
  border-color: #d32f2f;
  color: #d32f2f;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  color: #666666;
  margin-bottom: 24px;
  font-family: 'LXGW WenKai', serif;
}

.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: rgba(248, 248, 246, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(124, 156, 142, 0.1);
}

.add-btn {
  font-family: 'LXGW WenKai', serif;
}
</style>
