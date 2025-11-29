import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
  // 禁用与 Prettier 冲突的规则
  rules: {
    // 允许箭头函数参数不使用括号（与 Prettier arrowParens: "avoid" 一致）
    'style/arrow-parens': ['error', 'as-needed'],
    // 接口成员分隔符：关闭（让 Prettier 处理）
    'style/member-delimiter-style': 'off',
    // 允许大括号在同一行（与 Prettier 一致）
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // 操作符换行：关闭（让 Prettier 处理）
    'style/operator-linebreak': 'off',
    // if 语句后换行：关闭（让 Prettier 处理）
    'antfu/if-newline': 'off',
    // 禁用 Vue 单行元素换行要求（与 Prettier 格式化冲突）
    'vue/singleline-html-element-content-newline': 'off',
    // HTML 缩进：关闭（让 Prettier 处理）
    'vue/html-indent': 'off',
    // HTML 闭合标签换行：关闭（让 Prettier 处理）
    'vue/html-closing-bracket-newline': 'off',
    // 允许自闭合的 HTML void 元素（Prettier 会自动处理）
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
})
