module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档变更
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不是新增功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'build', // 构建过程或辅助工具的变动
        'ci', // CI配置文件和脚本的变动
        'chore', // 其他不修改src或test的变动
        'revert', // 回退
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // type 不能为空
    'type-empty': [2, 'never'],
  },
}
