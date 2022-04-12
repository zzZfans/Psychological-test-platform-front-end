import request from '@/utils/request'

const systemInfoApi = {
  systemInfo: '/system/info'
}

export function systemInfo () {
  return request({
    url: systemInfoApi.systemInfo,
    method: 'get'
  })
}
