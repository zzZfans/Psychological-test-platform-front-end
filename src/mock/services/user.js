import Mock from 'mockjs2'
import { builder } from '../util'

// 原始 info
// const info = options => {
//   // console.log('options', options)
//   const userInfo = {
//     id: '4291d7da9005377ec9aec4a71ea837f',
//     name: '天野远子',
//     username: 'admin',
//     password: '',
//     avatar: '/avatar2.jpg',
//     status: 1,
//     telephone: '',
//     lastLoginIp: '27.154.74.117',
//     lastLoginTime: 1534837621348,
//     creatorId: 'admin',
//     createTime: 1497160610259,
//     merchantCode: 'TLif2btpzg079h15bk',
//     deleted: 0,
//     roleId: 'admin',
//     role: {}
//   }
//   // role
//   const roleObj = {
//     id: 'admin',
//     name: '管理员',
//     describe: '拥有所有权限',
//     status: 1,
//     creatorId: 'system',
//     createTime: 1497160610259,
//     deleted: 0,
//     permissions: [
//       {
//         roleId: 'admin',
//         permissionId: 'dashboard',
//         permissionName: '仪表盘',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'exception',
//         permissionName: '异常页面权限',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'result',
//         permissionName: '结果权限',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'profile',
//         permissionName: '详细页权限',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'table',
//         permissionName: '表格权限',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'import',
//             describe: '导入',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'form',
//         permissionName: '表单权限',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'order',
//         permissionName: '订单管理',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'permission',
//         permissionName: '权限管理',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'role',
//         permissionName: '角色管理',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'table',
//         permissionName: '桌子管理',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'query',
//             describe: '查询',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       },
//       {
//         roleId: 'admin',
//         permissionId: 'user',
//         permissionName: '用户管理',
//         actions:
//           '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
//         actionEntitySet: [
//           {
//             action: 'add',
//             describe: '新增',
//             defaultCheck: false
//           },
//           {
//             action: 'import',
//             describe: '导入',
//             defaultCheck: false
//           },
//           {
//             action: 'get',
//             describe: '详情',
//             defaultCheck: false
//           },
//           {
//             action: 'update',
//             describe: '修改',
//             defaultCheck: false
//           },
//           {
//             action: 'delete',
//             describe: '删除',
//             defaultCheck: false
//           },
//           {
//             action: 'export',
//             describe: '导出',
//             defaultCheck: false
//           }
//         ],
//         actionList: null,
//         dataAccess: null
//       }
//     ]
//   }
//
//   roleObj.permissions.push({
//     roleId: 'admin',
//     permissionId: 'support',
//     permissionName: '超级模块',
//     actions:
//       '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
//     actionEntitySet: [
//       {
//         action: 'add',
//         describe: '新增',
//         defaultCheck: false
//       },
//       {
//         action: 'import',
//         describe: '导入',
//         defaultCheck: false
//       },
//       {
//         action: 'get',
//         describe: '详情',
//         defaultCheck: false
//       },
//       {
//         action: 'update',
//         describe: '修改',
//         defaultCheck: false
//       },
//       {
//         action: 'delete',
//         describe: '删除',
//         defaultCheck: false
//       },
//       {
//         action: 'export',
//         describe: '导出',
//         defaultCheck: false
//       }
//     ],
//     actionList: null,
//     dataAccess: null
//   })
//
//   userInfo.role = roleObj
//   return builder(userInfo)
// }

// my mock info
const info = options => {
  // console.log('options', options)
  const userInfo = {
    id: '123',
    username: 'I\'m a tester',
    status: 0, // 0 正常 1 禁用
    phoneNumber: '13312341234',
    emailAddress: '',
    sex: 2, // '性别 0:女 1：男 2：保密'
    dateOfBirth: '2000-04-01',
    avatar: '/avatar2.jpg',
    faceRecognitionSource: 'xxxxx.xxx',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: '2022-04-01 12:12:12',
    stateChangerId: '234',
    stateChangeTime: '2022-04-01 12:12:12',
    create_time: '2022-03-01 12:12:12',
    update_time: '2022-04-01 12:11:12',
    roles: [],
    permissions: []
  }
  // roles
  const roles = [
    {
    id: '666',
    roleName: '管理员',
    status: 0, // '角色状态 0：启用 1：禁用'
    description: '拥有所有权限',
    creatorId: '777',
    updaterId: '778',
    createTime: '2022-03-01 12:12:12',
    updateTime: '2022-04-01 12:11:12'
    },
    {
    id: '999',
    roleName: '运营',
    status: 0, // '角色状态 0：启用 1：禁用'
    description: '运营工作',
    creatorId: '777',
    updaterId: '778',
    createTime: '2022-03-01 12:12:12',
    updateTime: '2022-04-01 12:11:12'
    }
  ]

  const permissions = ['user.view', 'user.add']

  userInfo.roles = roles
  userInfo.permissions = permissions
  return builder(userInfo)
}

// /** 原始 mock Nav
//  * 使用 用户登录的 token 获取用户有权限的菜单
//  * 返回结构必须按照这个结构体形式处理，或根据
//  * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
//  * @param {*} options
//  * @returns
//  */
// const userNav = options => {
//   const nav = [
//     // dashboard
//     {
//       name: 'dashboard',
//       parentId: 0,
//       id: 1,
//       meta: {
//         icon: 'dashboard',
//         title: '仪表盘',
//         show: true
//       },
//       component: 'RouteView',
//       redirect: '/dashboard/workplace'
//     },
//     {
//       name: 'workplace',
//       parentId: 1,
//       id: 7,
//       meta: {
//         title: '工作台',
//         show: true
//       },
//       component: 'Workplace'
//     },
//     {
//       name: 'monitor',
//       path: 'https://www.baidu.com/',
//       parentId: 1,
//       id: 3,
//       meta: {
//         title: '监控页（外部）',
//         target: '_blank',
//         show: true
//       }
//     },
//     {
//       name: 'Analysis',
//       parentId: 1,
//       id: 2,
//       meta: {
//         title: '分析页',
//         show: true
//       },
//       component: 'Analysis',
//       path: '/dashboard/analysis'
//     },
//
//     // form
//     {
//       name: 'form',
//       parentId: 0,
//       id: 10,
//       meta: {
//         icon: 'form',
//         title: '表单页'
//       },
//       redirect: '/form/base-form',
//       component: 'RouteView'
//     },
//
//     // list
//     {
//       name: 'list',
//       parentId: 0,
//       id: 10010,
//       meta: {
//         icon: 'table',
//         title: '列表页',
//         show: true
//       },
//       redirect: '/list/table-list',
//       component: 'RouteView'
//     },
//     {
//       name: 'basic-list',
//       parentId: 10010,
//       id: 10012,
//       meta: {
//         title: '标准列表',
//         show: true
//       },
//       component: 'StandardList'
//     },
//     {
//       name: 'article',
//       parentId: 10014,
//       id: 10015,
//       meta: {
//         title: '搜索列表（文章）',
//         show: true
//       },
//       component: 'SearchArticles'
//     },
//     {
//       name: 'project',
//       parentId: 10014,
//       id: 10016,
//       meta: {
//         title: '搜索列表（项目）',
//         show: true
//       },
//       component: 'SearchProjects'
//     },
//     {
//       name: 'application',
//       parentId: 10014,
//       id: 10017,
//       meta: {
//         title: '搜索列表（应用）',
//         show: true
//       },
//       component: 'SearchApplications'
//     },
//
//     // profile
//     {
//       name: 'profile',
//       parentId: 0,
//       id: 10018,
//       meta: {
//         title: '详情页',
//         icon: 'profile',
//         show: true
//       },
//       redirect: '/profile/basic',
//       component: 'RouteView'
//     },
//     {
//       name: 'basic',
//       parentId: 10018,
//       id: 10019,
//       meta: {
//         title: '基础详情页',
//         show: true
//       },
//       component: 'ProfileBasic'
//     },
//
//     // assess心理测评
//     {
//       name: 'assess',
//       parentId: 0,
//       id: 11001,
//       meta: {
//         title: '心理测评',
//         icon: 'profile',
//         show: true
//       },
//       redirect: '/assess/table',
//       component: 'RouteView'
//     },
//     {
//       name: 'fast',
//       parentId: 11001,
//       id: 11002,
//       meta: {
//         title: '快速测评',
//         show: true
//       },
//       component: 'AssessTableItem'
//     },
//     {
//       name: 'table',
//       parentId: 11001,
//       id: 11004,
//       meta: {
//         title: '测量表',
//         show: false
//       },
//       component: 'AssessTables'
//     },
//
//     // result
//     {
//       name: 'result',
//       parentId: 0,
//       id: 10021,
//       meta: {
//         title: '结果页',
//         icon: 'check-circle-o',
//         show: true
//       },
//       redirect: '/result/success',
//       component: 'PageView'
//     },
//     {
//       name: 'success',
//       parentId: 10021,
//       id: 10022,
//       meta: {
//         title: '成功',
//         hiddenHeaderContent: true,
//         show: true
//       },
//       component: 'ResultSuccess'
//     },
//     {
//       name: 'fail',
//       parentId: 10021,
//       id: 10023,
//       meta: {
//         title: '失败',
//         hiddenHeaderContent: true,
//         show: true
//       },
//       component: 'ResultFail'
//     },
//
//     // Exception
//     {
//       name: 'exception',
//       parentId: 0,
//       id: 10024,
//       meta: {
//         title: '异常页',
//         icon: 'warning',
//         show: true
//       },
//       redirect: '/exception/403',
//       component: 'RouteView'
//     },
//     {
//       name: '403',
//       parentId: 10024,
//       id: 10025,
//       meta: {
//         title: '403',
//         show: true
//       },
//       component: 'Exception403'
//     },
//     {
//       name: '404',
//       parentId: 10024,
//       id: 10026,
//       meta: {
//         title: '404',
//         show: true
//       },
//       component: 'Exception404'
//     },
//     {
//       name: '500',
//       parentId: 10024,
//       id: 10027,
//       meta: {
//         title: '500',
//         show: true
//       },
//       component: 'Exception500'
//     },
//
//     // account
//     {
//       name: 'account',
//       parentId: 0,
//       id: 10028,
//       meta: {
//         title: '个人页',
//         icon: 'user',
//         show: true
//       },
//       redirect: '/account/center',
//       component: 'RouteView'
//     },
//     {
//       name: 'center',
//       parentId: 10028,
//       id: 10029,
//       meta: {
//         title: '个人中心',
//         show: true
//       },
//       component: 'AccountCenter'
//     },
//     // 特殊三级菜单
//     {
//       name: 'settings',
//       parentId: 10028,
//       id: 10030,
//       meta: {
//         title: '个人设置',
//         hideHeader: true,
//         hideChildren: true,
//         show: true
//       },
//       redirect: '/account/settings/basic',
//       component: 'AccountSettings'
//     },
//     {
//       name: 'BasicSettings',
//       path: '/account/settings/basic',
//       parentId: 10030,
//       id: 10031,
//       meta: {
//         title: '基本设置',
//         show: false
//       },
//       component: 'BasicSetting'
//     },
//     {
//       name: 'SecuritySettings',
//       path: '/account/settings/security',
//       parentId: 10030,
//       id: 10032,
//       meta: {
//         title: '安全设置',
//         show: false
//       },
//       component: 'SecuritySettings'
//     },
//     {
//       name: 'CustomSettings',
//       path: '/account/settings/custom',
//       parentId: 10030,
//       id: 10033,
//       meta: {
//         title: '个性化设置',
//         show: false
//       },
//       component: 'CustomSettings'
//     },
//     {
//       name: 'BindingSettings',
//       path: '/account/settings/binding',
//       parentId: 10030,
//       id: 10034,
//       meta: {
//         title: '账户绑定',
//         show: false
//       },
//       component: 'BindingSettings'
//     },
//     {
//       name: 'NotificationSettings',
//       path: '/account/settings/notification',
//       parentId: 10030,
//       id: 10034,
//       meta: {
//         title: '新消息通知',
//         show: false
//       },
//       component: 'NotificationSettings'
//     }
//   ]
//   const json = builder(nav)
//   // console.log('json', json)
//   return json
// }

/** my mock Nav
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
const userNav = options => {
  const nav = [
    // dashboard
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        icon: 'dashboard',
        title: '仪表盘'
      },
      component: 'RouteView',
      redirect: '/dashboard/workplace'
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: '工作台',
        show: true
      },
      component: 'Workplace'
    },
    {
      name: 'monitor',
      parentId: 1,
      id: 3,
      meta: {
        title: '监控页（外部）'
      }
    },
    {
      name: 'Analysis',
      parentId: 1,
      id: 2,
      meta: {
        title: '分析页'
      },
      component: 'Analysis'
    },

    // form
    {
      name: 'form',
      parentId: 0,
      id: 10,
      meta: {
        icon: 'form',
        title: '表单页'
      },
      redirect: '/form/base-form',
      component: 'RouteView'
    },

    // list
    {
      name: 'list',
      parentId: 0,
      id: 10010,
      meta: {
        icon: 'table',
        title: '列表页'
      },
      redirect: '/list/table-list',
      component: 'RouteView'
    },
    {
      name: 'basic-list',
      parentId: 10010,
      id: 10012,
      meta: {
        title: '标准列表'
      },
      component: 'StandardList'
    },
    {
      name: 'article',
      parentId: 10014,
      id: 10015,
      meta: {
        title: '搜索列表（文章）'
      },
      component: 'SearchArticles'
    },
    {
      name: 'project',
      parentId: 10014,
      id: 10016,
      meta: {
        title: '搜索列表（项目）'
      },
      component: 'SearchProjects'
    },
    {
      name: 'application',
      parentId: 10014,
      id: 10017,
      meta: {
        title: '搜索列表（应用）'
      },
      component: 'SearchApplications'
    },

    // profile
    {
      name: 'profile',
      parentId: 0,
      id: 10018,
      meta: {
        title: '详情页',
        icon: 'profile'
      },
      redirect: '/profile/basic',
      component: 'RouteView'
    },
    {
      name: 'basic',
      parentId: 10018,
      id: 10019,
      meta: {
        title: '基础详情页'
      },
      component: 'ProfileBasic'
    },
    {
      name: 'advanced',
      parentId: 10018,
      id: 10020,
      meta: {
        title: '高级详情页'
      },
      component: 'ProfileAdvanced'
    },

    // assess心理测评
    {
      name: 'assess',
      parentId: 0,
      id: 11001,
      meta: {
        title: '心理测评',
        icon: 'profile'
      },
      redirect: '/assess/table',
      component: 'RouteView'
    },
    {
      name: 'fast',
      parentId: 11001,
      id: 11002,
      meta: {
        title: '快速测评'
      },
      component: 'AssessTableItem'
    },
    {
      name: 'advanced',
      parentId: 11001,
      id: 11003,
      meta: {
        title: '多维度测评'
      },
      component: 'ProfileAdvanced'
    },
    {
      name: 'randomAccess',
      parentId: 11001,
      id: 11004,
      meta: {
        title: '随机测评'
      },
      component: 'AssessTableRandom'
    },

    // result
    {
      name: 'result',
      parentId: 0,
      id: 10021,
      meta: {
        title: '结果页',
        icon: 'check-circle-o'
      },
      redirect: '/result/success',
      component: 'PageView'
    },
    {
      name: 'success',
      parentId: 10021,
      id: 10022,
      meta: {
        title: '成功'
      },
      component: 'ResultSuccess'
    },
    {
      name: 'fail',
      parentId: 10021,
      id: 10023,
      meta: {
        title: '失败'
      },
      component: 'ResultFail'
    },

    // Exception
    {
      name: 'exception',
      parentId: 0,
      id: 10024,
      meta: {
        title: '异常页',
        icon: 'warning'
      },
      redirect: '/exception/403',
      component: 'RouteView'
    },
    {
      name: '403',
      parentId: 10024,
      id: 10025,
      meta: {
        title: '403'
      },
      component: 'Exception403'
    },
    {
      name: '404',
      parentId: 10024,
      id: 10026,
      meta: {
        title: '404'
      },
      component: 'Exception404'
    },
    {
      name: '500',
      parentId: 10024,
      id: 10027,
      meta: {
        title: '500'
      },
      component: 'Exception500'
    },

    // account
    {
      name: 'account',
      parentId: 0,
      id: 10028,
      meta: {
        title: '个人页',
        icon: 'user'
      },
      redirect: '/account/center',
      component: 'RouteView'
    },
    {
      name: 'center',
      parentId: 10028,
      id: 10029,
      meta: {
        title: '个人中心'
      },
      component: 'AccountCenter'
    },
    // 特殊三级菜单
    {
      name: 'settings',
      parentId: 10028,
      id: 10030,
      meta: {
        title: '个人设置'
      },
      redirect: '/account/settings/basic',
      component: 'AccountSettings'
    },
    {
      name: 'BasicSettings',
      parentId: 10030,
      id: 10031,
      meta: {
        title: '基本设置'
      },
      component: 'BasicSetting'
    },
    {
      name: 'SecuritySettings',
      parentId: 10030,
      id: 10032,
      meta: {
        title: '安全设置'
      },
      component: 'SecuritySettings'
    },
    {
      name: 'CustomSettings',
      parentId: 10030,
      id: 10033,
      meta: {
        title: '个性化设置'
      },
      component: 'CustomSettings'
    },
    {
      name: 'BindingSettings',
      parentId: 10030,
      id: 10034,
      meta: {
        title: '人脸采集'
      },
      component: 'BindingSettings'
    },
    {
      name: 'NotificationSettings',
      parentId: 10030,
      id: 10034,
      meta: {
        title: '新消息通知'
      },
      component: 'NotificationSettings'
    }
  ]
  const json = builder(nav)
  // console.log('json', json)
  return json
}

Mock.mock(/\/api\/user_\/info/, 'get', info)
Mock.mock(/\/api\/user_\/nav/, 'get', userNav)
