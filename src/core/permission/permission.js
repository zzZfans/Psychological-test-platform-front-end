export const PERMISSION_ENUM = {
  'add': { key: 'add', label: '新增' },
  'delete': { key: 'delete', label: '删除' },
  'edit': { key: 'edit', label: '修改' },
  'query': { key: 'query', label: '查询' },
  'get': { key: 'get', label: '详情' },
  'enable': { key: 'enable', label: '启用' },
  'disable': { key: 'disable', label: '禁用' },
  'import': { key: 'import', label: '导入' },
  'export': { key: 'export', label: '导出' }
}

/**
 * <a-button v-if="$auth('form.edit')">Button</a-button>
 * @param Vue
 */
function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return (permission) => {
          return this.$store.getters.permissions.includes(permission)
        }
      }
    }
  })

  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
