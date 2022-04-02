import request from '@/utils/request'

export function systemInfo () {
  return request({
    url: 'http://localhost:8080/system/info',
    method: 'get'
  })
}
