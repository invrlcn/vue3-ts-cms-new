<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取菜单
const store = useLoginStore()
const roleMenuData = store.roleData

const subItemHandle = (url: string) => {
  router.push(url)
}
</script>

<template>
  <div class="main-menus">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">管理系统</h2>
    </div>
    <el-menu
      index="1"
      :collapse="false"
      default-active="2"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <template v-for="item in roleMenuData">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon><component :is="item.icon.split('-icon-')[1]" /></el-icon>
            <span class="title">{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item
              :index="subItem.id + ''"
              @click="subItemHandle(subItem.url)"
              >{{ subItem.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.main-menus {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
