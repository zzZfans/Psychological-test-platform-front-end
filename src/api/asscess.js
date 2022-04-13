import request from '@/utils/request'

// 添加测评记录
export function saveAssessRecord (data) {
  return request({
    url: '/assessResult/save',
    method: 'post',
    data: data
  })
}

// 分页查询测评记录
export function pageRecord (data) {
  return request({
    url: '/assessResult/page',
    method: 'post',
    data: data
  })
}

// 分页查询个人测评记录
export function userPageRecord (data) {
  return request({
    url: '/assessResult/userPage',
    method: 'post',
    data: data
  })
}

// 用户测评统计查询
export function recordCount (data) {
  return request({
    url: '/assessResult/userRecordList',
    method: 'post',
    data: data
  })
}

// 获取年份
export function getYears () {
  return request({
    url: '/assessResult/getYears',
    method: 'get'
  })
}
