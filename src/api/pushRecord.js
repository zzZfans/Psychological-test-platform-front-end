import request from '@/utils/request'

// 添加推送信息
export function savePushRecord (data) {
  return request({
    url: '/pushRecord/save',
    method: 'post',
    data: data
  })
}

// 获取推送信息历史列表
export function getPushHistory (receiverId) {
  return request({
    url: `/pushRecord/getPushHistory/${receiverId}`,
    method: 'get'
  })
}
// 获取未读消息条数
export function getUnreadCount () {
  return request({
    url: '/pushRecord/getUnreadCount',
    method: 'get'
  })
}
// 获取推送信息
export function getPushMessagePage (data) {
  return request({
    url: '/pushRecord/getPushMessage',
    method: 'post',
    data: data
  })
}
// 修改消息状态
export function readMessage (msgId) {
  return request({
    url: `/pushRecord/readMessage/${msgId}`,
    method: 'get'
  })
}
