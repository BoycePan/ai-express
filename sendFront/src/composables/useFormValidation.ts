/**
 * 表单验证Hook
 * 统一的表单验证逻辑
 */

export interface ValidationRule {
  required?: boolean
  pattern?: RegExp
  validator?: (value: any) => boolean
  message?: string
}

export interface ValidationRules {
  [key: string]: ValidationRule | ValidationRule[]
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

/**
 * 表单验证Hook
 */
export function useFormValidation() {
  /**
   * 验证单个字段
   */
  const validateField = (value: any, rules: ValidationRule | ValidationRule[]): { valid: boolean; message: string } => {
    const ruleArray = Array.isArray(rules) ? rules : [rules]

    for (const rule of ruleArray) {
      // 检查必填
      if (rule.required && !value) {
        return {
          valid: false,
          message: rule.message || '此字段为必填',
        }
      }

      // 检查正则表达式
      if (rule.pattern && value && !rule.pattern.test(String(value))) {
        return {
          valid: false,
          message: rule.message || '输入格式不正确',
        }
      }

      // 检查自定义验证函数
      if (rule.validator && value) {
        const result = rule.validator(value)
        if (!result) {
          return {
            valid: false,
            message: rule.message || '验证失败',
          }
        }
      }
    }

    return {
      valid: true,
      message: '',
    }
  }

  /**
   * 验证整个表单
   */
  const validateForm = (formData: Record<string, any>, rules: ValidationRules): ValidationResult => {
    const errors: Record<string, string> = {}
    let valid = true

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const value = formData[fieldName]
      const result = validateField(value, fieldRules)

      if (!result.valid) {
        errors[fieldName] = result.message
        valid = false
      }
    }

    return {
      valid,
      errors,
    }
  }

  return {
    validateField,
    validateForm,
  }
}
