import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 初始化用户store
import { useUserStore } from './stores/user'

// UnoCSS
import 'uno.css'

// Vant
import 'vant/lib/index.css'

// 引入霞鹜文楷字体
const fontLink = document.createElement('link')
fontLink.href = 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

// 创建应用
const app = createApp(App)
const pinia = createPinia()

// 使用插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')

const userStore = useUserStore()
userStore.init()
