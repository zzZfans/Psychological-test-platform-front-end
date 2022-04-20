import request from '@/utils/request'

const systemApi = {
  systemInfo: '/system/info',
  operationLogList: '/system/operationLog/list'
}

export function systemInfo () {
  return request({
    url: systemApi.systemInfo,
    method: 'get'
  })
}

export function operationLog (parameter, obj) {
  return request({
    url: systemApi.operationLogList,
    method: 'post',
    params: parameter,
    data: obj
  })
}
