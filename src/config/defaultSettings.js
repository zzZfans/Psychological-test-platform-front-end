/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  primaryColor: '#1890ff', // '#F5222D', // primary color of ant design
  navTheme: 'light', // theme for nav menu
  colorWeak: false,
  layout: 'topmenu', // nav menu position: `sidemenu` or `topmenu`
  fixedHeader: true, // sticky header
  fixSiderbar: false, // sticky siderbar
  contentWidth: 'Fixed', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  menu: {
    locale: true
  },
  title: '大学生心理测试平台',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
