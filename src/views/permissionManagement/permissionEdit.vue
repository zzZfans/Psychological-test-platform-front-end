<template>
  <a-modal
    title="新增权限"
    :width="1000"
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
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限类型">
              <a-radio-group
                v-decorator="['permissionType', { rules: [{ required: true, message: '请选择权限类型！' }] }]"
              >
                <a-radio :value="permissionTypeEnum.MENU" @click="meneOpenTypeFunc(permissionTypeEnum.MENU)">菜单</a-radio>
                <a-radio :value="permissionTypeEnum.BUTTON" @click="meneOpenTypeFunc(permissionTypeEnum.BUTTON)">按钮</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row >

          <a-col :md="12" :sm="24">
            <a-form-item label="权限名" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input
                placeholder="请输入权限名"
                v-decorator="['permissionName', { rules: [{ required: true, min: 1, message: '请输入权限名！' }] }]"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="父级权限" has-feedback>
                <a-tree-select
                  v-decorator="['parentId', { rules: [{ required: true, message: '请选择父级权限！' }] }]"
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                  :treeData="permissionTreeData"
                  :replace-fields="{
                    children: 'children',
                    key: 'id',
                    value: 'id',
                    title: 'permissionName',
                  }"
                  placeholder="请选择父级权限"
                  treeDefaultExpandAll
                >
                  <span slot="title" slot-scope="{ id }">{{ id }} </span>
                </a-tree-select>
              </a-form-item>
            </div>
          </a-col>

        </a-row>

        <a-row >

          <a-col v-if="permissionTypeSelect" :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限标识" hasFeedback>
              <a-input
                placeholder="请输入权限标识"
                v-decorator="[
                  'permission',
                  { rules: [{ required: permissionRequired, message: '请输入权限标识！' }] },
                ]"
              />
            </a-form-item>
          </a-col>

          <a-col v-if="!permissionTypeSelect" :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                  <a-tooltip title="如需打开首页加载此目录下菜单，请填写加载菜单路由，设为首页后其他设置的主页将被替代。">
                    <a-icon type="question-circle-o" /> </a-tooltip
                  >&nbsp;重定向路径
                </span>
                <a-input prop="redirect" placeholder="请输入重定向地址" v-decorator="['redirect']" />
              </a-form-item>
            </div>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限状态">
              <a-switch checked-children="启用" un-checked-children="禁用" v-decorator="['status', { valuePropName: 'checked' }]" />
            </a-form-item>
          </a-col>

        </a-row>

        <a-row>

          <a-col :md="24" :sm="24">
            <a-form-item
              :labelCol="{sm: { span: 3 }}"
              :wrapperCol="{sm: { span: 20 }}"
              label="权限描述"
              hasFeedback>
              <a-input placeholder="请输入权限描述" v-decorator="['description']"></a-input>
            </a-form-item>
          </a-col>

        </a-row>

        <a-divider v-if="!permissionTypeSelect" />

        <a-row v-if="!permissionTypeSelect" >

          <a-col :md="12" :sm="24">
            <div>
              <a-form-item style="width: 100%" :labelCol="labelCol" :wrapperCol="wrapperCol" label="路由名" hasFeedback>
                <a-input
                  placeholder="请输入路由名"
                  v-decorator="[
                    'routerName',
                    { rules: [{ required: componentNameRequired, min: 1, message: '请输入路由名！' }] },
                  ]"
                />
              </a-form-item>
            </div>
          </a-col>

          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                <span slot="label">
                  <a-tooltip
                    title="前端 Vue 组件 views 文件夹下路径，例：systemMonitor/systemInfo。
                    注：目录级填写：RouteView（不带面包屑），PageView（带面包屑）。"
                  >
                    <a-icon type="question-circle-o" /> </a-tooltip
                  >&nbsp;前端组件
                </span>
                <a-input
                  placeholder="请输入前端组件"
                  :disabled="componentDisabled"
                  prop="component"
                  v-decorator="['component', { rules: [{ required: componentRequired, message: '请输入前端组件' }] }]"
                />
              </a-form-item>
            </div>
          </a-col>

        </a-row>

        <a-row v-if="!permissionTypeSelect" >

          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="图标">
                <a-input placeholder="请选择图标" disabled="disabled" v-decorator="['icon']">
                  <a-icon slot="addonAfter" @click="openIconSele()" type="setting" />
                </a-input>
              </a-form-item>
            </div>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
              <a-input-number style="width: 100%" v-decorator="['sort', { initialValue: 100 }]" :min="1" :max="1000" />
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </a-spin>
    <a-modal
      :width="850"
      :visible="visibleIcon"
      @cancel="handleCancelIcon"
      footer=""
      :mask="false"
      :closable="false"
      :destroyOnClose="true"
    >
      <icon-selector @change="handleIconChange" />
    </a-modal>
  </a-modal>
</template>

<script>
import IconSelector from '@/components/IconSelector'
import { permissionList, permissionUpdate } from '@/api/permission'

export default {
  components: { IconSelector },
  data () {
    return {
      permissionTypeEnum: {
        MENU: 0,
        BUTTON: 1
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
      currentSelectedIcon: 'pause-circle',
      loading: false,
      type: '',
      pid: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit (record) {
      this.gettTreeDate()
      this.visible = true
      this.meneOpenTypeFunc(record.permissionType)
      this.currentSelectedIcon = record.icon
      this.form.getFieldDecorator('permissionType', {
        valuePropName: 'checked',
        initialValue: record.permissionType.toString()
      })
      this.form.getFieldDecorator('icon', { initialValue: record.icon })
      setTimeout(() => {
        this.setMenuItem(record)
      }, 100)
    },
    setMenuItem (record) {
      this.form.setFieldsValue({
        id: record.id,
        permissionName: record.permissionName,
        componentName: record.componentName,
        redirect: record.redirect,
        component: record.component,
        permission: record.permission,
        path: record.path,
        sort: record.sort,
        descript: record.descript
      })
      this.form.getFieldDecorator('pid', { initialValue: record.pid })
      this.pid = record.pid
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          permissionUpdate(values)
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
    meneOpenTypeFunc (e) {
      if (e === 2) {
        this.routerRequired = false
        this.componentRequired = false
        this.permissionRequired = true
        this.componentNameRequired = false
      } else {
        this.routerRequired = true
        this.componentRequired = true
        this.permissionRequired = false
        this.componentNameRequired = true
      }
    },
    handleCancel () {
      this.form.resetFields()
      this.confirmLoading = false
      this.visible = false
    },
    handleCancelIcon () {
      this.visibleIcon = false
    },
    handleIconChange (icon) {
      this.form.getFieldDecorator('icon', { initialValue: icon })
      this.visibleIcon = false
    },
    openIconSele () {
      this.visibleIcon = true
    },
    gettTreeDate () {
      permissionList().then((res) => {
        if (!res.success) {
          this.$message.error('菜单获取失败')
          return
        }
        this.permissionTreeData = [
          {
            id: '0',
            parentId: '0',
            permissionName: '顶级',
            pid: '0',
            children: res.result
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>
