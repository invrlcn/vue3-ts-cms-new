<script setup lang="ts">
import MainMenus from '@/components/main-menus.vue'
import MainHeader from '@/components/main-header.vue'
</script>

<template>
  <div class="main">
    <el-container>
      <el-aside width="210px"><main-menus></main-menus></el-aside>
      <el-container>
        <el-header><main-header></main-header></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
