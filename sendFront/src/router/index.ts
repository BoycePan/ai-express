import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false, title: '登录' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: false, title: '注册' },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true, title: '首页' },
  },
  {
    path: '/orders',
    name: 'OrderList',
    component: () => import('@/views/OrderListView.vue'),
    meta: { requiresAuth: true, title: '订单列表' },
  },
  {
    path: '/order/:id',
    name: 'OrderDetail',
    component: () => import('@/views/OrderDetailView.vue'),
    meta: { requiresAuth: true, title: '订单详情' },
  },
  {
    path: '/logistics/:id',
    name: 'Logistics',
    component: () => import('@/views/LogisticsView.vue'),
    meta: { requiresAuth: true, title: '物流详情' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true, title: '我的' },
  },
  {
    path: '/address',
    name: 'AddressList',
    component: () => import('@/views/AddressListView.vue'),
    meta: { requiresAuth: true, title: '常用地址' },
  },
  {
    path: '/address/add',
    name: 'AddressAdd',
    component: () => import('@/views/AddressEditView.vue'),
    meta: { requiresAuth: true, title: '添加地址' },
  },
  {
    path: '/address/edit/:id',
    name: 'AddressEdit',
    component: () => import('@/views/AddressEditView.vue'),
    meta: { requiresAuth: true, title: '编辑地址' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 水墨快递`
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    if (userStore.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果已登录，访问登录页时重定向到首页
    if (to.path === '/login' && userStore.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
