<script setup lang="ts">
import { TOKEN_NAME, USER_DATA, MENU_DATA } from '@/global'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils'
import useLoginStore from '@/store/login/login'

const router = useRouter()
const store = useLoginStore()

const quitHandle = () => {
  localCache.removeCache(TOKEN_NAME)
  localCache.removeCache(USER_DATA)
  localCache.removeCache(MENU_DATA)
  router.push('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://img01.yohoboys.com/contentimg/2018/11/22/13/0187be5a52edcdc999f749b9e24c7815fb.jpg"
          />
          <span class="name">{{ store.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="quitHandle">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    margin-right: 20px;

    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
  .info {
    margin-top: 3px;
    border: none;
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .name {
        margin-left: 5px;
      }
    }
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
