<script setup lang="ts">
import { closeToast, showLoadingToast, showToast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

async function handleRegister() {
  // 表单验证
  if (!username.value || !phone.value || !password.value || !confirmPassword.value) {
    showToast('请填写完整信息')
    return
  }

  if (username.value.length < 2) {
    showToast('用户名至少2个字符')
    return
  }

  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    showToast('请输入正确的手机号')
    return
  }

  if (password.value.length < 6) {
    showToast('密码至少6位')
    return
  }

  if (password.value !== confirmPassword.value) {
    showToast('两次密码不一致')
    return
  }

  showLoadingToast({
    message: '注册中...',
    forbidClick: true,
    duration: 0,
  })

  try {
    const success = await userStore.register(username.value, phone.value, password.value)
    closeToast()

    if (success) {
      showToast('注册成功')
      router.push('/')
    } else {
      showToast('该手机号已注册')
    }
  } catch {
    closeToast()
    showToast('注册失败，请稍后重试')
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="register-page ink-page">
    <!-- 顶部 -->
    <div class="header-section">
      <button class="back-btn text-ink-gray" @click="goToLogin">← 返回登录</button>
      <div class="header-title mt-4 text-3xl text-ink-black font-bold">创建账号</div>
      <div class="header-subtitle mt-2 text-base text-ink-gray">开启您的快递追踪之旅</div>
    </div>

    <!-- 注册表单 -->
    <div class="register-form">
      <div class="ink-card">
        <div class="form-group mb-5">
          <div class="input-label mb-2 text-sm text-ink-gray">用户名</div>
          <input
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            class="w-full ink-input text-base"
          />
        </div>

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

        <div class="form-group mb-5">
          <div class="input-label mb-2 text-sm text-ink-gray">密码</div>
          <input
            v-model="password"
            type="password"
            placeholder="至少6位密码"
            class="w-full ink-input text-base"
          />
        </div>

        <div class="form-group mb-6">
          <div class="input-label mb-2 text-sm text-ink-gray">确认密码</div>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            class="w-full ink-input text-base"
            @keyup.enter="handleRegister"
          />
        </div>

        <button class="w-full ink-btn text-lg font-medium" @click="handleRegister">注册</button>
      </div>
    </div>

    <!-- 底部装饰 -->
    <div class="bottom-decoration">
      <svg viewBox="0 0 1000 200" class="ink-bamboo">
        <line
          x1="100"
          y1="200"
          x2="100"
          y2="50"
          stroke="rgba(124, 156, 142, 0.3)"
          stroke-width="3"
        />
        <line x1="100" y1="50" x2="80" y2="30" stroke="rgba(124, 156, 142, 0.3)" stroke-width="2" />
        <line
          x1="100"
          y1="50"
          x2="120"
          y2="30"
          stroke="rgba(124, 156, 142, 0.3)"
          stroke-width="2"
        />
        <line
          x1="100"
          y1="120"
          x2="85"
          y2="105"
          stroke="rgba(124, 156, 142, 0.3)"
          stroke-width="2"
        />
        <line
          x1="100"
          y1="120"
          x2="115"
          y2="105"
          stroke="rgba(124, 156, 142, 0.3)"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.header-section {
  margin-bottom: 32px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;
}

.back-btn:hover {
  opacity: 0.7;
}

.header-title,
.header-subtitle,
.input-label {
  font-family: 'LXGW WenKai', serif;
}

.register-form {
  position: relative;
  z-index: 1;
}

.form-group {
  position: relative;
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

.bottom-decoration {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0.5;
  z-index: 0;
}

.ink-bamboo {
  width: 100px;
  height: auto;
}
</style>
