import request from '@/utils/request'

const userApi = {
  Login: '/user/login',
  Logout: '/user/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/user/register',
  twoStepCode: '/auth/2step-code',
  SendCaptcha: '/captcha',
  SendSmsErr: '/account/sms_err',
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
  tokenTest: '/user/test'
}

export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function register (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}

export function getCaptcha (parameter) {
  return request({
    url: userApi.SendCaptcha,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function tokenTest () {
  return request({
    url: userApi.tokenTest,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'get'
  })
}
