import cnRequest from '../'
import type { IAccount } from '@/types'

export function loginAccountRequest(account: IAccount) {
  return cnRequest.post({
    url: '/login',
    data: account
  })
}
