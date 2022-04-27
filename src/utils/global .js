import Vue from 'vue'
// eslint-disable-next-line camelcase
const g_data = {
  unreadCount: 0
}

// 定义属性存储
var unreadCount = new Date()

/*  父子组件事件触发搬运车 */
var eventBus = new Vue()
Vue.prototype.g_bus = eventBus

/* 定义每个属性的监听事件 */
const keys = Object.keys(g_data)
keys.forEach(objItem => {
  Object.defineProperty(g_data, objItem, {
    get: function () {
      return unreadCount
    },
    set: function (newValue) {
      unreadCount = newValue
      eventBus.$emit(`watch_${objItem}`, newValue)
    }
  })
})

// eslint-disable-next-line camelcase
export default g_data
