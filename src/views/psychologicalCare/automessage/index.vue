<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
          <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          </a-col>
        </a-row>
        <div style="display: inline-block;margin: 0 10px;">
          <span>选择类型</span>
          <a-select v-model="selectType" style="width: 150px">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="all">通用</a-select-option>
            <a-select-option value="躯体化">躯体化</a-select-option>
            <a-select-option value="强迫症">强迫症</a-select-option>
            <a-select-option value="抑郁">抑郁</a-select-option>
            <a-select-option value="焦虑">焦虑</a-select-option>
            <a-select-option value="敌对">敌对</a-select-option>
            <a-select-option value="恐怖">恐怖</a-select-option>
            <a-select-option value="偏执">偏执</a-select-option>
            <a-select-option value="精神病性">精神病性</a-select-option>
            <a-select-option value="人际关系敏感">人际关系敏感</a-select-option>
          </a-select>
        </div>
        <div style="display: inline-block;margin: 0 10px;">
          <a-button style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="search(0)">查询</a-button>
          <a-button style="margin-right: 10px;" icon="el-icon-refresh-right" @click="reset">重置</a-button>
        </div>
      </div>
      <a-button
        style="float: left"
        type="primary"
        icon="plus"
        @click="addMsg"
      >添加消息</a-button>
    </a-card>
    <a-card :loading="loading" :bordered="true">
      <div class="ant-table-wrapper">
        <a-table
          :dataSource="autoMsgData"
          :pagination="pagination"
          :columns="autoMessageColumns"
          rowKey="id"
        >
          <span slot="type" slot-scope="record">
            {{ record === 'all' ? '通用' : record }}
          </span>
          <span slot="titles" slot-scope="text, record">
            <a-tooltip>
              <template #title>
                <div v-html="record.message"></div>
              </template>
              <p>{{ record.title }}</p>
            </a-tooltip>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="openDrawer(record)">修改</a>
              <a-divider type="vertical" />
              <a @click="deleteMsg(record.id)">删除</a>
            </template>
          </span>
        </a-table>
        <a-drawer :title="drawerTitle" :width="600" :visible="visible" @close="onClose" :maskClosable="true">
          <a-form :form="form">
            <a-col :span="24">
              <a-form-item label="类型">
                <a-select v-decorator="rules.type" style="width: 80%">
                  <a-select-option value="all">通用</a-select-option>
                  <a-select-option value="躯体化">躯体化</a-select-option>
                  <a-select-option value="强迫症">强迫症</a-select-option>
                  <a-select-option value="抑郁">抑郁</a-select-option>
                  <a-select-option value="焦虑">焦虑</a-select-option>
                  <a-select-option value="敌对">敌对</a-select-option>
                  <a-select-option value="恐怖">恐怖</a-select-option>
                  <a-select-option value="偏执">偏执</a-select-option>
                  <a-select-option value="精神病性">精神病性</a-select-option>
                  <a-select-option value="人际关系敏感">人际关系敏感</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="标题">
                <a-input v-decorator="rules.title" placeholder="请输入标题" />
              </a-form-item>
              <div style="border: 1px solid #ccc;">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  style="height: 300px; overflow-y: hidden;"
                  v-model="html"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="onCreated"
                />
              </div>
            </a-col>
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
              <a-button type="primary" htmlType="submit" @click="handleSubmit"> 提交 </a-button>
            </div>
          </a-form>
        </a-drawer>
      </div>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { message } from 'ant-design-vue'
import { msgPageList, saveAutoMsg, removeMsg, updateMsg } from '@/api/autoMessage'

export default {
  components: {
    Editor,
    Toolbar
  },
  data () {
    return {
      msgId: '',
      editor: null,
      html: '',
      type: null,
      selectType: '',
      drawerTitle: '',
      autoMsgData: '',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      title: null,
      checkedKeys: [],
      refresh: false,
      form: this.$form.createForm(this),
      rules: {
        type: ['type', { rules: [{ required: true, message: '请选择类型' }] }],
        title: ['title', { rules: [{ required: true, message: '请输入标题' }] }]
      },
      userId: '',
      modalVisible: false,
      drawerVisible: false,
      visible: false,
      searchForm: {
        sex: '',
        username: ''
      },
      loading: true,
      total: 0,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: (total) => `共${total}条数据`,
        onShowSizeChange: this.pageSizeChange,
        onChange: this.pageChange
      },
      autoMessageColumns: [
        {
          title: '消息类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '消息',
          dataIndex: 'title',
          scopedSlots: { customRender: 'titles' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    openDrawer (item) {
      this.msgId = item.id
      this.drawerTitle = '修改消息'
      this.html = item.message
      this.$nextTick(() => {
        this.form.setFieldsValue({
          title: item.title,
          type: item.type
        })
      })
      this.visible = true
    },
    updateMsg () {
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = ['type', 'title']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const data = {
            message: this.html,
            title: values.title,
            type: values.type,
            id: this.msgId
          }
          updateMsg(data).then(res => {
            if (res.success) {
              message.success('修改成功')
              this.onClose()
              this.getMsg(0)
            }
          })
        }
      })
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = ['type', 'title']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          if (this.drawerTitle === '添加消息') {
            this.saveAutoMsg()
          } else {
            this.updateMsg()
          }
        }
      })
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    saveAutoMsg () {
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = ['type', 'title']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const data = {
            message: this.html,
            title: values.title,
            type: values.type
          }
          saveAutoMsg(data).then(res => {
            if (res.success) {
              message.success('添加成功!')
              this.getMsg(0)
              this.visible = false
            } else {
              message.error(JSON.stringify(res.message))
            }
          })
        }
      })
    },
    addMsg () {
      this.visible = true
      this.drawerTitle = '添加消息'
    },
    deleteMsg (id) {
      this.$confirm({
        title: '确认操作',
        content: '您确认删除吗？',
        onOk: async () => {
          await removeMsg(id).then((res) => {
            if (res.success) {
              this.notification('success', '提示', '删除成功！', 1)
              this.getMsg(0)
            } else {
              this.notification('error', '错误', res.message, 1)
            }
          })
        }
      })
    },
    saveMsg (data) {
      saveAutoMsg(data).then(res => {
        if (res.success) {
          message.success({ content: '添加成功', duration: 2 })
          this.handleCancel()
        } else {
          message.error(res.result.data)
        }
      })
    },
    handleCancel () {
      this.proposal = ''
      this.modalVisible = false
      this.title = ''
      this.html = ''
    },
    handleOk () {
      const data = {
        message: this.html,
        title: this.title,
        receiverId: this.userId
      }
      this.saveMsg(data)
    },
    onClose () {
      this.visible = false
      this.msgId = ''
      this.form.resetFields()
      this.html = ''
    },
    afterVisibleChange () {
      this.visible = false
    },
    pageSizeChange (pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = 1
      this.getMsg(1)
    },
    pageChange (page) {
      this.pagination.current = page
      this.getMsg(page)
    },
    getMsg (val) {
      const data = {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        type: this.selectType
      }
      if (val === 0) {
        this.pagination.current = 1
        data.page = 1
      } else {
        this.pagination.current = val
      }
      msgPageList(data).then(res => {
        if (res.success) {
          this.autoMsgData = res.result.records
          this.total = res.result.total
          this.pagination.total = this.total
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    search (val) {
      this.getMsg(val)
    },
    reset () {
      this.selectType = ''
      this.getMsg(0)
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  mounted () {
    this.getMsg(0)
  }
}
</script>
