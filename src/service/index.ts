import CNRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const cnRequest = new CNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default cnRequest
