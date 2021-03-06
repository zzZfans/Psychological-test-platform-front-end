// import Mock from 'mockjs2'
//
// const permissionList = options => {
//   return {
//     'success': true,
//     'code': 20000,
//     'message': '成功',
//     'result': [
//       {
//         'id': 30,
//         'permissionName': '系统监控',
//         'component': 'RouteView',
//         'routerName': 'sysMonitor',
//         'redirect': null,
//         'path': '/system/monitor',
//         'link': null,
//         'parentId': 0,
//         'icon': 'radar-chart',
//         'permission': null,
//         'permissionType': 1,
//         'status': 0,
//         'sort': 99,
//         'description': null,
//         'createBy': 'admin',
//         'updateBy': null,
//         'createTime': '2021-02-28T00:03:15',
//         'updateTime': null,
//         'isDelete': 0,
//         'children': [
//           {
//             'id': 31,
//             'permissionName': '服务器监控',
//             'component': 'modules/system/monitor/sysInfo',
//             'routerName': 'serverMonitor',
//             'redirect': null,
//             'path': '/system/monitor/sysinfo',
//             'link': null,
//             'parentId': 30,
//             'icon': 'laptop',
//             'permission': null,
//             'permissionType': 1,
//             'status': 0,
//             'sort': 100,
//             'description': null,
//             'createBy': 'admin',
//             'updateBy': null,
//             'createTime': '2021-02-28T00:08:45',
//             'updateTime': null,
//             'isDelete': 0,
//             'children': [
//               {
//                 'id': 32,
//                 'permissionName': '查看',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 31,
//                 'icon': null,
//                 'permission': 'sys:sysinfo:view',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-28T00:17:22',
//                 'updateTime': null,
//                 'isDelete': 0
//               }
//             ]
//           },
//           {
//             'id': 34,
//             'permissionName': '操作日志',
//             'component': 'modules/system/log/log',
//             'routerName': 'sysLog',
//             'redirect': null,
//             'path': '/system/log',
//             'link': null,
//             'parentId': 30,
//             'icon': 'audit',
//             'permission': null,
//             'permissionType': 1,
//             'status': 0,
//             'sort': 100,
//             'description': null,
//             'createBy': 'admin',
//             'updateBy': null,
//             'createTime': '2021-02-28T03:12:33',
//             'updateTime': null,
//             'isDelete': 0,
//             'children': [
//               {
//                 'id': 36,
//                 'permissionName': '查看日志',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 34,
//                 'icon': null,
//                 'permission': 'sys:log:view',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-28T03:12:58',
//                 'updateTime': null,
//                 'isDelete': 0
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'id': 14,
//         'permissionName': '开发管理',
//         'component': 'RouteView',
//         'routerName': 'code',
//         'redirect': null,
//         'path': '/system/code',
//         'link': null,
//         'parentId': 0,
//         'icon': 'robot',
//         'permission': null,
//         'permissionType': 1,
//         'status': 0,
//         'sort': 100,
//         'description': null,
//         'createBy': 'admin',
//         'updateBy': null,
//         'createTime': '2021-02-27T13:23:32',
//         'updateTime': null,
//         'isDelete': 0,
//         'children': [
//           {
//             'id': 16,
//             'permissionName': '字典管理',
//             'component': 'modules/system/dict/dictType',
//             'routerName': 'dict',
//             'redirect': null,
//             'path': '/system/dict',
//             'link': null,
//             'parentId': 14,
//             'icon': 'wallet',
//             'permission': null,
//             'permissionType': 1,
//             'status': 0,
//             'sort': 99,
//             'description': '字典管理',
//             'createBy': 'admin',
//             'updateBy': null,
//             'createTime': '2021-02-27T14:07:34',
//             'updateTime': null,
//             'isDelete': 0,
//             'children': [
//               {
//                 'id': 19,
//                 'permissionName': '编辑字典',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 16,
//                 'icon': null,
//                 'permission': 'sys:dict:update',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': '编辑字典',
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:12:44',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 18,
//                 'permissionName': '删除字典',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 16,
//                 'icon': null,
//                 'permission': 'sys:dict:del',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': '删除字典',
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:12:17',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 17,
//                 'permissionName': '添加字典',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 16,
//                 'icon': null,
//                 'permission': 'sys:dict:add',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': '添加字典',
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:11:46',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 29,
//                 'permissionName': '查看字典',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 16,
//                 'icon': null,
//                 'permission': 'sys:dict:view',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T18:45:03',
//                 'updateTime': null,
//                 'isDelete': 0
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'id': 1,
//         'permissionName': '系统管理',
//         'component': 'RouteView',
//         'routerName': 'system',
//         'redirect': null,
//         'path': null,
//         'link': null,
//         'parentId': 0,
//         'icon': 'setting',
//         'permission': null,
//         'permissionType': 1,
//         'status': 0,
//         'sort': 100,
//         'description': null,
//         'createBy': 'system',
//         'updateBy': null,
//         'createTime': '2021-02-24T02:22:40',
//         'updateTime': null,
//         'isDelete': 0,
//         'children': [
//           {
//             'id': 2,
//             'permissionName': '用户管理',
//             'component': 'modules/system/user/user',
//             'routerName': 'user',
//             'redirect': null,
//             'path': null,
//             'link': null,
//             'parentId': 1,
//             'icon': 'team',
//             'permission': null,
//             'permissionType': 1,
//             'status': 0,
//             'sort': 4,
//             'description': null,
//             'createBy': 'system',
//             'updateBy': null,
//             'createTime': '2021-02-24T02:25:06',
//             'updateTime': null,
//             'isDelete': 0,
//             'children': [
//               {
//                 'id': 8,
//                 'permissionName': '删除用户',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 2,
//                 'icon': null,
//                 'permission': 'sys:user:del',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 0,
//                 'description': null,
//                 'createBy': 'system',
//                 'updateBy': null,
//                 'createTime': '2021-02-24T21:23:55',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 7,
//                 'permissionName': '编辑用户',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 2,
//                 'icon': null,
//                 'permission': 'sys:user:update',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 0,
//                 'description': null,
//                 'createBy': 'system',
//                 'updateBy': null,
//                 'createTime': '2021-02-24T21:23:55',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 6,
//                 'permissionName': '添加用户',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 2,
//                 'icon': null,
//                 'permission': 'sys:user:add',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 0,
//                 'description': null,
//                 'createBy': 'system',
//                 'updateBy': null,
//                 'createTime': '2021-02-24T21:23:55',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 26,
//                 'permissionName': '查看用户',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 2,
//                 'icon': null,
//                 'permission': 'sys:user:view',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T18:43:40',
//                 'updateTime': null,
//                 'isDelete': 0
//               }
//             ]
//           },
//           {
//             'id': 3,
//             'permissionName': '角色管理',
//             'component': 'modules/system/role/role',
//             'routerName': 'role',
//             'redirect': null,
//             'path': null,
//             'link': null,
//             'parentId': 1,
//             'icon': 'solution',
//             'permission': null,
//             'permissionType': 1,
//             'status': 0,
//             'sort': 5,
//             'description': null,
//             'createBy': 'system',
//             'updateBy': null,
//             'createTime': '2021-02-24T02:26:13',
//             'updateTime': null,
//             'isDelete': 0,
//             'children': [
//               {
//                 'id': 25,
//                 'permissionName': '编辑角色',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 3,
//                 'icon': null,
//                 'permission': 'sys:role:update',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:46:05',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 24,
//                 'permissionName': '删除角色',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 3,
//                 'icon': null,
//                 'permission': 'sys:role:del',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:45:49',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 23,
//                 'permissionName': '添加角色',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 3,
//                 'icon': null,
//                 'permission': 'sys:role:add',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:44:59',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 27,
//                 'permissionName': '查看角色',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 3,
//                 'icon': null,
//                 'permission': 'sys:role:view',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T18:44:06',
//                 'updateTime': null,
//                 'isDelete': 0
//               }
//             ]
//           },
//           {
//             'id': 12,
//             'permissionName': '菜单管理',
//             'component': 'modules/system/menu/menu',
//             'routerName': 'menu',
//             'redirect': null,
//             'path': '',
//             'link': null,
//             'parentId': 1,
//             'icon': 'home',
//             'permission': null,
//             'permissionType': 1,
//             'status': 0,
//             'sort': 6,
//             'description': null,
//             'createBy': 'system',
//             'updateBy': null,
//             'createTime': '2021-02-25T11:45:30',
//             'updateTime': null,
//             'isDelete': 0,
//             'children': [
//               {
//                 'id': 21,
//                 'permissionName': '更新菜单',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 12,
//                 'icon': null,
//                 'permission': 'sys:permission:update',
//                 'permissionType': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:36:09',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 22,
//                 'permissionName': '删除菜单',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 12,
//                 'icon': null,
//                 'permission': 'sys:permission:del',
//                 'type': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:36:32',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 28,
//                 'permissionName': '查看菜单',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 12,
//                 'icon': null,
//                 'permission': 'sys:permission:view',
//                 'type': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T18:44:31',
//                 'updateTime': null,
//                 'isDelete': 0
//               },
//               {
//                 'id': 20,
//                 'permissionName': '添加菜单',
//                 'component': null,
//                 'routerName': null,
//                 'redirect': null,
//                 'path': null,
//                 'link': null,
//                 'parentId': 12,
//                 'icon': null,
//                 'permission': 'sys:permission:add',
//                 'type': 2,
//                 'status': 0,
//                 'sort': 100,
//                 'description': null,
//                 'createBy': 'admin',
//                 'updateBy': null,
//                 'createTime': '2021-02-27T14:35:35',
//                 'updateTime': null,
//                 'isDelete': 0
//               }
//             ]
//           }
//         ]
//       },
//       {
//         'id': 4,
//         'permissionName': '仪表盘',
//         'component': 'RouteView',
//         'routerName': 'anylayzer',
//         'redirect': null,
//         'path': '/dashboard/Analysis',
//         'link': null,
//         'parentId': 0,
//         'icon': 'home',
//         'permission': null,
//         'type': 1,
//         'status': 0,
//         'sort': 1000,
//         'description': null,
//         'createBy': 'system',
//         'updateBy': null,
//         'createTime': '2021-02-24T02:56:00',
//         'updateTime': null,
//         'isDelete': 0,
//         'children': [
//           {
//             'id': 5,
//             'permissionName': '工作台',
//             'component': 'dashboard/Workplace',
//             'routerName': 'workplace',
//             'redirect': null,
//             'path': '/dashboard',
//             'link': null,
//             'parentId': 4,
//             'icon': 'code',
//             'permission': null,
//             'type': 1,
//             'status': 0,
//             'sort': 2,
//             'description': null,
//             'createBy': 'system',
//             'updateBy': null,
//             'createTime': '2021-02-24T02:56:00',
//             'updateTime': null,
//             'isDelete': 0
//           }
//         ]
//       }
//     ]
//   }
// }
//
// Mock.mock(/\/api\/permission\/list/, 'get', permissionList)
