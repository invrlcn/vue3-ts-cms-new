import { defineStore } from 'pinia'
import {
  loginAccountRequest,
  getUserInfo,
  getRoleInfo
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils'
import { TOKEN_NAME } from '@/global'
import router from '@/router'

const USER_DATA = 'userInfoData'
const ROLE_DATA = 'roleData'

interface ILoginState {
  name: string
  token: ''
  userInfoData: any
  roleData: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    name: '',
    token: localCache.getCache(TOKEN_NAME) ?? '',
    userInfoData: localCache.getCache(USER_DATA) ?? '',
    roleData: localCache.getCache(ROLE_DATA) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const requestData = await loginAccountRequest(account)
      const id = requestData.data.id
      this.name = requestData.data.name
      this.token = requestData.data.token
      // 2. 进行本地缓存
      localCache.setCache(TOKEN_NAME, this.token)

      // 3. 根据id获取用户信息
      const userInfoRequestData = await getUserInfo(id)
      this.userInfoData = userInfoRequestData.data
      localCache.setCache(USER_DATA, userInfoRequestData.data)

      // 4. 根据角色请求用户的权限(菜单menus)
      const roleDataRequest = await getRoleInfo(this.userInfoData.role.id)
      this.roleData = roleDataRequest.data
      localCache.setCache(ROLE_DATA, roleDataRequest.data)

      // 3. 跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
