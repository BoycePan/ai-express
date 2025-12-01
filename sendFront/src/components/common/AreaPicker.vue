<script setup lang="ts">
import { computed } from 'vue'
import { useAreaPicker } from '@/composables/useAreaPicker'

interface Props {
  modelValue?: boolean
  selectedProvince?: string
  selectedCity?: string
  selectedDistrict?: string
}

interface Emits {
  'update:modelValue': [value: boolean]
  'confirm': [data: { province: string; city: string; district: string }]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<Emits>()

const {
  provinces,
  availableCities,
  availableDistricts,
  loading,
  areaStep,
  selectedProvinceId,
  selectedCityId,
  selectProvince,
  selectCity,
  selectDistrict,
  findProvinceIdByName,
  findCityIdByName,
  loadAreaData,
} = useAreaPicker()

// 当前选择的值
const currentProvince = computed(() => {
  if (selectedProvinceId.value && provinces.value) {
    return provinces.value.find(p => p.id === selectedProvinceId.value)?.name || ''
  }
  return ''
})

const currentCity = computed(() => {
  if (selectedCityId.value && availableCities.value) {
    return availableCities.value.find(c => c.id === selectedCityId.value)?.name || ''
  }
  return ''
})

async function handleOpen() {
  await loadAreaData()
  // 如果有初始值，设置选中状态
  if (props.selectedProvince) {
    const provinceId = findProvinceIdByName(props.selectedProvince)
    selectedProvinceId.value = provinceId
    if (props.selectedCity) {
      selectedCityId.value = findCityIdByName(provinceId, props.selectedCity)
    }
  }
}

function handleProvinceSelect(province: { id: string; name: string }) {
  selectProvince(province)
}

function handleCitySelect(city: { id: string; name: string }) {
  selectCity(city)
}

function handleDistrictSelect(district: { id: string; name: string }) {
  const result = selectDistrict(district)
  emit('update:modelValue', false)
  emit('confirm', {
    province: currentProvince.value,
    city: currentCity.value,
    district: district.name,
  })
}

function handleClose() {
  emit('update:modelValue', false)
}

async function handleOverlayClick() {
  emit('update:modelValue', false)
}

// 监听modelValue变化
function watchModelValue() {
  if (props.modelValue) {
    handleOpen()
  }
}

// 初始化监听
const unwatch = computed(() => {
  return watchModelValue()
})
</script>

<template>
  <div v-if="modelValue" class="area-picker-overlay" @click="handleOverlayClick">
    <div class="area-picker-popup" @click.stop>
      <div class="picker-header">
        <span class="picker-title">选择地区</span>
        <span class="picker-close" @click="handleClose">×</span>
      </div>
      <div class="picker-breadcrumb">
        <span
          class="breadcrumb-item"
          :class="[{ active: areaStep === 'province' }]"
          @click="areaStep = 'province'"
        >
          {{ currentProvince || '请选择' }}
        </span>
        <span v-if="currentProvince" class="breadcrumb-separator">/</span>
        <span
          v-if="currentProvince"
          class="breadcrumb-item"
          :class="[{ active: areaStep === 'city' }]"
          @click="areaStep = 'city'"
        >
          {{ currentCity || '请选择' }}
        </span>
        <span v-if="currentCity" class="breadcrumb-separator">/</span>
        <span
          v-if="currentCity"
          class="breadcrumb-item"
          :class="[{ active: areaStep === 'district' }]"
        >
          {{ selectedDistrict || '请选择' }}
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
            :class="[{ selected: currentProvince === province.name }]"
            @click="handleProvinceSelect(province)"
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
            :class="[{ selected: currentCity === city.name }]"
            @click="handleCitySelect(city)"
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
            :class="[{ selected: selectedDistrict === district.name }]"
            @click="handleDistrictSelect(district)"
          >
            {{ district.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
