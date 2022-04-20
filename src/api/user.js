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
