<script setup lang="ts">
import { reactive } from 'vue'

interface IPhone {
  phone: string
  code: string
}

const formData: IPhone = reactive({
  phone: '',
  code: ''
})
</script>

<template>
  <div class="phone-panel">
    <el-form :model="formData">
      <el-form-item label="手机号">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <div class="code">
        <el-form-item label="验证码">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-button type="primary">获取验证码</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.phone-panel {
  .code {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
