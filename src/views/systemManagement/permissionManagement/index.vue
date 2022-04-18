<template>
  <page-header-wrapper>
    <a-card :bordered="true">
      <div class="table-operator">
        <a-button
          style="margin-bottom: 12px"
          type="primary"
          icon="plus"
          @click="$refs.permissionAdd.add()"
        >新增权限</a-button>
        <a-table
          ref="table"
          rowKey="id"
          :pagination="false"
          :defaultExpandAllRows="true"
          :columns="columns"
          :dataSource="data"
          :loading="loading"
          showPagination="auto"
        >
          <span slot="permissionType" slot-scope="text, record">
            <a-tag :color="record.permissionType === permissionTypeEnum.MENU ? 'purple' : 'cyan'">
              {{ record.permissionType === permissionTypeEnum.MENU ? '菜单' : '按钮' }}
            </a-tag>
          </span>

          <span slot="icon" slot-scope="text, record">
            <div v-if="record.icon != '' && record.icon != undefined">
              <a-icon :type="record.icon" />
            </div>
          </span>

          <span slot="action" slot-scope="text, record">
            <a-button
              style="margin: 0"
              type="primary"
              size="small"
              @click="$refs.permissionEdit.edit(record)"
            >编辑</a-button>
            <a-divider type="vertical" />
            <a-popconfirm placement="right" title="确认删除？" @confirm="() => onDelete(record)">
              <a-button type="primary" size="small">删除</a-button>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
      <permission-add ref="permissionAdd" @ok="handleOk" />
      <permission-edit ref="permissionEdit" @ok="handleOk" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { permissionDelete, permissionList } from '@/api/permission'
import permissionAdd from './permissionAdd'
import permissionEdit from './permissionEdit'

export default {
  components: {
     permissionAdd,
     permissionEdit
  },
  data () {
    return {
      permissionTypeEnum: {
        MENU: 0,
        BUTTON: 1
      },
      data: [],
      loading: true,
      columns: [
        {
          title: '权限名称',
          dataIndex: 'permissionName',
          width: '15%'
        },
        {
          title: '权限类型',
          dataIndex: 'permissionType',
          scopedSlots: { customRender: 'permissionType' }
        },
        {
          title: '图标',
          dataIndex: 'icon',
          scopedSlots: { customRender: 'icon' }
        },
        {
          title: '组件',
          dataIndex: 'component',
          ellipsis: true
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          ellipsis: true
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '操作',
          width: '220px',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectedRowKeys: [],
      typeDict: []
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    notification (type, message, description, duration) {
      this.$notification[type]({
        message: message,
        description: description,
        duration: duration
      })
    },
    getPermissionList () {
      permissionList().then((res) => {
        console.log('permission:' + JSON.stringify(res))
        console.log('res.success:' + res.success)
        if (!res.success) {
          this.notification('error', '错误', '权限列表获取失败！', 3)
          return
        }
        this.notification('success', '提示', '权限列表获取成功！', 3)
        this.data = res.result
        this.loading = false
      })
    },
    onSelectChange (e) {},
    onDelete (record) {
      if (record.children) {
        this.notification('error', '错误', '不能删除有子权限的节点，请先删除子节点！', 3)
        return
      }
      permissionDelete(record).then((res) => {
        if (!res.success) {
          this.notification('error', '错误', '删除失败！', 3)
          return
        }
        this.notification('success', '提示', '删除成功！', 3)
        this.getPermissionList()
      })
    },
    handleOk () {
      this.getPermissionList()
    }
  }
}
</script>
