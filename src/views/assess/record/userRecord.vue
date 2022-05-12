<template>
  <page-header-wrapper>
    <a-card>
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        </a-col>
      </a-row>
      <div style="display: inline-block;margin: 0 10px;">
        <span>选择类型</span>
        <a-select v-model="searchForm.sex" style="width: 100px">
          <a-select-option value="1">男</a-select-option>
          <a-select-option value="2">女</a-select-option>
        </a-select>
      </div>
      <div style="display: inline-block;margin: 0 10px;">
        <span>用户名称:</span>
        <a-input v-model="searchForm.username" placeholder="请输入用户名" style="width: auto"></a-input>
      </div>
      <div style="display: inline-block;margin: 0 10px;">
        <a-button style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="search(0)">查询</a-button>
        <a-button style="margin-right: 10px;" icon="el-icon-refresh-right" @click="reset">重置</a-button>
      </div>
    </a-card>
    <a-card :loading="loading" :bordered="true">
      <div class="ant-table-wrapper">
        <a-table
          :dataSource="userRecordData"
          :pagination="pagination"
          :columns="userRecordColumns"
          :defaultExpandAllRows="true"
          :rowSelection="rowSelection"
          rowKey="userId"
        >
          <span slot="sex" slot-scope="a, record">
            <a-tag :color="record.sex === 1 ? 'blue' : 'pink'">{{ record.sex === 1 ? '男' : '女' }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="showDetail(record)">详情</a>
              <a-divider type="vertical" />
              <a @click="showHistory(record)">推送记录</a>
            </template>
          </span>
        </a-table>
      </div>
      <a-modal width="50%" v-model="modalVisible" title="心理建议" @ok="handleOk">
        <a-textarea :autosize="{ minRows: 1, maxRows: 1}" v-model="title" placeholder="请输入标题" allow-clear />
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
        <template #footer>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">推送</a-button>
        </template>
      </a-modal>
      <a-drawer title="测试详情" width="30%" :visible="visible" @close="onClose">
        <a-card
          style="margin-bottom: 0;height: 360px"
          v-if="refresh"
          :loading="loading"
          :bordered="false"
          :body-style="{ padding: 0 }"
        >
          <span style="margin-left: 5%">最近一个月状态</span>
          <a-button style="margin-left: 20%" @click="openModal">心理推送</a-button>
          <a-tooltip :title="$t('record.level.explain')" style="margin-left: 80%">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div style="min-height: 0;">
            <radar :data="radarData" />
          </div>
        </a-card>
        <a-card>
          <div style="display: inline-block;margin: 0 10px;">
            <span>选择类型</span>
            <a-select v-model="assessType" style="width: 110px">
              <a-select-option value="">全部</a-select-option>
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
          <div style="display: inline-block;margin: 0 0;">
            <a-button style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="search1(0)">查询</a-button>
            <a-button style="margin-right: 10px;" icon="el-icon-refresh-right" @click="reset1">重置</a-button>
          </div>
        </a-card>
        <a-table
          :dataSource="userHistory"
          :pagination="pagination1"
          :columns="userHistoryColumns"
          :defaultExpandAllRows="true"
          rowKey="key"
        >
          <span slot="resultLevel" slot-scope="a, record">
            <a-tag :color="record.resultLevel > 0 ? (record.resultLevel > 1 ? (record.resultLevel > 2 ? 'red' : 'yellow') : 'blue') : 'green'">
              {{ record.resultLevel > 0 ? (record.resultLevel > 1 ? (record.resultLevel > 2 ? '重度' : '中度') : '轻度') : '正常' }}
            </a-tag>
          </span>
        </a-table>
      </a-drawer>
      <a-drawer title="推送记录" width="20%" :visible="drawerVisible" @close="onDrawerClose">
        <a-timeline
          style="width: 90%; margin: auto"
          v-for="(item,index) in history"
          :key="index"
        >
          <a-timeline-item :color="item.status > 0 ? 'green' : 'red'">
            <p>{{ item.pusherName }}</p>
            <a-tooltip>
              <template #title>
                <div v-html="item.message"></div>
              </template>
              <p>{{ item.title | ellipsis }}</p>
            </a-tooltip>
            <p>{{ item.createTime }}</p>
          </a-timeline-item>
        </a-timeline>
      </a-drawer>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'
import { Radar } from '@/components'
import { getUserAnalysis, getUserAssessRecord, getUserHistoryList } from '@/api/assess'
import { getPushHistory, savePushRecord } from '@/api/pushRecord'
import { message, Timeline } from 'ant-design-vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const key = 'updatable'
const radarData = [
  {
    item: '焦虑',
    level: 0
  },
  {
    item: '躯体化',
    level: 0
  },
  {
    item: '强迫症',
    level: 0
  },
  {
    item: '抑郁',
    level: 0
  },
  {
    item: '敌对',
    level: 0
  },
  {
    item: '恐怖',
    level: 0
  },
  {
    item: '偏执',
    level: 0
  },
  {
    item: '精神病性',
    level: 0
  },
  {
    item: '人际关系敏感',
    level: 0
  }
]
export default {
  components: {
    Radar,
    [Timeline.Item.name]: Timeline.Item,
    Editor,
    Toolbar
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 10) + '...'
      }
      return value
    }
  },
  data () {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      title: '',
      proposal: '',
      refresh: false,
      radarData,
      assessType: '',
      userId: '',
      modalVisible: false,
      drawerVisible: false,
      visible: false,
      selectedRowKeys: [],
      selectedRows: [],
      history: [],
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
      pagination1: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: (total) => `共${total}条数据`,
        onShowSizeChange: this.pageSizeChange,
        onChange: this.pageChange
      },
      userRecordData: [],
      userHistory: [],
      userRecordColumns: [
        {
          title: '用户名称',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          scopedSlots: { customRender: 'sex' }
        },
        {
          title: '电话号码',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber'
        },
        {
          title: '最近测试时间',
          dataIndex: 'nearAssessTime',
          key: 'nearAssessTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      userHistoryColumns: [
        {
          title: '类型',
          dataIndex: 'assessType',
          key: 'assessType'
        },
        {
          title: '情况',
          dataIndex: 'resultLevel',
          key: 'resultLevel',
          scopedSlots: { customRender: 'resultLevel' }
        },
        {
          title: '测试时间',
          dataIndex: 'createTime',
          key: 'createTime'
        }
      ]
    }
  },
  methods: {
    initRar () {
      this.radarData = [
        {
          item: '焦虑',
          level: 0
        },
        {
          item: '躯体化',
          level: 0
        },
        {
          item: '强迫症',
          level: 0
        },
        {
          item: '抑郁',
          level: 0
        },
        {
          item: '敌对',
          level: 0
        },
        {
          item: '恐怖',
          level: 0
        },
        {
          item: '偏执',
          level: 0
        },
        {
          item: '精神病性',
          level: 0
        },
        {
          item: '人际关系敏感',
          level: 0
        }
        ]
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onDrawerClose () {
      this.userId = ''
      this.drawerVisible = false
    },
    savePushRecord (data) {
      message.loading({ content: 'Loading...', key })
      setTimeout(() => {
        savePushRecord(data).then(res => {
          if (res.success) {
            message.success({ content: '推送成功', key, duration: 2 })
            this.handleCancel()
          } else {
            message.error(res.message)
          }
        })
      }, 1000)
    },
    getPushHistory () {
      getPushHistory(this.userId).then(res => {
        if (res.success) {
          this.history = res.result
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
      this.savePushRecord(data)
    },
    openModal () {
      this.modalVisible = true
    },
    getUserAnalysis () {
      getUserAnalysis(this.userId).then(res => {
        if (res.success) {
          const analysisData = res.result
          this.nearAssess = res.result.allTypeDetails
          for (const key in analysisData) {
            for (let i = 0; i < this.radarData.length; i++) {
              if (this.radarData[i].item === key) {
                this.radarData[i].level = analysisData[key]
              }
            }
          }
        }
        this.$nextTick(() => {
          this.refresh = true
        })
      })
    },
    onClose () {
      this.visible = false
      this.assessType = ''
      this.userId = ''
      this.refresh = false
      this.initRar()
    },
    afterVisibleChange () {
      this.visible = false
    },
    pageSizeChange (pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = 1
      this.getUserHistoryList(1)
    },
    pageChange (page) {
      this.pagination.current = page
      this.getUserHistoryList(page)
    },
    showDetail (val) {
      this.visible = true
      this.userId = val.userId
      this.getUserAnalysis()
      this.getUserHistoryList(0)
    },
    showHistory (val) {
      this.drawerVisible = true
      this.userId = val.userId
      this.getPushHistory()
    },
    getUserHistoryList (val) {
      const data = {
        userId: this.userId,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        assessType: this.assessType
      }
      if (val === 0) {
        this.pagination1.current = 1
        data.page = 1
      } else {
        this.pagination1.current = val
      }
      getUserHistoryList(data).then(res => {
        if (res.success) {
          this.userHistory = res.result.records
          this.total = res.result.total
          this.pagination1.total = this.total
        }
      })
    },
    getUserAssessRecord (val) {
      const data = {
        sex: this.searchForm.sex,
        username: this.searchForm.username,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        assessType: this.assessType
      }
      if (val === 0) {
        this.pagination.current = 1
        data.page = 1
      } else {
        this.pagination.current = val
      }
      getUserAssessRecord(data).then(res => {
        if (res.success) {
          this.userRecordData = res.result.records
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
      this.getUserAssessRecord(val)
    },
    search1 (val) {
      this.getUserHistoryList(val)
    },
    reset () {
      this.searchForm.sex = ''
      this.searchForm.username = ''
      this.search(0)
    },
    reset1 () {
      this.assessType = ''
      this.search1(0)
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
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
    this.getUserAssessRecord(0)
  }
}
</script>
