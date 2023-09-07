<script setup lang="ts">
import { ref } from 'vue'

import MainMenus from '@/components/main-menus.vue'
import MainHeader from '@/components/main-header.vue'

const isCollapse = ref<boolean>(false)

const foldHandle = (flag: boolean) => {
  isCollapse.value = flag
}
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'"
        ><main-menus :isCollapse="isCollapse"></main-menus
      ></el-aside>
      <el-container>
        <el-header
          ><main-header @change-fold="foldHandle"></main-header
        ></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      transition: width 0.3s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
