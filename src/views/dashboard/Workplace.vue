<template>
  <page-header-wrapper :title="'首页'">
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ user.username }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
          <!--          <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>-->
        </div>
      </div>
    </template>
    <!--    <div>-->
    <a-row :span="24">
      <a-col>
        <!--          <a-card-->
        <!--            class="project-list"-->
        <!--            :loading="false"-->
        <!--            style="margin-bottom: 24px;"-->
        <!--            :bordered="false"-->
        <!--            title="热门"-->
        <!--            :body-style="{ padding: 0 }"-->
        <!--          >-->
        <!--            <a slot="extra">心理知识区</a>-->
        <!--            <div>-->
        <!--            </div>-->
        <!--          </a-card>-->
        <!--          轮播-->
        <div>
          <!--            //轮播图片-->
          <a href="https://www.baidu.com" target="_blank">
            <img
              style="max-width: 100%;max-height: 100%"
              @mouseover="changeInterval(true)"
              @mouseleave="changeInterval(false)"
              v-for="(item) in imgArr"
              :key="item.id"
              :src="item.url"
              alt="暂无图片"
              v-show="item.id===currentIndex"
            >
          </a>
          <!--            //左侧按钮-->
          <div @click="clickIcon('up')" class="iconDiv icon-left">
            <a-icon type="left"></a-icon>
          </div>
          <!--            //右侧按钮-->
          <div @click="clickIcon('down')" class="iconDiv icon-right">
            <a-icon type="right"></a-icon>
          </div>
          <!--            //控制圆点-->
          <div class="banner-circle">
            <ul>
              <li
                @click="changeImg(item.id)"
                v-for="(item) in imgArr"
                :key="item.id"
                :class="item.id===currentIndex? 'active': '' "
              ></li>
            </ul>
          </div>
        </div>
        <!--          轮播-->
      </a-col>
    </a-row>
    <!--      动态-->
    <a-row :gutter="16" style="margin-top: 24px">
      <div>
        <a-col :span="12">
          <div>
            <a-card :loading="false" title="动态" :bordered="false">
              <a-list
                :data-source="data"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta>
                    <a-avatar
                      slot="avatar"
                      :src="item.avatar"
                    />
                    <!--                    <a-avatar slot="avatar" size="small" :src="item.avatar" />-->
                    <a slot="title">
                      <span style="color: #1890ff">&nbsp;&nbsp;&nbsp;{{ getUsername(item.username) }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      在&nbsp;<a href="#">{{ item.createTime }}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>测试了</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span style="color: #1890ff">{{ item.assessType }}</span>&nbsp;
                      <!--                      <a href="#">{{ item.project.event }}</a>-->
                      <span>...</span>
                    </a>
                    <div slot="description">{{ item.time }}</div>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-card>
          </div>
        </a-col>
      </div>
      <div>
        <a-col :span="12">
          <a-card :loading="false" title="公告" :bordered="false">
            <a-list :data-source="noticeData" :pagination="pagination">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <a slot="title" @click="watchNotice(item)">
                    <span style="text-decoration: underline">
                      <a-tooltip>
                        <template #title>{{ item.noticeTitle }}</template>
                        {{ item.noticeTitle | ellipsis }}
                      </a-tooltip>
                    </span>
                  </a>
                </a-list-item-meta>
                <span style="white-space: nowrap">
                  {{ item.createTime }}
                </span>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-modal v-model="modalVisible" :title="noticeTitle" @ok="handleOk">
          <p>{{ noticeContent }}</p>
        </a-modal>
      </div>
    </a-row>
    <!--      </div>-->
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'
import { getUser } from '@/api/user'
import { commentList } from '@/api/comment'
import { getUserHistoryList } from '@/api/assess'
import { pageList } from '@/api/notice'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar
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
      modalVisible: false,
      noticeTitle: '',
      noticeData: '',
      noticeContent: '',
      currentIndex: 0, // 当前所在图片下标
      timer: null, // 定时轮询
      total: 0,
      imgArr: [
        {
          id: 0,
          url: 'https://picsum.photos/seed/0x/1920/1080'
        },
        {
          id: 1,
          url: 'https://picsum.photos/seed/11/1920/1080'
        },
        {
          id: 2,
          url: 'https://picsum.photos/seed/2/1920/1080'
        },
        {
          id: 3,
          url: 'https://picsum.photos/seed/3/1920/1080'
        }
      ],
      pagination: {
        current: 1,
        pageSize: 12,
        total: 0,
        showTotal: (total) => `共${total}条数据`,
        onShowSizeChange: this.pageSizeChange,
        onChange: this.pageChange

      },
      // 评论处理部分
      commentShow: false,
      plheight: '0px',
      data: [],
      childrenList: [],
      // 评论处理部分
      value: '',
      comments: [],
      children: '',
      submitting: false,
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    currentUser () {
      return {
        name: 'Serati Ma',
        avatar: this.avatar
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    this.getNotice()
    this.getCommentList()
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
    this.getUser()
    this.getUserHistoryList()
    this.startInterval()
  },
  methods: {
    pageSizeChange (pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = 1
      this.getNotice()
    },
    pageChange (page) {
      this.pagination.current = page
      this.getNotice()
    },
    handleOk () {
      this.modalVisible = false
      this.noticeTitle = ''
      this.noticeContent = ''
    },
    watchNotice (notice) {
      this.modalVisible = true
      this.noticeTitle = notice.noticeTitle
      this.noticeContent = notice.noticeContent
    },
    getNotice () {
      const data = {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      pageList(data).then(res => {
        if (res.success) {
          // alert(JSON.stringify(res))
          this.noticeData = res.result.records
          this.total = res.result.total
          this.pagination.total = res.result.total
        }
      })
    },
    getUsername (username) {
      return username.substring(0, 1) + '**'
    },
    // 获取子评论
    // childrenList () {
    //   const id =
    //   childrenList(id).then(res => {
    //     if (res.success){
    //
    //     }
    //   })
    // },
    // 开启定时器
    startInterval () {
      // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > this.imgArr.length - 1) {
          this.currentIndex = 0
        }
      }, 3000)
    },
    // 点击左右箭头
    clickIcon (val) {
      if (val === 'down') {
        this.currentIndex++
        if (this.currentIndex === this.imgArr.length) {
          this.currentIndex = 0
        }
      } else {
        /* 第一种写法
        this.currentIndex--;
        if(this.currentIndex < 0){
          this.currentIndex = this.imgArr.length-1;
        } */
        // 第二种写法
        if (this.currentIndex === 0) {
          this.currentIndex = this.imgArr.length
        }
        this.currentIndex--
      }
    },
    // 点击控制圆点
    changeImg (index) {
      this.currentIndex = index
    },
    // 鼠标移入移出控制
    changeInterval (val) {
      if (val) {
        clearInterval(this.timer)
      } else {
        this.startInterval()
      }
    },
    getUserHistoryList () {
      const data = {
        pageSize: 10
      }
      getUserHistoryList(data).then(res => {
        if (res.success) {
          this.data = res.result.records
          // alert(this.data.createTime)
        }
      })
    },
    getCommentList () {
      commentList().then(res => {
        if (res.success) {
          this.comments = res.result
          this.children = new Array(this.comments.length)
        }
      })
    },
    addComment () {
      alert(7)
    },
    getUser () {
      getUser().then(res => {
        if (res.success) {
          this.username = res.result.username
          this.userId = res.result.id
        }
      })
    },
    handlePrev () {
      // 通过上边指定的ref 来操作
      this.$refs.img.prev()
    },
    handleNext () {
      this.$refs.img.next()
    },
    getProjects () {
      this.$http.get('/list/search/projects').then(res => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity () {
      this.$http.get('/workplace/activity').then(res => {
        this.activities = res.result
      })
    },
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
      })
    },
    initRadar () {
      this.radarLoading = true

      this.$http.get('/workplace/radar').then(res => {
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['个人', '团队', '部门'],
          key: 'user',
          value: 'score'
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import './Workplace.less';

//评论

//评论
//轮播
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

//轮播
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}

.modal_box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.ant-carousel {
  width: 75%;
}

* {
  padding: 0;
  margin: 0;
}

/* 清除li前面的圆点 */
li {
  list-style-type: none;
}

.showImg {
  position: relative;
  width: 40%;
  height: 250px;
  margin: 100px auto;
  overflow: hidden;
}

/* 轮播图片 */
.showImg img {
  width: 100%;
  height: 100%;
}

/* 箭头图标 */
.iconDiv {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 15px;
  background-color: rgba(125, 125, 125, .2);
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
}

.iconDiv:hover {
  background-color: white;
}

.icon-left {
  left: 10px;
}

.icon-right {
  right: 10px;
}

/* 控制圆点 */
.banner-circle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
}

.banner-circle ul {
  margin: 0 50px;
  height: 100%;
  text-align: right;
}

.banner-circle ul li {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px;
  border-radius: 7px;
  background-color: rgba(125, 125, 125, .8);
  cursor: pointer;
}

.active {
  background-color: black !important;
}
</style>
