# 水墨快递 🎨📦

一个充满中国风水墨元素的快递查询追踪移动端应用。

## ✨ 特性

- 🎨 **水墨风UI设计** - 淡雅的水墨画风格，宣纸白背景，墨绿色主题
- 📱 **移动端优先** - 专为移动设备优化的响应式设计
- 🚀 **现代技术栈** - Vue 3 + TypeScript + Vite + UnoCSS
- 📦 **完整功能** - 订单管理、物流追踪、用户系统
- 🎭 **优雅动画** - 平滑的页面切换和交互动画
- 🖋️ **中国风字体** - 霞鹜文楷字体增添文化气息

## 🛠️ 技术栈

- **框架**: Vue 3.4+ (Composition API + script setup)
- **语言**: TypeScript 5+
- **构建工具**: Vite 5+
- **状态管理**: Pinia 2+
- **路由**: Vue Router 4+
- **UI组件**: Vant 4
- **样式**: UnoCSS (原子化CSS)
- **包管理**: pnpm

## 📦 功能模块

### 🏠 首页

- 快递单号查询
- 订单统计卡片
- 快捷入口
- 最近订单列表

### 📋 订单列表

- 订单搜索（支持单号/物品名称）
- 状态筛选（全部/运输中/已签收/异常）
- 订单卡片展示

### 📄 订单详情

- 当前状态展示
- 快递信息
- 收寄信息
- 操作按钮（查看物流、复制单号、删除订单）

### 🚚 物流详情

- 最新动态
- 物流时间轴
- 精美的节点动画

### 👤 我的页面

- 用户信息
- 订单统计
- 功能菜单
- 退出登录

## 🚀 快速开始

### 安装依赖

\`\`\`bash
pnpm install
\`\`\`

### 开发模式

\`\`\`bash
pnpm dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

\`\`\`bash
pnpm build
\`\`\`

### 预览生产版本

\`\`\`bash
pnpm preview
\`\`\`

## 🔐 演示账号

- 手机号: `13800138000`
- 密码: `123456`

您也可以注册新账号进行测试。

## 📁 项目结构

\`\`\`
testSend/
├── public/ # 静态资源
├── src/
│ ├── assets/ # 项目资源
│ ├── components/ # 公共组件
│ │ ├── InkHeader.vue
│ │ ├── InkTabBar.vue
│ │ ├── OrderCard.vue
│ │ └── LogisticsTimeline.vue
│ ├── views/ # 页面组件
│ │ ├── LoginView.vue
│ │ ├── RegisterView.vue
│ │ ├── HomeView.vue
│ │ ├── OrderListView.vue
│ │ ├── OrderDetailView.vue
│ │ ├── LogisticsView.vue
│ │ └── ProfileView.vue
│ ├── stores/ # Pinia stores
│ │ ├── user.ts
│ │ └── order.ts
│ ├── router/ # 路由配置
│ │ └── index.ts
│ ├── utils/ # 工具函数
│ │ ├── storage.ts
│ │ └── mock.ts
│ ├── types/ # TypeScript类型
│ │ └── index.ts
│ ├── App.vue
│ └── main.ts
├── uno.config.ts # UnoCSS配置
├── vite.config.ts
├── tsconfig.json
└── package.json
\`\`\`

## 🎨 设计特色

### 配色方案

- 浓墨: `#2C2C2C`
- 中墨: `#666666`
- 淡墨: `#999999`
- 墨绿: `#7C9C8E`
- 宣纸白: `#F8F8F6`

### 字体

- 霞鹜文楷 (LXGW WenKai)
- 思源宋体备选

### 设计元素

- 圆润的16px圆角
- 轻微的纸张阴影效果
- 水墨画装饰元素（山水、竹叶、云朵）
- 淡入淡出的过渡动画

## 📝 开发说明

### 数据存储

项目使用 LocalStorage 进行本地数据持久化，所有用户数据和订单信息都保存在浏览器本地。

### 模拟数据

`src/utils/mock.ts` 提供了丰富的模拟订单和物流数据，包含：

- 10+ 条不同状态的订单
- 完整的物流时间轴
- 3个快递公司（顺丰、京东、中通）

### 路由守卫

未登录用户访问需要认证的页面会自动跳转到登录页。

## 🔧 工程化配置

本项目已配置完整的前端工程化工具链，确保代码质量和团队协作规范。

### 代码规范

本项目使用 **[@antfu/eslint-config](https://github.com/antfu/eslint-config)** - Anthony Fu 的 ESLint 配置方案。

**特性：**

- ✨ 开箱即用，零配置
- 🎯 自动格式化代码（内置 Prettier 风格）
- 🔧 支持 Vue 3、TypeScript、JSON、Markdown 等
- 📦 自动排序 import 语句
- 🚀 持续更新，与时俱进

```bash
# 检查代码
pnpm lint:check

# 检查并自动修复
pnpm lint
```

### Git 提交规范

#### Commit Message 格式

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构（既不是新增功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或外部依赖变更
- `ci`: CI 配置文件和脚本变更
- `chore`: 其他不修改 src 或 test 的变更
- `revert`: 回退提交

**示例：**

```bash
feat(order): 添加订单筛选功能
fix(login): 修复登录页面验证码显示问题
docs(readme): 更新项目文档
style(components): 统一组件代码格式
```

#### 使用 Commitizen

项目集成了 Commitizen，可以通过交互式命令行生成规范的 commit message：

```bash
# 使用 commitizen 提交
pnpm commit
```

#### Git Hooks

项目使用 Husky 配置了以下 Git Hooks：

- **pre-commit**: 提交前自动运行 lint-staged，对暂存的文件进行 ESLint 检查和格式化
- **commit-msg**: 提交时验证 commit message 是否符合规范

### lint-staged

只对 Git 暂存区的文件进行检查和格式化，提高效率。所有文件都会通过 ESLint 自动检查和修复

## 📄 License

MIT

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [UnoCSS](https://unocss.dev/)
- [Vant](https://vant-ui.github.io/)
- [LXGW WenKai Font](https://github.com/lxgw/LxgwWenKai)

---

**水墨快递** - 追踪每一份期待 ✨
