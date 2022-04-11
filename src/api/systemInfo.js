import request from '@/utils/request'

const systemInfoApi = {
  systemInfo: '/system/info'
}

export function systemInfo () {
  return request({
    url: 'http://localhost:8080' + systemInfoApi.systemInfo,
    method: 'get'
  })
}
