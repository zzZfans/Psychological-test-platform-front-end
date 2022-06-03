import request from '@/utils/request'

const assessApi = {
  saveAudioAndAnalysis: '/file/upload',
  audioAnalysis: '/audio/analysis'
}

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

export function saveAudioAndAnalysis (formData) {
  return request({
    url: assessApi.saveAudioAndAnalysis,
    method: 'post',
    data: formData
  })
}

export function audioAnalysis (formData) {
  return request({
    url: assessApi.audioAnalysis,
    method: 'post',
    data: formData
  })
}

// 获取年份
export function getAnalysis (data) {
  return request({
    url: '/assessResult/getAnalysis',
    method: 'post',
    data: data
  })
}

// 获取年份
export function getUserAssessRecord (data) {
  return request({
    url: '/assessResult/getUserAssessRecord',
    method: 'post',
    data: data
  })
}

// 获取用户测试记录
export function getUserHistoryList (data) {
  return request({
    url: '/assessResult/getUserHistoryList',
    method: 'post',
    data: data
  })
}

// 获取用户分析结果
export function getUserAnalysis (data) {
  return request({
    url: '/assessResult/getUserAnalysis',
    method: 'post',
    data: data
  })
}
