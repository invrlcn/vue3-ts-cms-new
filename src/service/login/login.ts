import cnRequest from '../'
import type { loginType } from '@/types'

export function loginAccountRequest(account: loginType) {
  return cnRequest.post({
    url: '/login',
    data: account
  })
}
