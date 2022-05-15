<template>
  <div>
    <page-header-wrapper>
      <a-spin
        :tip="spin_tips"
        size="large"
        :spinning="spin_spinning">
<!--        <a-alert message="这是一个message" description="这是一个description"></a-alert>-->
        <div class="spin-content">
          <!--测量内容-->
          <a-card>
            <!--1.进度条-->
            <a-row type="flex" justify="center">
              <a-col :span="20">
                <a-progress
                  style="font-size: 16px;font-weight: 600;"
                  :strokeWidth="12"
                  :percent="completePercent"/>
              </a-col>
            <!--      :percent="Math.round((crtSubject-1)/subjects.length*100)"/>        -->
            </a-row>
            <!-- 2.内容-->
            <!--2.1问题-->
            <a-row type="flex" justify="start" align="middle" :gutter="24">
              <span id="subject">{{crtSubIdx + 1}}:{{ subjects[crtSubIdx].subject }}</span>
            </a-row>
            <br>
            <br>
            <!--2.2回答-->
            <a-row type="flex" justify="start" align="middle" :gutter="24">
              <span>我的回答:</span><br/>
            </a-row>
            <br/>
            <a-row type="flex" justify="start" align="middle" :gutter="24">
              <a-textarea v-model="answers[crtSubIdx]" showCount :max-length="100" :auto-size="{minRows:4,maxRows:6}">
              </a-textarea>
            </a-row>
            <br/><br/>
            <!--3.上/下题-->
            <a-row type="flex">
              <a-col :span="5">
                <div style="float: right">
                  <a-button v-if="isShowPreBtn" type="primary" @click="doPreSubject">
                    <a-icon type="left" />上一题
                  </a-button>
                </div>
              </a-col>
              <a-col :span="5" :offset="14">
                <a-button v-if="isShowNextBtn" type="primary" @click="doNextSubject">
                  下一题<a-icon type="right" />
                </a-button>
                <a-button v-else type="primary" @click="doSubmitSubjects">
                  提交<a-icon type="check" />
                </a-button>
<!--                <a-button type="primary" @click="handleShowInfo" v-show="false">Display normal message</a-button>-->
              </a-col>
            </a-row>
          </a-card>
        </div>
      </a-spin>
      <declaration ref="DA">
        <template slot="content">
          <p>一个简单的小评测。</p>
          <p>需要您授予<strong>摄像头权限</strong>。</p>
          <p>需要您授予录音权限。</p>
          <p>点击已知悉即代表同意以上要求。</p>
          <p>最终解释权归本小组所有。</p>
        </template>
      </declaration>
<!--      <assess-result-modal ref="ARM">-->
<!--        <template slot="content">-->
<!--          <div>{{ 1 }}</div>-->
<!--          <div>{{ 2 }}</div>-->
<!--        </template>-->
<!--      </assess-result-modal>-->
    </page-header-wrapper>
  </div>
</template>
<script>
import Declaration from '@/components/Declaration'
import AssessResultModal from '@/components/assessResultModal'
import { getTextSubjects, textAnalysis } from '@/api/text-test-api'
import { message } from 'ant-design-vue'

export default {
  name: 'textQAEval',
  components: {
    Declaration,
    AssessResultModal
  },
  data () {
    return {
      // spin
      spin_spinning: true,
      spin_tips: '文本测试题加载中...',
      name: '',
      // ajax拿到的题目
      subjects: [''],
      // 当前题目索引
      crtSubIdx: 0,
      // 每道题的回答
      answers: [],
      location: 0,
      // 题目分析结果
      analysisIdx: 0,
      answersAnalysisResult: [],
      finishedNum: 0
    }
  },
  watch: {
    finishedNum: function (newNum, oldNum) {
      // console.log('当前完成的题目' + newNum)
      if (newNum === this.subjects.length) {
        this.spin_spinning = false
        alert(this.answersAnalysisResult)
      }
    }
  },
  computed: {
    // 计算进度条完成度
    completePercent: function () {
      // console.log('当前题目是否完成：' + this.isCurrentAnswer())
      // console.log(((this.crtSubIdx + 1) / this.subjects.length) * 100)
      let percent = 0
      if (this.isCurrentAnswer()) {
        percent = ((this.crtSubIdx + 1) / this.subjects.length) * 100
      } else {
        percent = (this.crtSubIdx / this.subjects.length) * 100
      }
      return Math.round(percent)
    },
    // 是否显示上一题按钮
    isShowPreBtn () {
      // console.log(this.crtSubIdx)
      // console.log(this.answers.length)
      if (this.crtSubIdx === 0 || this.crtSubIdx !== this.location) {
        return false
      }
      return true
    },
    // 是否显示下一题按钮
    isShowNextBtn () {
      return (this.crtSubIdx + 1) !== this.subjects.length
    }
  },
  methods: {
    isLoading () {
      console.log('isLoading')
    },
    // 当前题目是否回答
    isCurrentAnswer () {
      const reg = /^\s+$/g
      if (this.answers[this.crtSubIdx] === undefined || this.answers[this.crtSubIdx] === '' || reg.test(this.answers[this.crtSubIdx])) {
        return false
      }
      return true
    },
    // 上一题
    doPreSubject () {
      if (this.crtSubIdx > 0) {
        this.crtSubIdx = this.crtSubIdx - 1
      }
    },
    // 下一题
    doNextSubject () {
      if (!this.isCurrentAnswer()) {
        message.warning('请作答，空输入无效')
        return
      }
      const crtAnswerLength = this.answers[this.crtSubIdx].length
      if (crtAnswerLength < 10 || crtAnswerLength > 100) {
        message.info('请作答，输入10~100字之间')
        return
      }
      if (this.crtSubIdx < this.subjects.length) {
        this.crtSubIdx = this.crtSubIdx + 1
        if (this.crtSubIdx > this.location) {
          this.location++
        }
      }
      // console.log('==========')
      // console.log(this.location >= 2)
      // console.log(this.answersAnalysisResult[this.analysisIdx] === undefined)
      // console.log(this.answersAnalysisResult[this.analysisIdx])
      // 用户已经测试到 2题（0题是第一题），开始发送第一题的请求
      if (this.location >= 2 && this.answersAnalysisResult[this.analysisIdx] === undefined && ((this.location - 2) === this.analysisIdx)) {
        const data = { 'text': this.answers[this.analysisIdx] }
        const resultIdx = this.analysisIdx
        this.analysisIdx++
        textAnalysis(data)
        .then(res => {
          if (res.success) {
            this.answersAnalysisResult[resultIdx] = res.result
            this.finishedNum++
          }
          // this.answersAnalysisResult[this.analysisIdx] = res.result
        })
      }
    },
    // 提交
    doSubmitSubjects () {
      if (!this.isCurrentAnswer()) {
        message.warning('请作答，空输入无效')
        return
      }
      this.spin_tips = '解析中...'
      this.spin_spinning = true
      // 分析最后两题
      const last2Data = { 'text': this.answers[this.answers.length - 2] }
      const last2Idx = this.answers.length - 2
      this.analysisIdx = last2Idx
      textAnalysis(last2Data)
      .then(res => {
        if (res.success) {
          this.answersAnalysisResult[last2Idx] = res.result
          this.finishedNum++
        }
      })
      .catch(error => {
        console.log(error)
      })
      const last1Idx = this.answers.length - 1
      const last1Data = { 'text': this.answers[this.answers.length - 1] }
      this.analysisIdx = last1Idx
      textAnalysis(last1Data)
      .then(res => {
        if (res.success) {
          this.answersAnalysisResult[last1Idx] = res.result
          this.finishedNum++
        }
      })
    }
  },
  // 钩子
  beforeCreate () {
    console.log('beforeCreate')
    // this -> 当前组件
    // 并没有methods中的方法
    // console.log(this)
  },
  created () {
    console.log('created')
    // this -> 当前组件
    // 当前组件创建完毕，可以使用当前组件的 Methods 和 data
    // console.log(this)
    // this.isLoading()
    // console.log(this.name)
    getTextSubjects().then(res => {
      // console.log(res)
      if (res.success === false) {
        alert(res.result.message)
      }
      this.subjects = res.result.subjects
      this.spin_spinning = false
      // console.log('拿到了响应，就是还想加载一下')
    })
    .catch(err => {
      console.log(err)
    })
  },
  beforeMount () {
    // console.log('beforeMount')
  },
  mounted () {
    // console.log('mounted')
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
  },
  updated () {
    // console.log('updated')
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
  },
  destroyed () {
    // console.log('destroyed')
  }
}
</script>
<style scoped>
span#subject {
  margin:0px;
  padding:0px;
  font-family:"微软雅黑","黑体","宋体";
  font-size:24px;
  color: darkblue;
}
span {
  display: block;
  margin:0px;
  padding:0px;
  font-family:"微软雅黑","黑体","宋体";
  font-size:24px;
  color: #b8b8cb;
}
</style>
