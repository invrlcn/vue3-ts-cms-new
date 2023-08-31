<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import formRules from '../validate/'
import useLoginStore from '@/store/login/login'

const formData: IAccount = reactive({
  name: '',
  password: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

const submitFormData = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = formData.name
      const password = formData.password

      // 调用action函数发生网络请求
      loginStore.loginAccountAction({ name, password })
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
