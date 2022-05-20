<template>
  <page-header-wrapper>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
          <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          </a-col>
        </a-row>
        <div style="display: inline-block;margin: 0 10px;">
          <span>公告标题:</span>
          <a-input v-model="searchForm.noticeTitle" placeholder="请输入公告标题" style="width: auto"></a-input>
        </div>
        <div style="display: inline-block;margin: 0 10px;">
          <a-button style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="search(0)">查询</a-button>
          <a-button style="margin-right: 10px;" icon="el-icon-refresh-right" @click="reset">重置</a-button>
        </div>
      </div>
      <a-button
        style="float: right"
        type="primary"
        icon="plus"
        @click="addNotice"
      >添加公告</a-button>
    </a-card>
    <a-card :loading="loading" :bordered="true">
      <div class="ant-table-wrapper">
        <a-table
          :dataSource="noticeData"
          :pagination="pagination"
          :columns="autoMessageColumns"
          rowKey="id"
        >
          <span slot="contents" slot-scope="text, record">
            <a-tooltip>
              <template #title>
                <p>{{ record.noticeContent }}</p>
              </template>
              <p>{{ record.noticeContent | ellipsis }}</p>
            </a-tooltip>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="openModal(record)">修改</a>
              <a-divider type="vertical" />
              <a @click="deleteNotice(record.id)">删除</a>
            </template>
          </span>
        </a-table>
        <a-modal :title="modalTitle" :width="800" :visible="visible" @ok="handleOk" @cancel="handleCancel">
          <a-form-item label="标题">
            <a-input v-model="form.noticeTitle" placeholder="请输入标题"></a-input>
          </a-form-item>
          <a-form-item label="内容">
            <a-textarea v-model="form.noticeContent" :rows="6" placeholder="请输入内容"></a-textarea>
          </a-form-item>
        </a-modal>
      </div>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { message } from 'ant-design-vue'
import { pageList, updateNotice, saveNotice, deleteNotice } from '@/api/notice'

export default {
  components: {
    Editor,
    Toolbar
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0, 20) + '...'
      }
      return value
    }
  },
  data () {
    return {
      noticeId: '',
      editor: null,
      html: '',
      type: null,
      selectType: '',
      modalTitle: '',
      noticeData: '',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      title: null,
      checkedKeys: [],
      refresh: false,
      form: {
        noticeTitle: '',
        noticeContent: ''
      },
      rules: {
        title: ['title', { rules: [{ required: true, message: '请输入标题' }] }],
        content: ['content', { rules: [{ required: true, message: '请输入内容' }] }]
      },
      userId: '',
      modalVisible: false,
      drawerVisible: false,
      visible: false,
      searchForm: {
        noticeTitle: ''
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
          title: '公告标题',
          dataIndex: 'noticeTitle',
          key: 'noticeTitle'
        },
        {
          title: '公告内容',
          dataIndex: 'noticeContent',
          scopedSlots: { customRender: 'contents' }
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
    openModal (item) {
      this.noticeId = item.id
      this.modalTitle = '修改公告'
      this.form.noticeContent = item.noticeContent
      this.form.noticeTitle = item.noticeTitle
      this.visible = true
    },
    updateNotice () {
      const data = {
        noticeTitle: this.form.noticeTitle,
        noticeContent: this.form.noticeContent,
        id: this.noticeId
      }
      updateNotice(data).then(res => {
        if (res.success) {
          message.success('修改成功')
          this.getNotice(0)
          this.handleCancel()
        }
      })
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    addNotice () {
      this.visible = true
      this.modalTitle = '添加公告'
    },
    deleteNotice (id) {
      this.$confirm({
        title: '确认操作',
        content: '您确认删除吗？',
        onOk: async () => {
          await deleteNotice(id).then((res) => {
            if (res.success) {
              this.notification('success', '提示', '删除成功！', 1)
              this.getNotice(0)
            } else {
              this.notification('error', '错误', res.message, 1)
            }
          })
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.form.noticeTitle = ''
      this.form.noticeContent = ''
    },
    saveNotice () {
      const data = {
        noticeTitle: this.form.noticeTitle,
        noticeContent: this.form.noticeContent
      }
      saveNotice(data).then(res => {
        if (res.success) {
          message.success('添加成功')
          this.handleCancel()
        }
      })
    },
    handleOk () {
      if (this.modalTitle === '添加公告') {
        this.saveNotice()
      } else {
        this.updateNotice()
      }
    },
    afterVisibleChange () {
      this.visible = false
    },
    pageSizeChange (pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = 1
      this.getNotice(1)
    },
    pageChange (page) {
      this.pagination.current = page
      this.getNotice(page)
    },
    getNotice (val) {
      const data = {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        title: this.searchForm.noticeTitle
      }
      if (val === 0) {
        this.pagination.current = 1
        data.page = 1
      } else {
        this.pagination.current = val
      }
      pageList(data).then(res => {
        if (res.success) {
          this.noticeData = res.result.records
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
      this.getNotice(val)
    },
    reset () {
      this.searchForm.noticeTitle = ''
      this.getNotice(0)
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
    this.getNotice(0)
  }
}
</script>
