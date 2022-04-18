import request from '@/utils/request'

const systemApi = {
  systemInfo: '/system/info',
  operationLogList: '/system/operationLog/list',
  roleListAndPermissionList: '/role/list/andPermissionList',
  roleDelete: '/role/delete',
  roleSaveOrUpdate: '/role/saveOrUpdate',
  permissionIdList: '/role/permissionIdList'
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

export function roleListAndPermissionList () {
  return request({
    url: systemApi.roleListAndPermissionList,
    method: 'get'
  })
}

export function roleDelete (id) {
  return request({
    url: systemApi.roleDelete + '/' + id,
    method: 'delete'
  })
}

export function roleSaveOrUpdate (parameter) {
  return request({
    url: systemApi.roleSaveOrUpdate,
    method: 'post',
    data: parameter
  })
}

export function permissionIdList (id) {
  return request({
    url: systemApi.permissionIdList + '/' + id,
    method: 'get'
  })
}
