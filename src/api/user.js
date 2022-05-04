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

// 获取用户信息
export function getUser () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 修改用户基本信息
export function updateBaseInfo (data) {
  return request({
    url: '/user/updateBaseInfo',
    method: 'post',
    data: data
  })
}

// 修改用户密码信息
export function updatePasswordInfo (data) {
  return request({
    url: '/user/updatePasswordInfo',
    method: 'post',
    data: data
  })
}

// 设置（忘记密码）信息
export function updateForgetPasswordInfo (data) {
  return request({
    url: '/user/updatePasswordByMobileCaptcha',
    method: 'post',
    data: data
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
// 修改用户绑定的手机号
export function updatePhoneByCaptcha (data) {
  return request({
    url: '/user/updatePhonenumberByMobileCaptcha',
    method: 'post',
    data: data
  })
}
