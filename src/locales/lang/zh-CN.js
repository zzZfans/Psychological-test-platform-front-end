import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'
import global from './zh-CN/global'

import menu from './zh-CN/menu'
import setting from './zh-CN/setting'
import user from './zh-CN/user'
import dashboard from './zh-CN/dashboard'
import result from './zh-CN/result'
import account from './zh-CN/account'
import record from './zh-CN/record'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

export default {
  message: '-',

  'layouts.usermenu.dialog.title': '信息',
  'layouts.usermenu.dialog.content': '您确定要退出吗？',
  'layouts.userLayout.title': '大学生心理测试平台是重庆交通大学最具影响力的心理健康诊断辅助系统',
  ...components,
  ...global,
  ...record,
  ...menu,
  ...setting,
  ...user,
  ...dashboard,
  ...result,
  ...account
}
