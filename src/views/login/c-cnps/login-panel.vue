<script setup lang="ts">
import { ref, watch } from 'vue'
import AccountPanel from './account-panel.vue'
import PhonePanel from './phone-panel .vue'
import { localCache } from '@/utils'

const REMEMBER_PASSWORD = 'rememberPwd'
const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache(REMEMBER_PASSWORD) ?? false)
const accountRef = ref<InstanceType<typeof AccountPanel>>()

watch(isRemPwd, (newValue) => {
  if (newValue) {
    localCache.setCache(REMEMBER_PASSWORD, newValue)
  } else {
    localCache.removeCache(REMEMBER_PASSWORD)
  }
})

const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.submitFormData(isRemPwd.value)
  } else {
    console.log('手机号登录')
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="panel-content">
      <el-tabs
        class="demo-tabs"
        type="border-card"
        v-model="activeName"
        stretch
      >
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <account-panel ref="accountRef"></account-panel>
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <phone-panel></phone-panel>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls" v-show="activeName === 'account'">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
