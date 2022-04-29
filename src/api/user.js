import request from '@/utils/request'

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
