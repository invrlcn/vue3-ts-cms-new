import { defineStore } from 'pinia'
import { loginAccountRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils'
import { ElMessage } from 'element-plus'

const TOKEN_NAME = 'token'
const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(TOKEN_NAME) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const {
        data: { id, name, token }
      } = await loginAccountRequest(account)
      this.id = id
      this.name = name
      this.token = token
      ElMessage.success('请求成功!')

      // 2. 进行本地缓存
      localCache.setCache(TOKEN_NAME, this.token)
    }
  }
})

export default useLoginStore
