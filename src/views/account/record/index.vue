<template>
  <div>
    <a-card :loading="loading" :bordered="false">
      <div style="display: inline-block;margin: 0 20px;">
        <span>选择年份</span>
        <a-select v-model="searchForm.year" style="width: 120px">
          <a-select-option v-for="(a,index) in selectYears" :key="index" :value="a">
            {{ a }}
          </a-select-option>
        </a-select>
      </div>
      <div style="display: inline-block;margin: 0 20px;">
        <span>选择类型</span>
        <a-select v-model="searchForm.type" style="width: 120px;">
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
      <div style="display: inline-block;margin: 0 20px;">
        <a-button style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="search">查询</a-button>
        <a-button style="margin-right: 10px;" icon="el-icon-refresh-right" @click="countReset">重置</a-button>
      </div>
    </a-card>
    <a-card :loading="loading" :bordered="false" :body-style="{padding: 0}">
      <div class="salesCard">
        <a-tabs default-active-key="1" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <a-tab-pane loading="true" :tab="$t('record.total.count')" key="1">
            <a-row>
              <a-col :xl="22" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData" :title="$t('')" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane :tab="$t('record.state.count')" key="2">
            <a-row>
              <a-col :xl="22" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData2" :title="$t('')" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <a-row :gutter="24" type="flex" :style="{ marginTop: '24px'}">
      <a-col :sm="24" :md="12" :xl="24" :style="{ marginBottom: '24px' }">
        <a-tabs default-active-key="1" style="background-color: white">
          <a-tab-pane key="1" tab="躯体化">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.躯体化[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.躯体化[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.躯体化[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.躯体化[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.躯体化> 0 ? (nearTerror.躯体化 > 1 ? (nearTerror.躯体化 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.躯体化 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.躯体化> 0 ? (nearExc.躯体化 > 1 ? (nearExc.躯体化 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.躯体化 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="2" tab="强迫症">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.强迫症[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.强迫症[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.强迫症[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.强迫症[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.强迫症> 0 ? (nearTerror.强迫症 > 1 ? (nearTerror.强迫症 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.强迫症 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearTerror.强迫症> 0 ? (nearTerror.强迫症 > 1 ? (nearTerror.强迫症 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.强迫症 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="3" tab="抑郁">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.抑郁[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.抑郁[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.抑郁[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.抑郁[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.抑郁> 0 ? (nearTerror.抑郁 > 1 ? (nearTerror.抑郁 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.抑郁 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.抑郁> 0 ? (nearExc.抑郁 > 1 ? (nearExc.抑郁 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.抑郁 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="4" tab="焦虑">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.焦虑[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.焦虑[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.焦虑[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.焦虑[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.焦虑> 0 ? (nearTerror.焦虑 > 1 ? (nearTerror.焦虑 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.焦虑 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.焦虑> 0 ? (nearExc.焦虑 > 1 ? (nearExc.焦虑 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.焦虑 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="5" tab="敌对">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.敌对[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.敌对[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.敌对[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.敌对[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.敌对> 0 ? (nearTerror.敌对 > 1 ? (nearTerror.敌对 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.敌对 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.敌对> 0 ? (nearExc.敌对 > 1 ? (nearExc.敌对 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.敌对 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="6" tab="恐怖">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.恐怖[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.恐怖[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.恐怖[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.恐怖[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.恐怖> 0 ? (nearTerror.恐怖 > 1 ? (nearTerror.恐怖 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.恐怖 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.恐怖> 0 ? (nearExc.恐怖 > 1 ? (nearExc.恐怖 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.恐怖 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="7" tab="偏执">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.偏执[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.偏执[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.偏执[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.偏执[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.偏执> 0 ? (nearTerror.偏执 > 1 ? (nearTerror.偏执 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.偏执 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.偏执> 0 ? (nearExc.偏执 > 1 ? (nearExc.偏执 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.偏执 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="8" tab="精神病性">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.精神病性[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.精神病性[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.精神病性[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.精神病性[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.精神病性> 0 ? (nearTerror.精神病性 > 1 ? (nearTerror.精神病性 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.精神病性 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.精神病性> 0 ? (nearExc.精神病性 > 1 ? (nearExc.精神病性 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.精神病性 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="9" tab="人际关系敏感">
            <a-descriptions :column="4" :bordered="true">
              <a-descriptions-item label="正常">{{ nearAssess.人际关系敏感[0] }}次</a-descriptions-item>
              <a-descriptions-item label="轻度">{{ nearAssess.人际关系敏感[1] }}次</a-descriptions-item>
              <a-descriptions-item label="中度">{{ nearAssess.人际关系敏感[2] }}次</a-descriptions-item>
              <a-descriptions-item label="重度">{{ nearAssess.人际关系敏感[3] }}次</a-descriptions-item>
            </a-descriptions>
            <br>
            <a-descriptions :column="2" :bordered="true">
              <a-descriptions-item label="最近最严重异常">{{ nearTerror.人际关系敏感> 0 ? (nearTerror.人际关系敏感 > 1 ? (nearTerror.人际关系敏感 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ terrorTime.人际关系敏感 }}</a-descriptions-item>
              <a-descriptions-item label="最近异常">{{ nearExc.人际关系敏感> 0 ? (nearExc.人际关系敏感 > 1 ? (nearExc.人际关系敏感 > 2 ? '重度' : '中度') : '轻度') : '正常' }}</a-descriptions-item>
              <a-descriptions-item label="测试时间">{{ nearExcTIme.人际关系敏感 }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
        </a-tabs>
      </a-col>

    </a-row>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" :title="$t('record.total.list')" :style="{ height: '100%' }">
            <a-card :loading="loading" :bordered="true">
              <div style="display: inline-block;margin: 0 10px;">
                <span>选择年份</span>
                <a-select v-model="searchForm2.year" style="width: 80px">
                  <a-select-option v-for="(a,index) in selectYears" :key="index" :value="a">
                    {{ a }}
                  </a-select-option>
                </a-select>
              </div>
              <div style="display: inline-block;margin: 0 10px;">
                <span>选择月份</span>
                <a-select v-model="searchForm2.month" style="width: 80px">
                  <a-select-option value="1">1月</a-select-option>
                  <a-select-option value="2">2月</a-select-option>
                  <a-select-option value="3">3月</a-select-option>
                  <a-select-option value="4">4月</a-select-option>
                  <a-select-option value="5">5月</a-select-option>
                  <a-select-option value="6">6月</a-select-option>
                  <a-select-option value="7">7月</a-select-option>
                  <a-select-option value="8">8月</a-select-option>
                  <a-select-option value="9">9月</a-select-option>
                  <a-select-option value="10">10月</a-select-option>
                  <a-select-option value="11">11月</a-select-option>
                  <a-select-option value="12">12月</a-select-option>
                </a-select>
              </div>
              <div style="display: inline-block;margin: 0 10px;">
                <span>选择类型</span>
                <a-select v-model="searchForm2.type" style="width: 100px">
                  <a-select-option value="全部">全部</a-select-option>
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
                <a-button style="margin-right: 10px;" type="primary" icon="el-icon-search" @click="search1(0)">查询</a-button>
                <a-button style="margin-right: 10px;" icon="el-icon-refresh-right" @click="reset">重置</a-button>
              </div>
            </a-card>
            <div class="ant-table-wrapper">
              <a-table
                rowKey="id"
                :dataSource="userRecordData"
                :pagination="pagination"
                :columns="userRecordColumns"
                :defaultExpandAllRows="true"
                :loading="loading"
              >
                <span slot="resultLevel" slot-scope="a, record">
                  <a-tag :color="record.resultLevel > 0 ? (record.resultLevel > 1 ? (record.resultLevel > 2 ? 'red' : 'yellow') : 'blue') : 'green'">
                    {{ record.resultLevel > 0 ? (record.resultLevel > 1 ? (record.resultLevel > 2 ? '重度' : '中度') : '轻度') : '正常' }}
                  </a-tag>
                </span>
              </a-table>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <div>
            <a-range-picker style="width: 70%" :value="dateData" @change="ondateChange" />
            <a-button style="width: 15%;" type="primary" @click="search2()">查询</a-button>
            <a-button style="width: 15%;" @click="reset2()">重置</a-button>
          </div>
          <a-card
            style="margin-bottom: 24px"
            v-if="refresh"
            :loading="loading"
            :bordered="false"
            :body-style="{ padding: 0 }"
            :title="$t('record.near.condition')"
          >
            <span style="margin-left: 5%">最近状态</span>
            <a-tooltip :title="$t('record.level.explain')" style="margin-left: 80%">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div style="min-height: 400px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData" />
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { Bar, ChartCard, Radar } from '@/components'
import { getAnalysis, getYears, recordCount, userPageRecord } from '@/api/assess'

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
    Bar,
    Radar,
    ChartCard
  },
  data () {
    return {
      dateData: [],
      startTime: '',
      endTime: '',
      allTypeDetails: '',
      nearAssessCount: 0,
      loading: true,
      refresh: false,
      radarLoading: true,
      rankList: [],
      userRecordData: [],
      radarData,
      nearAssess: {
        '躯体化': [0, 0, 0, 0],
        '焦虑': [0, 0, 0, 0],
        '强迫症': [0, 0, 0, 0],
        '抑郁': [0, 0, 0, 0],
        '敌对': [0, 0, 0, 0],
        '偏执': [0, 0, 0, 0],
        '恐怖': [0, 0, 0, 0],
        '精神病性': [0, 0, 0, 0],
        '人际关系敏感': [0, 0, 0, 0]
      },
      nearTerror: [],
      nearExc: [],
      terrorTime: [],
      nearExcTIme: [],
      total: 0,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: (total) => `共${total}条数据`,
        onShowSizeChange: this.pageSizeChange,
        onChange: this.pageChange

      },

      selectYears: [],

      recordCountData: [],
      recordStateCountData: [],
      userRecordColumns: [
        {
          title: '测试类型',
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
      ],

      searchForm: {
        year: '',
        type: ''
      },
      searchForm2: {
        year: '',
        type: '',
        month: ''
      },

      // 搜索用户数
      searchUserData: [],
      searchUserScale: [],
      searchData: [],

      barData: [],
      barData2: [],

      pieScale: [],
      pieData: [],
      sourceData: [],
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  methods: {
    resetNearAssess () {
      this.nearAssess = {
        '躯体化': [0, 0, 0, 0],
          '焦虑': [0, 0, 0, 0],
          '强迫症': [0, 0, 0, 0],
          '抑郁': [0, 0, 0, 0],
          '敌对': [0, 0, 0, 0],
          '偏执': [0, 0, 0, 0],
          '恐怖': [0, 0, 0, 0],
          '精神病性': [0, 0, 0, 0],
          '人际关系敏感': [0, 0, 0, 0]
      }
    },
    resetRadarData () {
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
    ondateChange (date, dateString) {
      this.dateData = date
      this.startTime = date[0]
      this.endTime = date[1]
    },
    search2 () {
      this.getAnalysis()
    },
    reset2 () {
      this.startTime = ''
      this.endTime = ''
      this.dateData = []
      this.getAnalysis()
    },
    callback () {

    },
    getAnalysis () {
      this.$nextTick(() => {
        const data = {
          startTime: this.startTime,
          endTime: this.endTime,
          userId: ''
        }
        getAnalysis(data).then(res => {
          if (res.success) {
            this.resetRadarData()
            this.resetNearAssess()
            const analysisData = res.result.analysisDetails
            if (res.result.allTypeDetails !== null) {
              this.nearAssess = res.result.allTypeDetails
            }
            if (res.result.nearExc === null || res.result.nearTerror === null) {
              this.nearExc = []
              this.nearTerror = []
            } else {
              this.nearExc = res.result.nearExc
              this.nearTerror = res.result.nearTerror
            }
            // this.terrorTime = res.result.terrorTime
            // this.nearExcTIme = res.result.nearExcTIme
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
      })
    },
    pageSizeChange (pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = 1
      this.getUserRecordList(1)
    },
    pageChange (page) {
      this.pagination.current = page
      this.getUserRecordList(page)
    },
    search () {
      this.getRecordCount()
    },
    search1 (val) {
      this.getUserRecordList(val)
    },
    reset () {
      this.searchForm2.year = ''
      this.searchForm2.month = ''
      this.searchForm2.type = ''
      this.search1(0)
    },
    countReset () {
      this.searchForm.year = ''
      this.searchForm.type = ''
      this.search()
    },
    getRecordList () {
      this.barData = []
      for (let i = 0; i < 12; i += 1) {
        this.barData.push({
          x: `${i + 1}月`,
          y: this.recordCountData[i]
        })
      }
      this.barData2 = []
      for (let i = 0; i < 12; i += 1) {
        this.barData2.push({
          x: `${i + 1}月`,
          y: this.recordStateCountData[i]
        })
      }
    },
    getRecordCount () {
      recordCount(this.searchForm).then(res => {
        if (res.success) {
          this.recordCountData = res.result[0]
          this.recordStateCountData = res.result[1]
          this.getRecordList()
        }
      })
    },
    getYears () {
      getYears().then(res => {
        if (res.success) {
          this.selectYears = res.result
        }
      })
    },
    getRadarData () {
      this.radarLoading = false
    },
    getUserRecordList (val) {
      const data = {
        assessType: this.searchForm2.type,
        year: this.searchForm2.year,
        month: this.searchForm2.month,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      if (val === 0) {
        this.pagination.current = 1
        data.page = 1
      } else {
        this.pagination.current = val
      }
      userPageRecord(data).then(res => {
        if (res.success) {
          this.userRecordData = res.result.records
          this.total = res.result.total
          this.pagination.total = res.result.total
        }
      })
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted () {
    this.getAnalysis()
    this.getYears()
    this.getRecordCount()
    this.getUserRecordList(0)
    this.getRadarData()
  }
}
</script>
