import request from '@/utils/request'

const textTestApi = {
  getTextSubjects: '/subject/text',
  textAnalysis: '/text/analysis'
}

export function getTextSubjects (data) {
  return request({
    url: textTestApi.getTextSubjects,
    method: 'GET',
    data
  })
}

export function textAnalysis (data) {
  return request({
    url: textTestApi.textAnalysis,
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}
