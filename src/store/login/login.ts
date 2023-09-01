import { defineStore } from 'pinia'
import {
  loginAccountRequest,
  getUserInfo,
  getRoleInfo
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils'
import { TOKEN_NAME, USER_DATA, MENU_DATA, NAME } from '@/global'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils'

interface ILoginState {
  name: string
  token: string
  userInfoData: any
  userMenu: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    name: localCache.getCache(NAME) ?? '',
    token: '',
    userInfoData: {},
    userMenu: []
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
      localCache.setCache(NAME, this.name)

      // 3. 根据id获取用户信息
      const userInfoRequestData = await getUserInfo(id)
      const userInfoData = userInfoRequestData.data
      this.userInfoData = userInfoData

      // 4. 根据角色请求用户的权限(菜单menus)
      const userMenuRequest = await getRoleInfo(this.userInfoData.role.id)
      const userMenu = userMenuRequest.data
      this.userMenu = userMenu

      // 5. 本地缓存用户数据和菜单
      localCache.setCache(USER_DATA, userInfoData)
      localCache.setCache(MENU_DATA, userMenu)

      //  添加动态路由
      const routes = mapMenusToRoutes(userMenu)
      routes.forEach((route) => router.addRoute('main', route))
      // 3. 跳转页面
      router.push('/main')
    },
    localRouteAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(TOKEN_NAME)
      const userInfo = localCache.getCache(USER_DATA)
      const menuData = localCache.getCache(MENU_DATA)
      if (token && userInfo && menuData) {
        this.token = token
        this.userInfoData = userInfo
        this.userMenu = menuData
      }
      // 2. 动态添加路由
      const routes = mapMenusToRoutes(this.userMenu)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
})

export default useLoginStore
