import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CNRequestConfig } from './types'

/**
 *
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class CNRequest {
  instance: AxiosInstance

  constructor(config: CNRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的CNRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptor?.requestSuccessFn,
      config.interceptor?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptor?.responseSuccessFn,
      config.interceptor?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: CNRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptor?.requestSuccessFn) {
      config = config.interceptor.requestSuccessFn(config)
    }
    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptor?.responseSuccessFn) {
            res = config.interceptor.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: CNRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: CNRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: CNRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: CNRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default CNRequest
