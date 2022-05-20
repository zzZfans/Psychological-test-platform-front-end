import request from '@/utils/request'

// 修改公告
export function updateNotice (data) {
  return request({
    url: '/notice/update',
    method: 'post',
    data: data
  })
}

// 删除公告
export function deleteNotice (id) {
  return request({
    url: `/notice/delete/${id}`,
    method: 'get'
  })
}
// 分页查询公告
export function pageList (data) {
  return request({
    url: '/notice/page',
    method: 'post',
    data: data
  })
}

export function saveNotice (data) {
  return request({
    url: 'notice/add',
    method: 'post',
    data: data
  })
}
