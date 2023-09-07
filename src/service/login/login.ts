import { localCache } from '@/utils'
import cnRequest from '../'
import type { IAccount } from '@/types'
import { TOKEN_NAME } from '@/global'

export function loginAccountRequest(account: IAccount) {
  return cnRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfo(id: number) {
  return cnRequest.get({
    url: `/users/${id}`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(TOKEN_NAME)
    // }
  })
}

export function getRoleInfo(id: number) {
  return cnRequest.get({
    url: `/role/${id}/menu`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(TOKEN_NAME)
    // }
  })
}
