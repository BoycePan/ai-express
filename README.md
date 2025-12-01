# 水墨快递 🎨📦

一个充满中国风水墨元素的快递查询追踪系统，包含前端移动端应用和后端管理系统。

## 📋 项目简介

水墨快递是一个前后端分离的物流管理系统，采用现代化的技术栈构建，提供完整的订单管理、物流追踪、用户系统等功能。前端采用水墨画风格设计，提供优雅的用户体验。

## 🏗️ 项目结构

```
test-express/
├── sendFront/          # 前端项目 (Vue 3 + TypeScript + Vite)
│   ├── src/           # 源代码
│   ├── public/        # 静态资源
│   └── package.json   # 前端依赖配置
│
└── sendBack/          # 后端项目 (Spring Boot + MyBatis Plus)
    ├── src/
    │   ├── main/
    │   │   ├── java/  # Java 源代码
    │   │   └── resources/  # 配置文件
    │   └── test/      # 测试代码
    └── pom.xml        # Maven 依赖配置
```

## ✨ 特性

### 前端特性
- 🎨 **水墨风UI设计** - 淡雅的水墨画风格，宣纸白背景，墨绿色主题
- 📱 **移动端优先** - 专为移动设备优化的响应式设计
- 🚀 **现代技术栈** - Vue 3 + TypeScript + Vite + UnoCSS
- 📦 **完整功能** - 订单管理、物流追踪、用户系统
- 🎭 **优雅动画** - 平滑的页面切换和交互动画
- 🖋️ **中国风字体** - 霞鹜文楷字体增添文化气息

### 后端特性
- 🚀 **Spring Boot 3.2.5** - 现代化的 Java 框架
- 🗄️ **MyBatis Plus** - 强大的 ORM 框架
- 🔐 **JWT 认证** - 安全的用户认证机制
- 📚 **Swagger API 文档** - 完整的接口文档
- 🛡️ **数据验证** - 完善的数据校验机制
- 🔄 **逻辑删除** - 软删除支持

## 🛠️ 技术栈

### 前端技术栈
- **框架**: Vue 3.4+ (Composition API + script setup)
- **语言**: TypeScript 5+
- **构建工具**: Vite 5+
- **状态管理**: Pinia 2+
- **路由**: Vue Router 4+
- **UI组件**: Vant 4
- **样式**: UnoCSS (原子化CSS)
- **包管理**: pnpm

### 后端技术栈
- **框架**: Spring Boot 3.2.5
- **语言**: Java 17
- **ORM**: MyBatis Plus 3.5.5
- **数据库**: MySQL
- **工具库**: Hutool 5.8.25
- **JWT**: JJWT 0.12.5
- **API文档**: Springdoc OpenAPI 2.3.0
- **构建工具**: Maven

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **Java**: >= 17
- **Maven**: >= 3.6.0
- **MySQL**: >= 8.0

### 前端启动

```bash
# 进入前端目录
cd sendFront

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 后端启动

```bash
# 进入后端目录
cd sendBack

# 配置数据库
# 修改 sendBack/src/main/resources/application.yml 中的数据库连接信息

# 初始化数据库
# 执行 sendBack/src/main/resources/init.sql 脚本

# 使用 Maven 启动
mvn spring-boot:run
```

后端服务默认运行在 [http://localhost:8080](http://localhost:8080)

API 文档地址: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## 📦 功能模块

### 🏠 首页
- 快递单号查询
- 订单统计卡片
- 快捷入口
- 最近订单列表

### 📋 订单管理
- 订单创建
- 订单列表（支持搜索和筛选）
- 订单详情查看
- 订单状态管理

### 🚚 物流追踪
- 实时物流信息
- 物流时间轴展示
- 物流节点动画

### 👤 用户系统
- 用户注册/登录
- 用户信息管理
- 地址管理
- JWT 认证

### 📍 地址管理
- 地址列表
- 地址添加/编辑
- 地址删除
- 地区选择器

## 🔐 默认账号

- 手机号: `13800138000`
- 密码: `123456`

您也可以注册新账号进行测试。

## 📁 详细文档

- [前端详细文档](./sendFront/README.md)
- [后端 API 文档](http://localhost:8080/swagger-ui.html) (启动后端后访问)

## 🔧 开发说明

### 代码规范

- 前端使用 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 进行代码规范检查
- 后端遵循 Spring Boot 最佳实践
- 统一使用 EditorConfig 配置编辑器

### 数据库配置

修改 `sendBack/src/main/resources/application.yml` 中的数据库连接信息：

```yaml
spring:
  datasource:
    url: jdbc:mysql://your-host:3306/logistics_db
    username: your-username
    password: your-password
```

### API 接口

后端提供 RESTful API，所有接口都需要 JWT 认证（登录接口除外）。

请求头格式：
```
Authorization: Bearer {token}
```

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

## 📝 许可证

本项目仅供学习和研究使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过 Issue 反馈。

