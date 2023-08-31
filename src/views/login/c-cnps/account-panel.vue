<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import formRules from '../validate/'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils'

const ACCOUNT_NAME = 'name'
const ACCOUNT_PASSWORD = 'password'

const formData: IAccount = reactive({
  name: localCache.getCache(ACCOUNT_NAME) ?? '',
  password: localCache.getCache(ACCOUNT_PASSWORD) ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

const submitFormData = (flag: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = formData.name
      const password = formData.password

      // 调用action函数发生网络请求
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否需要记住密码
        if (flag) {
          localCache.setCache(ACCOUNT_NAME, name)
          localCache.setCache(ACCOUNT_PASSWORD, password)
        } else {
          localCache.removeCache(ACCOUNT_NAME)
          localCache.removeCache(ACCOUNT_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请您输入正确的格式后再操作!')
    }
  })
}

defineExpose({ submitFormData })
</script>

<template>
  <div class="account-panel">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="60px"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.account-panel {
  color: red;
}
</style>
