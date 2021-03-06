import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
import { tokenTest } from '@/api/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/info'

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${domTitle} - ${i18nRender(to.meta.title)}`)
  /* has token */
  const accessToken = storage.get(ACCESS_TOKEN)
  let isValidToken = false
  await tokenTest().then(res => {
    isValidToken = res.success
  })
  // console.log(accessToken, isValidToken)
  if (accessToken && isValidToken) {
    // console.log('1')
    if (store.getters.nickname === '游客' && to.path !== loginRoutePath) {
      // console.log('2')
        if (!(to.path === defaultRoutePath || to.path === '/assess/fast')) {
          // console.log('3')
          await store.dispatch('Logout')
          next({ path: loginRoutePath })

          notification['warning']({
            message: '提示',
            description: '注册登录后即可使用目标功能。',
            duration: 3
          })

          NProgress.done()
          return
        }
    }
    if (to.path === loginRoutePath) {
      // console.log(4)
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // console.log(5, to.path)
      // check login user.roles is null
      if (store.getters.roles.length === 0) {
        // console.log(6)
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            // console.log('.then(res => {: ' + JSON.stringify(res))
            const permissions = res.result && res.result.permissions
            // generate dynamic router
            store.dispatch('GenerateRoutes', { permissions }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              // VueRouter@3.5.0+ New API
              store.getters.addRouters.forEach(r => {
                router.addRoute(r)
              })
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        // console.log(7)
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // console.log(8)
      // 在免登录名单，直接进入
      next()
    } else {
      // console.log(9)
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
