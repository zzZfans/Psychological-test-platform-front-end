import request from '@/utils/request'

const roleApi = {
  roleListAndPermissionList: '/role/list/andPermissionList',
  roleDelete: '/role/delete',
  roleSaveOrUpdate: '/role/saveOrUpdate'
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

export function roleSaveOrUpdate (parameter) {
  return request({
    url: roleApi.roleSaveOrUpdate,
    method: 'post',
    data: parameter
  })
}
