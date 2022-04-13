<template>
  <div>
    <div>
      <a-card :loading="loading" :bordered="true">
        <div style="display: inline-block;margin: 0 20px;">
          <span>选择年份</span>
          <a-select v-model="searchForm.year" style="width: 120px">
            <a-select-option v-for="(a,index) in selectYears" :key="index" :value="a">
              {{a}}
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
          </a-select>
        </div>
        <div style="display: inline-block;margin: 0 20px;">
          <a-button style="margin-right: 10px;" type="primary" size="medium" icon="el-icon-search" @click="search">查询</a-button>
          <a-button style="margin-right: 10px;" size="medium" icon="el-icon-refresh-right" @click="countReset">重置</a-button>
        </div>
      </a-card>
      <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
        <div class="salesCard">
          <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
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
    </div>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" :title="$t('record.total.list')" :style="{ height: '100%' }">
            <a-card :loading="loading" :bordered="true">
              <div style="display: inline-block;margin: 0 10px;">
                <span>选择年份</span>
                <a-select v-model="searchForm2.year" style="width: 80px">
                  <a-select-option v-for="(a,index) in selectYears" :key="index" :value="a">
                    {{a}}
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
                </a-select>
              </div>
              <div style="display: inline-block;margin: 0 10px;">
                <a-button style="margin-right: 10px;" type="primary" size="medium" icon="el-icon-search" @click="search1">查询</a-button>
                <a-button style="margin-right: 10px;" size="medium" icon="el-icon-refresh-right" @click="reset">重置</a-button>
              </div>
            </a-card>
            <div class="ant-table-wrapper">
              <a-table
                size="small"
                :columns="userRecordColumns"
                :dataSource="userRecordData"
                :pagination="pagination"
              >
              </a-table>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" :title="$t('dashboard.analysis.the-proportion-of-sales')" :style="{ height: '100%' }">
            <div slot="extra" style="height: inherit;">
              <!-- style="bottom: 12px;display: inline-block;" -->
              <span class="dashboard-analysis-iconGroup">
                <a-dropdown :trigger="['click']" placement="bottomLeft">
                  <a-icon type="ellipsis" class="ant-dropdown-link" />
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">{{ $t('dashboard.analysis.dropdown-option-one') }}</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">{{ $t('dashboard.analysis.dropdown-option-two') }}</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
              <div class="analysis-salesTypeRadio">
                <a-radio-group defaultValue="a">
                  <a-radio-button value="a">{{ $t('dashboard.analysis.channel.all') }}</a-radio-button>
                  <a-radio-button value="b">{{ $t('dashboard.analysis.channel.online') }}</a-radio-button>
                  <a-radio-button value="c">{{ $t('dashboard.analysis.channel.stores') }}</a-radio-button>
                </a-radio-group>
              </div>

            </div>
            <h4>{{ $t('dashboard.analysis.sales') }}</h4>
            <div>
              <!-- style="width: calc(100% - 240px);" -->
              <div>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </div>

            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import {
  Bar,
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  MiniSmoothArea,
  NumberInfo,
  RankList,
  Trend
} from '@/components'
// eslint-disable-next-line no-unused-vars
import { saveAssessRecord, userPageRecord, pageRecord, recordCount, getYears } from '@/api/asscess'
import TagSelectOption from '@/components/TagSelect/TagSelectOption'
export default {
  components: {
    TagSelectOption,
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
      loading: true,
      rankList: [],
      userRecordData: [],
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
          key: 'resultLevel'
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

      //
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
    pageSizeChange (val, pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = val
      this.getUserRecordList()
    },
    pageChange (page, val) {
      this.pagination.current = page
      this.getUserRecordList()
    },
    search () {
      this.getRecordCount()
    },
    search1 () {
      this.getUserRecordList()
    },
    reset () {
      this.searchForm2.year = ''
      this.searchForm2.month = ''
      this.searchForm2.type = ''
      this.search1()
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
    getUserRecordList () {
      const data = {
        assessType: this.searchForm2.type,
        year: this.searchForm2.year,
        month: this.searchForm2.month,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      userPageRecord(data).then(res => {
        this.customerData = []
        if (res.success) {
          this.userRecordData = res.result.records
          this.total = res.result.total
          this.pagination.total = this.total
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
    this.getYears()
    this.getRecordCount()
    this.getUserRecordList()
  }
}
</script>
