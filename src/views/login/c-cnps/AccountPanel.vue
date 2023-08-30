<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import type { IAccount } from '@/types'

const formData: IAccount = reactive({
  name: '',
  password: ''
})

const formRef = ref()

const formRules: FormRules = {
  name: [
    { required: true, message: '账号为必填项!', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成!',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码为必填项!', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '必须是3位以上的数字或字母组成!',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <div class="account-panel">
    <el-form
      :ref="formRef"
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
