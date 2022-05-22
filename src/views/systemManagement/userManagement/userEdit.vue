<template>
  <a-modal
    title="编辑用户"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']" />
        </a-form-item>

        <a-row>

          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户状态">
              <a-switch
                checked-children="正常"
                un-checked-children="禁用"
                v-decorator="['status', { valuePropName: 'checked' }]" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row>

          <a-col :md="24" :sm="24">
            <a-form-item
              :labelCol="{sm: { span: 3 }}"
              :wrapperCol="{sm: { span: 20 }}"
              label="拥有角色"
              hasFeedback>
              <a-select
                mode="multiple"
                placeholder="请指定角色"
                :value="selectedRoles"
                style="width: 100%"
                @change="handleRoleSelectorChange"
              >
                <a-select-option v-for="role in roleFilteredOptions" :key="role.name" :value="role.name">
                  {{ role.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </a-spin>

  </a-modal>
</template>

<script>
import { roleList, userRoleList } from '@/api/role'
import { updateStatusAndRoles } from '@/api/user'

export default {
  components: {},
  data () {
    return {
      roleList: [],
      selectedRoles: [],
      permissionTypeSelect: 0,
      permissionTypeEnum: {
        MENU: 0,
        BUTTON: 1
      },
      userStatusEnum: {
        ENABLE: 0,
        DISABLE: 1
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visibleIcon: false,
      visible: false,
      confirmLoading: false,
      permissionTreeData: [],
      componentDisabled: false,
      componentRequired: true,
      routerRequired: true,
      permissionRequired: true,
      componentNameRequired: true,
      loading: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    roleFilteredOptions () {
      return this.roleList.filter(o => !this.selectedRoles.includes(o.name))
    }
  },
  methods: {
    edit (record) {
      // console.log('record: ' + JSON.stringify(record), !record.status)
      roleList().then(res => {
        this.roleList = res.result
      })
      userRoleList(record.id).then(res => {
        this.selectedRoles = res.result
      })
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          id: record.id,
          status: !record.status
        })
      })
    },
    handleRoleSelectorChange (selectedRoles) {
      // console.log(JSON.stringify(selectedRoles))
      this.selectedRoles = selectedRoles
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.status = values.status ? this.userStatusEnum.ENABLE : this.userStatusEnum.DISABLE
          updateStatusAndRoles({
            'id': values.id,
            'status': values.status,
            'roleIdList': this.selectedRoles.map(
              roleName => {
                for (const idx in this.roleList) {
                    if (this.roleList[idx].name === roleName) return this.roleList[idx].id
                }
              }
            )
          })
            .then((res) => {
              this.confirmLoading = false
              if (res.success) {
                this.$message.success('更新成功')
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('更新失败：' + res.message)
              }
            })
            .finally((res) => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.form.resetFields()
      this.selectedRoles = []
      this.confirmLoading = false
      this.visible = false
    }
  }
}
</script>

<style>
</style>
