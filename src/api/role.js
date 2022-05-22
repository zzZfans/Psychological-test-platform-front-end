import request from '@/utils/request'

const roleApi = {
  roleListAndPermissionList: '/role/list/andPermissionList',
  roleDelete: '/role/delete',
  roleSaveOrUpdate: '/role/saveOrUpdate',
  roleList: 'role/list'
}

export function roleListAndPermissionList () {
  return request({
    url: roleApi.roleListAndPermissionList,
    method: 'get'
  })
}

export function roleDelete (id) {
  return request({
    url: roleApi.roleDelete + '/' + id,
    method: 'delete'
  })
}
export function roleList () {
  return request({
    url: roleApi.roleList,
    method: 'get'
  })
}

export function userRoleList (userId) {
  return request({
    url: roleApi.roleList + '/' + userId,
    method: 'get'
  })
}

export function roleSaveOrUpdate (parameter) {
  return request({
    url: roleApi.roleSaveOrUpdate,
    method: 'post',
    data: parameter
  })
}
