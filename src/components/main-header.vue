<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './header-info.vue'
import HeaderCrumb from './header-crumb.vue'

const emit = defineEmits(['changeFold'])

const isFold = ref<boolean>(false)
const foldHandle = () => {
  isFold.value = !isFold.value
  emit('changeFold', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="header-left">
      <div class="menu-icon" @click="foldHandle">
        <el-icon size="26px">
          <component :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
      <HeaderCrumb />
    </div>

    <div class="menu-content">
      <header-info />
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    align-items: center;
    .menu-icon {
      cursor: pointer;
      margin-right: 16px;
    }
  }
}
</style>
