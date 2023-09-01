import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

const registryStore = (app: App<Element>) => {
  // 1.use的pinia
  app.use(pinia)
  // 2.加载本地的数据
  const loginStore = useLoginStore()
  loginStore.localRouteAction()
}

export default registryStore
