import request from '@/utils/request'

const userApi = {
  userList: '/user/list'
}

export function userList (pagingParams, queryParams) {
  return request({
    url: userApi.userList,
    method: 'post',
    params: pagingParams,
    data: queryParams
  })
}

// 头像上传
export function upload (formData) {
  return request({
    url: '/user/avatar/upload',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
