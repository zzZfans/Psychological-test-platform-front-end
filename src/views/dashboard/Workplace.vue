<template>
  <page-header-wrapper :title="'首页'">
    <template v- v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
        </div>
      </div>
    </template>

    <div>
      <a-row :span="24" >
        <a-col >
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="热门"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">心理知识区</a>
            <div>
            </div>
          </a-card>
<!--          轮播-->
          <template>
            <div class="modal_box" style="width: 100%;height: 500px;background-color: #99a9bf">
              <a-icon type="left" style="font-size: 50px" @click="handlePrev" />
              <a-carousel autoplay ref="img" >
                <a href="https://www.baidu.com"  target="_blank">
                  <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png">
                </a>
              </a-carousel>
              <a-icon
                type="right"
                style="font-size: 50px;float: right"
                @click="handleNext"
              />
            </div>
          </template>
<!--          轮播-->
        </a-col>
      </a-row>
      <a-row >
        <a-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
          <div :span="12">
            <a-card :loading="loading" title="动态" :bordered="false">
              <a-list>
                <a-list-item :key="index" v-for="(item, index) in activities">
                  <a-list-item-meta>
                    <a-avatar slot="avatar" size="small" :src="avatar" />
                    <div slot="title">
                      <span>{{ item.user.nickname }}</span>&nbsp; 在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                      <span>{{ item.project.action }}</span>&nbsp;
                      <a href="#">{{ item.project.event }}</a>
                    </div>
                    <div slot="description">{{ item.time }}</div>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-card>
          </div>
          <div :span="12">
          </div>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="14"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card
            title="体验交谈区"
            style="margin-bottom: 24px"
            :loading="false"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div style="position: relative;top: 10px">
              <a-row>
                <a-col span="3">
                  <a-avatar size="large" :src="currentUser.avatar" />
                </a-col>
                <a-col span="18">
                  <a-input style="position: relative;height: 40px;float: left;width: 230px" placeholder="输入评论"></a-input>
                </a-col>
                <!--                <a-col span="3">-->
                <!--                  <a-icon><plus-circle-outlined /></a-icon>-->
                <!--                </a-col>-->
                <a-col span="3">
                  <a-button style="position: relative;height: 40px;float: right" type="primary">发送</a-button>
                </a-col>
              </a-row>
              <div>
                <a-list
                  v-if="comments.length"
                  :data-source="comments"
                  item-layout="horizontal"
                >
                  <div v-for="(item) in comments" :key="item.id">
                    <a-list-item slot="renderItem"  :key="item.id">
                      <a-comment>
                        <div style="font-size: small">
                          <a-avatar
                            :src="item.avatar"
                          />
                          &nbsp
                          <a>{{ item.userName }}</a>
                          <a-tooltip>
                            <span> 发表于 {{ item.createTime }}</span>
                          </a-tooltip>
                        </div>
                        <p style="margin-left: 50px">
                          {{ item.content }}
                        </p>
                        <a-tooltip>
                          <a-tooltip>
                            <template slot="title">
                              评论
                            </template>
                            <a-icon
                              style="position: relative;margin-left: 8%;color: #1976d2"
                              type="edit"
                              @click="addComment(item)"
                            >
                            </a-icon>
                          </a-tooltip>
                          <a v-if="true">
                            <a-icon
                              style="position: relative;margin-left: 10%"
                              type="delete"
                              color="#1976d2"
                              @click="deleteComment(item)"
                            >
                            </a-icon>
                          </a>
<!--                          <a-button @click="getChildren(index,item.id())">-->
<!--                            详情-->
<!--                          </a-button>-->
                        </a-tooltip>
                      </a-comment>
                    </a-list-item>
<!--                    <a-list-->
<!--                      v-if="item.count"-->
<!--                      style="margin-left: 70px"-->
<!--                      :data-source="children[index]"-->
<!--                      item-layout="horizontal"-->
<!--                    >-->
<!--                    </a-list>-->
                  </div>
                </a-list>
                <a-comment>
                  <a-avatar
                    slot="avatar"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="匿名用户"
                  >
                  </a-avatar>
                  <div slot="content">
                    <a-form-item>
                      <a-textarea :rows="4" :value="value" @change="handleCommentChange">
                      </a-textarea>
                    </a-form-item>
                    <a-form-item>
                      <a-button html-type="submit" :loading="submitting" type="primary" @click="handleCommentSubmit">
                        发表评论
                      </a-button>
                    </a-form-item>
                  </div>
                </a-comment>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import { getUser } from '@/api/user'
import { commentList, childrenList } from '@/api/comment'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
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

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted () {
    this.getCommentList()
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
    this.getUser()
  },
  methods: {
    getChildren (index, id) {
      childrenList(id).then(res => {
        if (res.success) {
          this.children[index] = res.result
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

<style lang="less" scoped>
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
</style>
