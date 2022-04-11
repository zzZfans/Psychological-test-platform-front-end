import request from '@/utils/request'

const permissionApi = {
  permissionList: '/permission/list',
  permissionDelete: '/permission/delete',
  permissionAdd: '/permission/add',
  permissionUpdate: '/permission/update'
}

export function permissionList () {
  return request({
    url: permissionApi.permissionList,
    method: 'get'
  })
}

export function permissionDelete (parameter) {
  return request({
    url: permissionApi.permissionDelete,
    method: 'post',
    data: parameter
  })
}

export function permissionAdd (parameter) {
  return request({
    url: permissionApi.permissionAdd,
    method: 'post',
    data: parameter
  })
}

export function permissionUpdate (parameter) {
  return request({
    url: permissionApi.permissionUpdate,
    method: 'post',
    data: parameter
  })
}
