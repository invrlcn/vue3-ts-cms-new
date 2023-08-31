import CNRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils'
import { TOKEN_NAME } from '@/global'

const cnRequest = new CNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors: {
  //   requestSuccessFn: (config) => {
  //     // 每一个请求都自动携带token
  //     const token = localCache.getCache(TOKEN_NAME)
  //     if (config.headers && token) {
  //       config.headers.Authorization = 'Bearer' + token
  //     }
  //     return config
  //   }
  // }
})

export default cnRequest
