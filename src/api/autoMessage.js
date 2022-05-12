import request from '@/utils/request'

// 添加自动消息
export function saveAutoMsg (data) {
  return request({
    url: '/autoMessage/save',
    method: 'post',
    data: data
  })
}
// 更新消息
export function updateMsg (data) {
  return request({
    url: '/autoMessage/update',
    method: 'post',
    data: data
  })
}

// 分页查询
export function msgPageList (data) {
  return request({
    url: '/autoMessage/page',
    method: 'post',
    data: data
  })
}

// 删除
export function removeMsg (id) {
  return request({
    url: `/autoMessage/delete/${id}`,
    method: 'get'
  })
}
