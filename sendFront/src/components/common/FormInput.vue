<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  prefixIcon?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': []
  'blur': []
}>()

const hasError = computed(() => !!props.errorMessage)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="form-input-wrapper">
    <label v-if="label" class="form-label">{{ label }}</label>
    <div class="input-wrapper" :class="{ 'has-error': hasError }">
      <span v-if="prefixIcon" class="prefix-icon">{{ prefixIcon }}</span>
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        class="form-input"
        @input="handleInput"
        @focus="emit('focus')"
        @blur="emit('blur')"
      />
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.form-input-wrapper {
  margin-bottom: 12px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #2c2c2c;
  margin-bottom: 8px;
  font-family: 'LXGW WenKai', serif;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid rgba(124, 156, 142, 0.3);
  border-radius: 8px;
  background: #f8f8f6;
  padding: 12px;
  transition: all 0.3s ease;
  gap: 8px;
}

.input-wrapper:focus-within {
  border-color: #7c9c8e;
  box-shadow: 0 0 0 2px rgba(124, 156, 142, 0.1);
}

.input-wrapper.has-error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.prefix-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  font-family: 'LXGW WenKai', serif;
}

.form-input::placeholder {
  color: #999999;
}

.form-input:disabled {
  color: #999999;
  cursor: not-allowed;
}

.error-message {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}
</style>
