<script setup lang="ts">
import { closeToast, showLoadingToast, showToast } from 'vant'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const phone = ref('')
const password = ref('')

async function handleLogin() {
  if (!phone.value || !password.value) {
    showToast('请输入手机号和密码')
    return
  }

  // 简单的手机号验证
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    showToast('请输入正确的手机号')
    return
  }

  showLoadingToast({
    message: '登录中...',
    forbidClick: true,
    duration: 0,
  })

  try {
    const success = await userStore.login(phone.value, password.value)
    closeToast()

    if (success) {
      showToast('登录成功')
      router.push('/')
    } else {
      showToast('手机号或密码错误')
    }
  } catch {
    closeToast()
    showToast('登录失败，请稍后重试')
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<template>
  <div class="login-page ink-page">
    <!-- 顶部装饰 -->
    <div class="header-decoration">
      <div class="ink-title mb-4 text-5xl text-ink-black font-bold">水墨快递</div>
      <div class="subtitle text-lg text-ink-gray">追踪每一份期待</div>
    </div>

    <!-- 登录表单 -->
    <div class="login-form">
      <div class="ink-card">
        <div class="form-title mb-6 text-2xl text-ink-black font-bold">欢迎回来</div>

        <div class="form-group mb-5">
          <div class="input-label mb-2 text-sm text-ink-gray">手机号</div>
          <input
            v-model="phone"
            type="tel"
            placeholder="请输入手机号"
            class="w-full ink-input text-base"
            maxlength="11"
          />
        </div>

        <div class="form-group mb-6">
          <div class="input-label mb-2 text-sm text-ink-gray">密码</div>
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            class="w-full ink-input text-base"
            @keyup.enter="handleLogin"
          />
        </div>

        <button class="mb-4 w-full ink-btn text-lg font-medium" @click="handleLogin">登录</button>

        <div class="register-link text-center">
          <span class="text-sm text-ink-gray">还没有账号？</span>
          <button class="ml-2 text-sm text-ink-green font-medium" @click="goToRegister">
            立即注册
          </button>
        </div>

        <div class="demo-tip mt-6 rounded-lg bg-ink-bg p-3 text-center text-xs text-ink-gray">
          演示账号：13800138001 或 13800138002
          <br />
          密码：123456
        </div>
      </div>
    </div>

    <!-- 底部装饰 -->
    <div class="footer-decoration">
      <svg viewBox="0 0 1000 300" class="ink-wave">
        <path
          d="M0,100 Q250,50 500,100 T1000,100 L1000,300 L0,300 Z"
          fill="rgba(124, 156, 142, 0.1)"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.header-decoration {
  padding: 60px 24px 40px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.ink-title {
  font-family: 'LXGW WenKai', serif;
  letter-spacing: 4px;
}

.subtitle {
  font-family: 'LXGW WenKai', serif;
  opacity: 0.8;
}

.login-form {
  flex: 1;
  padding: 0 24px 40px;
  position: relative;
  z-index: 1;
}

.form-title {
  font-family: 'LXGW WenKai', serif;
}

.form-group {
  position: relative;
}

.input-label {
  font-family: 'LXGW WenKai', serif;
}

input.ink-input {
  font-size: 16px;
  transition: all 0.3s ease;
}

input.ink-input:focus {
  outline: none;
  border-color: #7c9c8e;
  box-shadow: 0 0 0 2px rgba(124, 156, 142, 0.1);
}

.register-link button {
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.register-link button:hover {
  opacity: 0.8;
}

.demo-tip {
  line-height: 1.6;
}

.footer-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.ink-wave {
  width: 100%;
  height: auto;
}
</style>
