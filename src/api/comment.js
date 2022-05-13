import request from '@/utils/request'

// 添加评论
export function saveComment (data) {
  return request({
    url: '/userComment/save',
    method: 'post',
    data: data
  })
}
// 删除评论
export function removeComment (id) {
  return request({
    url: `/userComment/remove/${id}`,
    method: 'post'
  })
}
// 获取主评论列表
export function commentList () {
  return request({
    url: '/userComment/list',
    method: 'post'
  })
}
// 查看子评论列表
export function childrenList (id) {
  return request({
    url: `/userComment/childrenList/${id}`,
    method: 'post'
  })
}
