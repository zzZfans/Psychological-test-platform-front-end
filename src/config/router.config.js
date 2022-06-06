// eslint-disable-next-line
import { BasicLayout, PageView, UserLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // 系统管理
      {
        path: '/systemManagement',
        component: RouteView,
        redirect: '/permissionManagement',
        name: 'systemManagement',
        meta: { title: '系统管理', icon: 'setting' },
        children: [
          // 用户管理
          {
            path: '/userManagement',
            component: () => import('@/views/systemManagement/userManagement'),
            name: 'userManagement',
            meta: { title: '用户管理', icon: 'solution' }
          },
          // 角色管理
          {
            path: '/roleManagement',
            component: () => import('@/views/systemManagement/roleManagement'),
            name: 'roleManagement',
            meta: { title: '角色管理', icon: 'solution' }
          },
          // 权限管理
          {
            path: '/permissionManagement',
            component: () => import('@/views/systemManagement/permissionManagement'),
            name: 'permissionManagement',
            meta: { title: '权限管理', icon: 'radar-chart' }
          }
        ]
      },
      // 系统监控
      {
        path: '/systemMonitor',
        component: RouteView,
        redirect: '/systemMonitor/systemInfo',
        name: 'systemMonitor',
        meta: { title: '系统监控', icon: 'radar-chart' },
        children: [
          {
            path: '/systemMonitor/systemInfo',
            name: 'systemInfo',
            component: () => import('@/views/systemMonitor/systemInfo'),
            meta: { title: '系统信息', icon: 'laptop' }
          },
          {
            path: '/systemMonitor/operationLog',
            name: 'operationLog',
            component: () => import('@/views/systemMonitor/operationLog'),
            meta: { title: '操作日志', icon: 'audit' }
          }
        ]
      },
      // 录音测试
      {
        path: '/voiceQAEval',
        name: 'voiceQAEval',
        component: () => import('@/views/assess/voiceQAEval'),
        meta: { title: '录音测试', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] }
      },
      // 用户测试记录
      {
        path: '/UserAssessRecord',
        name: 'UserAssessRecord',
        component: () => import('@/views/assess/record/userRecord'),
        meta: { title: '用户测试记录', keepAlive: true, icon: 'form', permission: ['dashboard'] }
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // assess
      {
        path: '/assess',
        name: 'assess',
        component: RouteView,
        meta: {
              title: '心理测评',
              icon: 'profile',
              permission: ['dashboard']
        },
        children: [
            {
              name: 'fast',
              path: '/assess/fast',
              meta: {
                title: '快速测评',
                permission: ['dashboard']
              },
              component: () => import('@/views/assess/table/conf')
            },
          {
            name: 'randomfast',
            path: '/assess/randomfast',
            meta: {
              title: '随机测评',
              permission: ['dashboard']
            },
            component: () => import('@/views/assess/table/tableRandom')
          }
          ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: 'menu.form', icon: 'form', permission: ['form'] }
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: 'menu.list', icon: 'table', permission: ['table'] }
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
        children: []
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
        children: []
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '用户中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/record',
            name: 'record',
            component: () => import('@/views/account/record/index'),
            meta: { title: '测试记录', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '用户设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list'
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
