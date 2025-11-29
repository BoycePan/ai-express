<script setup lang="ts">
import type { AreaData } from '@/api/area'
import type { AddressFormData, AddressType } from '@/types'
import { showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAreaData } from '@/api/area'
import InkHeader from '@/components/InkHeader.vue'
import { useAddressStore } from '@/stores/address'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

// 是否为编辑模式
const isEdit = computed(() => !!route.params.id)
const addressId = computed(() => route.params.id as string)

// 表单数据
const formData = ref<AddressFormData>({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  tag: '',
  isDefault: false,
  type: 'receiver',
})

// 常用标签
const commonTags = ['家', '公司', '学校', '仓库']

// 省市区数据
const areaData = ref<AreaData | null>(null)
const loading = ref(false)

// 当前选中的省市区ID
const selectedProvinceId = ref('')
const selectedCityId = ref('')

// 省份列表
const provinces = computed(() => {
  if (!areaData.value) return []
  return areaData.value.p.map(item => ({ id: item.i, name: item.n }))
})

// 可用城市列表
const availableCities = computed(() => {
  if (!areaData.value || !selectedProvinceId.value) return []
  const cities = areaData.value.c[selectedProvinceId.value] || []
  return cities.map(item => ({ id: item.i, name: item.n }))
})

// 可用区县列表
const availableDistricts = computed(() => {
  if (!areaData.value || !selectedCityId.value) return []
  const districts = areaData.value.d[selectedCityId.value] || []
  return districts.map(item => ({ id: item.i, name: item.n }))
})

// 显示地区选择器
const showAreaPicker = ref(false)
const areaStep = ref<'province' | 'city' | 'district'>('province')

// 选择省份
function selectProvince(province: { id: string; name: string }) {
  formData.value.province = province.name
  selectedProvinceId.value = province.id
  formData.value.city = ''
  formData.value.district = ''
  selectedCityId.value = ''
  areaStep.value = 'city'
}

// 选择城市
function selectCity(city: { id: string; name: string }) {
  formData.value.city = city.name
  selectedCityId.value = city.id
  formData.value.district = ''
  areaStep.value = 'district'
}

// 选择区县
function selectDistrict(district: { id: string; name: string }) {
  formData.value.district = district.name
  showAreaPicker.value = false
  areaStep.value = 'province'
}

// 打开地区选择器
function openAreaPicker() {
  showAreaPicker.value = true
  areaStep.value = 'province'
}

// 关闭地区选择器
function closeAreaPicker() {
  showAreaPicker.value = false
  areaStep.value = 'province'
}

// 表单验证
function validateForm(): boolean {
  if (!formData.value.name.trim()) {
    showToast('请输入联系人姓名')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
    showToast('请输入正确的手机号')
    return false
  }
  if (!formData.value.province || !formData.value.city || !formData.value.district) {
    showToast('请选择省市区')
    return false
  }
  if (!formData.value.detail.trim()) {
    showToast('请输入详细地址')
    return false
  }
  return true
}

// 保存地址
async function handleSave() {
  if (!validateForm()) return

  if (isEdit.value) {
    const success = await addressStore.updateAddress(addressId.value, formData.value)
    if (success) {
      showToast('保存成功')
      router.back()
    }
  } else {
    const address = await addressStore.addAddress(formData.value)
    if (address) {
      showToast('添加成功')
      router.back()
    }
  }
}

// 加载省市区数据
async function loadAreaData() {
  if (areaData.value) return // 已加载过，不再重复加载

  loading.value = true
  try {
    areaData.value = await getAreaData()
  } catch (error) {
    showToast('加载省市区数据失败')
    console.error('加载省市区数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 根据名称查找ID（用于编辑模式）
function findProvinceIdByName(name: string): string {
  if (!areaData.value) return ''
  const province = areaData.value.p.find(p => p.n === name)
  return province?.i || ''
}

function findCityIdByName(provinceId: string, name: string): string {
  if (!areaData.value || !provinceId) return ''
  const cities = areaData.value.c[provinceId] || []
  const city = cities.find(c => c.n === name)
  return city?.i || ''
}

// 初始化
onMounted(async () => {
  // 先加载省市区数据
  await loadAreaData()

  // 先加载地址数据
  await addressStore.init()

  // 如果是编辑模式，加载地址数据
  if (isEdit.value) {
    const address = addressStore.getAddressById(addressId.value)
    if (address) {
      formData.value = {
        name: address.name,
        phone: address.phone,
        province: address.province,
        city: address.city,
        district: address.district,
        detail: address.detail,
        tag: address.tag || '',
        isDefault: address.isDefault,
        type: address.type,
      }
      // 设置选中的ID
      selectedProvinceId.value = findProvinceIdByName(address.province)
      selectedCityId.value = findCityIdByName(selectedProvinceId.value, address.city)
    }
  } else {
    // 新增模式，检查URL参数
    const type = route.query.type as AddressType
    if (type) formData.value.type = type
  }
})
</script>

<template>
  <div class="address-edit-page ink-page">
    <!-- 头部 -->
    <InkHeader :title="isEdit ? '编辑地址' : '添加地址'" :show-back="true" />

    <!-- 表单 -->
    <div class="form-container">
      <!-- 地址类型 -->
      <div class="form-section">
        <div class="section-title">地址类型</div>
        <div class="type-selector">
          <div
            class="type-option"
            :class="[{ active: formData.type === 'sender' }]"
            @click="formData.type = 'sender'"
          >
            <span class="type-icon">📤</span>
            <span>寄件人地址</span>
          </div>
          <div
            class="type-option"
            :class="[{ active: formData.type === 'receiver' }]"
            @click="formData.type = 'receiver'"
          >
            <span class="type-icon">📥</span>
            <span>收件人地址</span>
          </div>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="form-section">
        <div class="section-title">联系信息</div>
        <div class="form-item">
          <label class="form-label">联系人</label>
          <input
            v-model="formData.name"
            type="text"
            class="ink-input"
            placeholder="请输入联系人姓名"
            maxlength="20"
          />
        </div>
        <div class="form-item">
          <label class="form-label">手机号</label>
          <input
            v-model="formData.phone"
            type="tel"
            class="ink-input"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </div>
      </div>

      <!-- 地区信息 -->
      <div class="form-section">
        <div class="section-title">地区信息</div>
        <div class="form-item">
          <label class="form-label">所在地区</label>
          <div class="area-selector ink-input" @click="openAreaPicker">
            <span v-if="formData.province" class="area-text">
              {{ formData.province }} {{ formData.city }} {{ formData.district }}
            </span>
            <span v-else class="area-placeholder">请选择省/市/区</span>
            <span class="area-arrow">▼</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">详细地址</label>
          <textarea
            v-model="formData.detail"
            class="detail-input ink-input"
            placeholder="请输入详细地址，如街道、门牌号等"
            rows="3"
            maxlength="100"
          />
        </div>
      </div>

      <!-- 标签 -->
      <div class="form-section">
        <div class="section-title">地址标签（可选）</div>
        <div class="tag-selector">
          <div
            v-for="tag in commonTags"
            :key="tag"
            class="tag-option"
            :class="[{ active: formData.tag === tag }]"
            @click="formData.tag = formData.tag === tag ? '' : tag"
          >
            {{ tag }}
          </div>
        </div>
      </div>

      <!-- 设为默认 -->
      <div class="form-section default-section">
        <div class="default-toggle" @click="formData.isDefault = !formData.isDefault">
          <span class="default-label"
            >设为默认{{ formData.type === 'sender' ? '寄件' : '收件' }}地址</span
          >
          <div class="toggle-switch" :class="[{ active: formData.isDefault }]">
            <div class="toggle-thumb" />
          </div>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="bottom-action">
      <button class="save-btn w-full ink-btn" @click="handleSave">保存地址</button>
    </div>

    <!-- 地区选择弹窗 -->
    <div v-if="showAreaPicker" class="area-picker-overlay" @click="closeAreaPicker">
      <div class="area-picker-popup" @click.stop>
        <div class="picker-header">
          <span class="picker-title">选择地区</span>
          <span class="picker-close" @click="closeAreaPicker">×</span>
        </div>
        <div class="picker-breadcrumb">
          <span
            class="breadcrumb-item"
            :class="[{ active: areaStep === 'province' }]"
            @click="areaStep = 'province'"
          >
            {{ formData.province || '请选择' }}
          </span>
          <span v-if="formData.province" class="breadcrumb-separator">/</span>
          <span
            v-if="formData.province"
            class="breadcrumb-item"
            :class="[{ active: areaStep === 'city' }]"
            @click="areaStep = 'city'"
          >
            {{ formData.city || '请选择' }}
          </span>
          <span v-if="formData.city" class="breadcrumb-separator">/</span>
          <span
            v-if="formData.city"
            class="breadcrumb-item"
            :class="[{ active: areaStep === 'district' }]"
          >
            {{ formData.district || '请选择' }}
          </span>
        </div>
        <div class="picker-content">
          <!-- 加载中 -->
          <div v-if="loading" class="picker-loading">
            <span>加载中...</span>
          </div>
          <!-- 省份列表 -->
          <div v-else-if="areaStep === 'province'" class="picker-list">
            <div
              v-for="province in provinces"
              :key="province.id"
              class="picker-item"
              :class="[{ selected: formData.province === province.name }]"
              @click="selectProvince(province)"
            >
              {{ province.name }}
            </div>
          </div>
          <!-- 城市列表 -->
          <div v-else-if="areaStep === 'city'" class="picker-list">
            <div
              v-for="city in availableCities"
              :key="city.id"
              class="picker-item"
              :class="[{ selected: formData.city === city.name }]"
              @click="selectCity(city)"
            >
              {{ city.name }}
            </div>
          </div>
          <!-- 区县列表 -->
          <div v-else-if="areaStep === 'district'" class="picker-list">
            <div
              v-for="district in availableDistricts"
              :key="district.id"
              class="picker-item"
              :class="[{ selected: formData.district === district.name }]"
              @click="selectDistrict(district)"
            >
              {{ district.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.address-edit-page {
  padding-top: 60px;
  padding-bottom: 100px;
  min-height: 100vh;
}

.form-container {
  padding: 16px;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(44, 44, 44, 0.05);
}

.section-title {
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
  font-family: 'LXGW WenKai', serif;
}

.type-selector {
  display: flex;
  gap: 12px;
}

.type-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid rgba(124, 156, 142, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'LXGW WenKai', serif;
  color: #666666;
}

.type-option.active {
  border-color: #7c9c8e;
  background: rgba(124, 156, 142, 0.1);
  color: #7c9c8e;
}

.type-icon {
  font-size: 20px;
}

.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #2c2c2c;
  margin-bottom: 8px;
  font-family: 'LXGW WenKai', serif;
}

.ink-input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(124, 156, 142, 0.3);
  border-radius: 8px;
  font-size: 14px;
  background: #f8f8f6;
  transition: all 0.3s ease;
  font-family: 'LXGW WenKai', serif;
}

.ink-input:focus {
  outline: none;
  border-color: #7c9c8e;
  box-shadow: 0 0 0 2px rgba(124, 156, 142, 0.1);
}

.detail-input {
  resize: none;
  line-height: 1.5;
}

.area-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.area-text {
  color: #2c2c2c;
}

.area-placeholder {
  color: #999999;
}

.area-arrow {
  font-size: 12px;
  color: #999999;
}

.tag-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-option {
  padding: 8px 16px;
  border: 1px solid rgba(124, 156, 142, 0.3);
  border-radius: 20px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'LXGW WenKai', serif;
}

.tag-option.active {
  border-color: #7c9c8e;
  background: #7c9c8e;
  color: white;
}

.default-section {
  padding: 12px 16px;
}

.default-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.default-label {
  font-size: 14px;
  color: #2c2c2c;
  font-family: 'LXGW WenKai', serif;
}

.toggle-switch {
  width: 50px;
  height: 28px;
  background: rgba(124, 156, 142, 0.3);
  border-radius: 14px;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-switch.active {
  background: #7c9c8e;
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-switch.active .toggle-thumb {
  left: 24px;
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

.save-btn {
  font-family: 'LXGW WenKai', serif;
}

/* 地区选择弹窗 */
.area-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.area-picker-popup {
  width: 100%;
  max-height: 70vh;
  background: white;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(124, 156, 142, 0.1);
}

.picker-title {
  font-size: 16px;
  font-weight: bold;
  color: #2c2c2c;
  font-family: 'LXGW WenKai', serif;
}

.picker-close {
  font-size: 24px;
  color: #666666;
  cursor: pointer;
  line-height: 1;
}

.picker-breadcrumb {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(124, 156, 142, 0.05);
  gap: 4px;
}

.breadcrumb-item {
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  font-family: 'LXGW WenKai', serif;
}

.breadcrumb-item.active {
  color: #7c9c8e;
  font-weight: bold;
}

.breadcrumb-separator {
  color: #999999;
}

.picker-content {
  flex: 1;
  overflow-y: auto;
}

.picker-list {
  padding: 8px 0;
}

.picker-item {
  padding: 14px 16px;
  font-size: 14px;
  color: #2c2c2c;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: 'LXGW WenKai', serif;
}

.picker-item:active {
  background: rgba(124, 156, 142, 0.1);
}

.picker-item.selected {
  color: #7c9c8e;
  background: rgba(124, 156, 142, 0.1);
}

.picker-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666666;
  font-family: 'LXGW WenKai', serif;
}
</style>
