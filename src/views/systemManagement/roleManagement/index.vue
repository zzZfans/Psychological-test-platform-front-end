<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-button
          style="margin-bottom: 12px"
          type="primary"
          icon="plus"
          @click="addRole"
        >添加角色</a-button>
      </div>
      <!-- 表格数据 -->
      <a-table
        :columns="columns"
        rowKey="id"
        :data-source="data"
        :pagination="false"
        @change="tableChange"
        :loading="loading"
        :defaultExpandAllRows="false"
      >
        <span slot="status" slot-scope="text, record">
          <a-tag :color="record.status == 0 ? 'green' : 'red'">
            {{ record.status == 0 ? '启用' : '禁用' }}
          </a-tag>
        </span>
        <span slot="createTime" slot-scope="text, record">
          {{ record.createTime }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record.id)" >删除</a>
        </span>
      </a-table>
      <!-- 抽屉-编辑权限 -->
      <a-drawer :title="title" :width="600" :visible="drawerVisible" @close="onClose" :maskClosable="true">
        <a-form ref="formLogin" :form="form" @submit="handleSubmit">
          <a-row>
            <a-col :span="24">
              <a-form-item label="角色名称">
                <a-input v-decorator="rules.roleName" placeholder="请输入角色名称" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="角色描述">
                <a-input v-decorator="rules.description" placeholder="请输入角色描述" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="状态">
                <a-radio-group v-decorator="rules.status">
                  <a-radio :value="0"> 启用 </a-radio>
                  <a-radio :value="1"> 禁用 </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="角色权限">
                <a-tree
                  v-model="checkedKeys"
                  checkable
                  checkStrictly
                  show-icon
                  multiple
                  defaultExpandAll
                  :tree-data="treeData"
                  @select="onSelect"
                  @check="onCheck"
                  :replace-fields="{
                    children: 'children',
                    key: 'id',
                    value: 'id',
                    title: 'permissionName',
                  }"
                >
                  <a-icon slot="icon" slot-scope="item" style="color: rgb(24, 144, 255)" :type="item.icon" />
                </a-tree>
              </a-form-item>
            </a-col>
          </a-row>
          <div
            :style="{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              zIndex: 1,
            }"
          >
            <a-button type="primary" htmlType="submit" :loading="loginState" :disabled="loginState"> 提交 </a-button>
          </div>
        </a-form>
      </a-drawer>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { roleDelete, roleListAndPermissionList, roleSaveOrUpdate } from '@/api/role'
import { permissionIdList } from '@/api/permission'
import { treeData } from '@/utils/util.js'

export default {
  name: 'Role',
  data () {
    return {
      columns: [
        { title: '角色名称', dataIndex: 'roleName' },
        { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' } },
        { title: '创建人', dataIndex: 'createBy' },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          width: '160px',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      loading: false,
      roleName: '',
      status: undefined,
      title: '',
      drawerVisible: false,
      roleID: '',
      form: this.$form.createForm(this),
      rules: {
        roleName: ['roleName', { rules: [{ required: true, message: '请输入角色名称' }] }],
        status: ['status', { initialValue: 0, rules: [{ required: true, message: '请选择状态' }] }],
        description: ['description', { rules: [{ required: true, message: '请输入角色描述' }] }]
      },
      loginState: false,
      treeData: [],
      checkedKeys: [],
      selectedKeys: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.getRoleList()
    })
  },
  methods: {
    tableChange (e) {
      this.getRoleList()
    },
    getRoleList () {
      this.permissionList = []
      this.loading = true
      roleListAndPermissionList().then((res) => {
        console.log('role():' + JSON.stringify(res))
        if (res.success) {
          this.data = res.result.roleList
          res.result.permissionList.forEach((v) => {
            v.key = v.id
            if (v.icon) v.scopedSlots = { icon: 'icon' }
          })
          this.treeData = treeData(res.result.permissionList, 'id', 'parentId', 'children')
          console.log('treeData:' + JSON.stringify(this.treeData))
          this.loading = false
        } else {
          this.notification('error', '错误', res.message, 1)
        }
      })
    },
    // 保存
    handleSubmit (e) {
      e.preventDefault()

      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = ['roleName', 'status', 'description']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const params = { ...values }
          params.id = this.roleID
          params.permissionIdList = this.checkedKeys.checked ? this.checkedKeys.checked : this.checkedKeys
          roleSaveOrUpdate(params)
            .then((res) => {
              if (res.success) {
                this.form.resetFields()
                this.roleID = ''
                this.checkedKeys = []
                this.drawerVisible = false
                this.notification('success', '提示', '操作成功！', 1)
                this.getRoleList()
              } else {
                this.notification('error', '错误', res.message, 1)
              }
            })
            .finally(() => {
              setTimeout(() => {
                this.loginState = false
              }, 600)
            })
        }
      })
    },
    addRole () {
      this.drawerVisible = true
      this.title = '添加角色规则'
    },
    onClose () {
      this.drawerVisible = false
      this.roleID = ''
      this.checkedKeys = []
      this.form.resetFields()
    },
    onEdit (record) {
      this.roleID = record.id
      this.drawerVisible = true
      this.title = '编辑角色规则:' + record.roleName
      console.log('record.id:' + JSON.stringify(record.id))
      permissionIdList(record.id).then((res) => {
        console.log('res:' + JSON.stringify(res))
        if (res.success) {
          this.checkedKeys = res.result
        } else {
          this.notification('error', '错误', res.message, 1)
        }
      })
      this.$nextTick(() => {
        this.form.setFieldsValue({
          roleName: record.roleName,
          status: record.status,
          description: record.description
        })
      })
    },
    // 删除
    onDelete (id) {
      this.$confirm({
        title: '确认操作',
        content: '您确认提交吗？',
        onOk: async () => {
          await roleDelete(id).then((res) => {
            if (res.success) {
              this.notification('success', '提示', '删除成功！', 1)
              this.getRoleList()
            } else {
              this.notification('error', '错误', res.message, 1)
            }
          })
        }
      })
    },
    onSelect (selectedKeys, info) {
      this.selectedKeys = selectedKeys
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
      console.log('checkedKeys', checkedKeys)
    }
  }
}
</script>

<style>
</style>
