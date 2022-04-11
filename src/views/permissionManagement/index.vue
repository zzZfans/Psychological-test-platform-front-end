<template>
  <page-header-wrapper>
    <a-card :bordered="true">
      <div class="table-operator">
        <a-button
          style="margin-bottom: 12px"
          type="primary"
          icon="plus"
          @click="$refs.permissionAdd.add()"
        >新增菜单</a-button
        >
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
            <a-tag :color="record.permissionType == 1 ? 'purple' : 'cyan'">
              {{ record.permissionType == 1 ? '菜单' : '按钮' }}
            </a-tag>
          </span>

          <span slot="icon" slot-scope="text, record">
            <div v-if="record.icon != '' && record.icon != undefined">
              <a-icon :type="record.icon" />
            </div>
          </span>

          <span slot="action" slot-scope="text, record">
            <a-button
              type="primary"
              size="small"
              @click="$refs.permissionEdit.edit(record)"
            >编辑</a-button
            >
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
      data: [],
      loading: true,
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'permissionName',
          width: '15%'
        },
        {
          title: '菜单类型',
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
          title: '路由地址',
          dataIndex: 'path',
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
          align: 'right',
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
    getPermissionList () {
      permissionList().then((res) => {
        console.log('permission:' + JSON.stringify(res))
        console.log('res.success:' + res.success)
        if (!res.success) {
          this.$message.error('菜单获取失败')
          return
        }
        this.$message.success('获取成功')
        this.data = res.result
        this.loading = false
      })
    },
    onSelectChange (e) {},
    onDelete (record) {
      if (record.children) {
        this.$message.error('不能删除有子菜单的节点，请先删除子节点')
        return
      }
      permissionDelete(record).then((res) => {
        if (!res.success) {
          this.$message.error('删除失败')
          return
        }
        this.$message.error('删除成功')
        this.getPermissionList()
      })
    },
    handleOk () {
      this.getPermissionList()
    }
  }
}
</script>
