/**
 * 地区选择器Hook
 * 管理省市区数据加载和选择状态
 */

import type { AreaData } from '@/api/area'
import { computed, ref } from 'vue'
import { getAreaData } from '@/api/area'

export function useAreaPicker() {
  // 省市区数据
  const areaData = ref<AreaData | null>(null)
  const loading = ref(false)

  // 当前选中的省市区ID
  const selectedProvinceId = ref('')
  const selectedCityId = ref('')

  // 当前步骤
  const areaStep = ref<'province' | 'city' | 'district'>('province')

  // 显示/隐藏状态
  const visible = ref(false)

  /**
   * 省份列表
   */
  const provinces = computed(() => {
    if (!areaData.value) return []
    return areaData.value.p.map(item => ({ id: item.i, name: item.n }))
  })

  /**
   * 可用城市列表
   */
  const availableCities = computed(() => {
    if (!areaData.value || !selectedProvinceId.value) return []
    const cities = areaData.value.c[selectedProvinceId.value] || []
    return cities.map(item => ({ id: item.i, name: item.n }))
  })

  /**
   * 可用区县列表
   */
  const availableDistricts = computed(() => {
    if (!areaData.value || !selectedCityId.value) return []
    const districts = areaData.value.d[selectedCityId.value] || []
    return districts.map(item => ({ id: item.i, name: item.n }))
  })

  /**
   * 加载省市区数据
   */
  const loadAreaData = async () => {
    if (areaData.value) return // 已加载过，不再重复加载

    loading.value = true
    try {
      areaData.value = await getAreaData()
    } catch (error) {
      console.error('加载省市区数据失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 选择省份
   */
  const selectProvince = (province: { id: string; name: string }) => {
    selectedProvinceId.value = province.id
    selectedCityId.value = ''
    areaStep.value = 'city'
    return {
      province: province.name,
      city: '',
      district: '',
    }
  }

  /**
   * 选择城市
   */
  const selectCity = (city: { id: string; name: string }) => {
    selectedCityId.value = city.id
    areaStep.value = 'district'
    return {
      city: city.name,
      district: '',
    }
  }

  /**
   * 选择区县
   */
  const selectDistrict = (district: { id: string; name: string }) => {
    areaStep.value = 'province'
    return {
      district: district.name,
    }
  }

  /**
   * 根据名称查找ID（用于编辑模式）
   */
  const findProvinceIdByName = (name: string): string => {
    if (!areaData.value) return ''
    const province = areaData.value.p.find(p => p.n === name)
    return province?.i || ''
  }

  /**
   * 根据省份ID和城市名称查找城市ID
   */
  const findCityIdByName = (provinceId: string, name: string): string => {
    if (!areaData.value || !provinceId) return ''
    const cities = areaData.value.c[provinceId] || []
    const city = cities.find(c => c.n === name)
    return city?.i || ''
  }

  /**
   * 打开地区选择器
   */
  const open = async () => {
    await loadAreaData()
    areaStep.value = 'province'
    visible.value = true
  }

  /**
   * 关闭地区选择器
   */
  const close = () => {
    visible.value = false
    areaStep.value = 'province'
    selectedProvinceId.value = ''
    selectedCityId.value = ''
  }

  /**
   * 重置状态
   */
  const reset = () => {
    selectedProvinceId.value = ''
    selectedCityId.value = ''
    areaStep.value = 'province'
  }

  /**
   * 设置初始选择（用于编辑模式）
   */
  const setInitialSelection = (province: string, city: string) => {
    selectedProvinceId.value = findProvinceIdByName(province)
    if (selectedProvinceId.value) {
      selectedCityId.value = findCityIdByName(selectedProvinceId.value, city)
    }
  }

  return {
    areaData,
    loading,
    visible,
    areaStep,
    selectedProvinceId,
    selectedCityId,
    provinces,
    availableCities,
    availableDistricts,
    loadAreaData,
    selectProvince,
    selectCity,
    selectDistrict,
    findProvinceIdByName,
    findCityIdByName,
    open,
    close,
    reset,
    setInitialSelection,
  }
}
