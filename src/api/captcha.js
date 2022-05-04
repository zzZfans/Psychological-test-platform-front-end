import request from '@/utils/request'

// 检验验证码
export function confirmCaptcha (data) {
  return request({
    url: '/captcha/confirm',
    method: 'post',
    data: data
  })
}
