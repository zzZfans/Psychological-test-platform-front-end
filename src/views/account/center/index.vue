<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar">
            </div>
            <div class="username">{{ nickname }}</div>
            <div class="username">{{ this.userEmail }}</div>
            <div class="username">{{ this.Phone }}</div>
            <div class="username">{{ this.dateOfBirth }}</div>
            <div class="bio">海纳百川，有容乃大</div>
          </div>
          <a-divider/>
<!--          <a-divider :dashed="true"/>-->
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <a-timeline
            mode="alternate"
            v-for="(item,index) in userHistory"
            :key="index"
          >
            <a-timeline-item>
              <p>{{ item.assessType }}{{ item.resultLevel === 3 ? '重度' : (item.resultLevel === 2 ? '中度' : (item.resultLevel === 1 ? '轻度' : '正常')) }}</p>
              <p>{{ item.createTime }}</p>
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { AppPage, ArticlePage, ProjectPage } from './page'

import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'
import { Timeline } from 'ant-design-vue'
import { getUserHistoryList } from '@/api/assess'

export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage,
    [Timeline.Item.name]: Timeline.Item
  },
  data () {
    return {
      userId: '',
      assessType: '',
      resultLevel: '',
      createTime: '',
      userHistory: '',
      pagination: {
        current: 1,
        pageSize: 3000
      },
      userNickname: '',
      userEmail: '',
      Phone: 0,
      dateOfBirth: '',
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],

      tagInputVisible: false,
      tagInputValue: '',

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: 'article',
          tab: '我的测试'
        }
      ],
      noTitleKey: 'app'
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    this.getTeams()
    this.getUser()
  },
  methods: {
    getUserHistoryList () {
      const data = {
        userId: this.userId,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      getUserHistoryList(data).then(res => {
        // alert(JSON.stringify(res))
        if (res.success) {
          this.userHistory = res.result.records
        }
      })
    },
    getUser () {
      getUser().then(res => {
        if (res.success) {
          this.userNickname = res.result.username
          this.userEmail = res.result.emailAddress
          this.Phone = res.result.phoneNumber
          this.dateOfBirth = res.result.dateOfBirth
          this.userId = res.result.id
          this.getUserHistoryList()
        }
      })
    },
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },

    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
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
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
