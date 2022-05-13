<template>
  <page-header-wrapper>
    <a-spin
      :tip="spinTip"
      size="large"
      :spinning="isCameraLoading || isInSubmit">
      <div class="spin-content">
        <a-card >
          <!-- 进度条 -->
          <a-row type="flex" justify="center">
            <a-col :span="20">
              <a-progress
                style="font-size: 16px;font-weight: 600"
                :strokeWidth="12"
                :percent="Math.round((curQueNum-1)/questionNum*100)"/>
            </a-col>
          </a-row>
          <!-- 题目 监控 -->

          <a-row type="flex" justify="center">
            <a-col :span="18">
              <div style="height: 150px;vertical-align:middle;display:table-cell;font-size: 20px;font-weight: 600" >
                {{ curQueNum }}. {{ questions[curQueNum] }}
              </div>
            </a-col>
          </a-row>

          <!-- 录音 -->
          <a-row type="flex" justify="end" align="middle" :gutter="24">
            <a-col :span="12">
              <canvas id="canvas" style="float: right;"></canvas>
            </a-col>
            <a-col :span="6">
              <a-row type="flex" justify="start">
                <a-col :span="8">
                  <div style="display: flex">
                    <!-- 开始录音 -->
                    <a-icon
                      v-if="!isRecording"
                      type="audio"
                      theme="twoTone"
                      @click="startRecording"
                      :style="{ fontSize: '32px' }" />
                    <!-- 停止录音 -->
                    <a-icon
                      v-else
                      type="poweroff"
                      @click="stopRecording"
                      :style="{ fontSize: '32px',color: 'rgb(217, 48, 37)' }" />
                    <span v-if="recordObjs[curQueNum].duration > 0" style="font-size: 22px;font-weight: 600">
                      &nbsp;{{ recordObjs[curQueNum].duration }}s
                    </span>
                  </div>
                </a-col>
                <a-col :span="8">
                  <div style="display: flex">

                    <!-- 播放 -->
                    <a-icon
                      v-if="recordObjs[curQueNum].duration > 0 && !isRecordingPlaying"
                      type="sound"
                      theme="twoTone"
                      @click="audioPlayback"
                      :style="{ fontSize: '32px' }" />

                    <!-- 停止播放 -->
                    <a-icon
                      v-if="isRecordingPlaying"
                      type="poweroff"
                      @click="audioStopPlay"
                      :style="{ fontSize: '32px',color: 'rgb(217, 48, 37)'}"/>

                    <!-- 播放进度 -->
                    <span
                      v-if="isRecordingPlaying && recordingPlayingTime > 0"
                      style="font-size: 22px;font-weight: 600">
                      &nbsp;{{ this.recordingPlayingTime }}s
                    </span>

                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <!-- 上一题 下一题 -->
          <a-row type="flex">
            <a-col :span="5">
              <div style="float: right">
                <a-button v-if="curQueNum > 1 && preQuestionCnt === 0" type="primary" @click="preQuestion">
                  <a-icon type="left" />上一题
                </a-button>
              </div>
            </a-col>
            <a-col :span="5" :offset="14">
              <a-button v-if="curQueNum === questionNum" type="primary" @click="submit">
                提交<a-icon type="check" />
              </a-button>
              <a-button v-else type="primary" @click="nextQuestion">
                下一题<a-icon type="right" />
              </a-button>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </a-spin>
    <declaration ref="DA">
      <template slot="content">
        <p>一个简单的小评测。</p>
        <p>需要您授予摄像头权限。</p>
        <p>需要您授予录音权限。</p>
        <p>点击已知悉即代表同意以上要求。</p>
        <p>最终解释权归本小组所有。</p>
      </template>
    </declaration>
    <assess-result-modal ref="ARM">
      <template slot="content">
        <div>{{ expressionsListList }}</div>
        <div>{{ audioAnalysisResultList }}</div>
      </template>
    </assess-result-modal>
  </page-header-wrapper>
</template>
<script>
import Recorder from 'js-audio-recorder'
import { audioAnalysis } from '@/api/assess'
import Declaration from '@/components/Declaration'
import assessResultModal from '@/components/assessResultModal'
import events from '@/components/MultiTab/events'

export default {
  name: 'VoiceQAEval',
  components: {
    Declaration,
    assessResultModal
  },
  data () {
    return {
      audioAnalysisResultCheckInterval: null,
      spinTip: '若有权限提示，请点击允许！摄像头加载中，请稍等片刻 ~',
      isInSubmit: false,
      isCameraLoading: false,
      hasVideoAndAudioPermission: false,
      confirmDeclaration: false,
      preQuestionCnt: 0,
      curQueNum: 1,
      questions: [ '',
        '此时此刻，你正在想什么？',
        '你的梦想是什么？',
        '最近有觉得很压抑吗？',
        '最近和朋友们相处得怎么样？',
        '你觉得最近的饭菜怎么样？',
        '最近三个月让你最开心的一件事？',
        '最近三个月让你最生气的一件事？',
        '最近睡眠情况怎么样？',
        '你对自己身体的那个地方不太满意？',
        '你在什么时候感到真正的快乐？'],
      questionNum: 0,
      expressionsListList: [],
      audioAnalysisResultList: [],
      recordObjs: [],
      // 正在录音
      isRecording: false,
      // 正在播放录音
      isRecordingPlaying: false,
      // 播放时长
      recordingPlayingTime: 0,
      // 定时器
      timer: null,
      drawRecordId: null,
      ctx: null,
      canvas: null
    }
  },
  created () {
    events.$on('curQueExpressionsList' + this.$options.name, (curQueNum, expressionsList) => {
            this.expressionsListList[curQueNum] = expressionsList
    })
    events.$on('ConfirmDeclaration' + this.$options.name, () => {
      this.isCameraLoading = true
      this.confirmDeclaration = true
      events.$emit('openCamera', this.$options.name, true)
    })
    events.$on('CancelDeclaration' + this.$options.name, () => {
      this.notification('warning', '提示', '您未知悉 “测前须知”，若仍需测试，请点击 “下一题” 或 “录音” 按钮，重新知悉 “测前须知”。', 10)
    })
    events.$on('CameraOpenSuccess' + this.$options.name, () => {
      this.hasVideoAndAudioPermission = true
      this.isCameraLoading = false
    })
    events.$on('Permission denied' + this.$options.name, () => {
      this.isCameraLoading = false
      this.hasVideoAndAudioPermission = false
      this.notification('warning', '提示', '由于您未授予权限（摄像头和麦克风），测试启动失败！请授予权限后刷新页面。', 10)
    })
    this.questionNum = this.questions.length - 1
    for (let i = 0; i <= this.questionNum; i++) {
      this.recordObjs.push({
        // 用于存储创建的语音对象
        recorder: null,
        formData: null,
        // 录音时长
        duration: 0
      })
      this.expressionsListList.push(null)
      this.audioAnalysisResultList.push(null)
    }
    this.audioAnalysisResultList[0] = ''
  },
  mounted () {
    this.$refs.DA.showModal(this.$options.name)
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
  },
  beforeDestroy () {
    events.$emit('closeCamera')
  },
  methods: {
    preQuestion () {
      this.preQuestionCnt++
        this.curQueNum--
    },
    notificationOfNoVideoAndAudioPermission () {
      this.notification('warning', '提示', '由于您未授予权限（摄像头和麦克风），测试启动失败！请授予权限后刷新页面。', 3)
    },
    checkForRecording () {
      if (this.recordObjs[this.curQueNum].duration <= 0 || this.isRecording) {
        this.notification('warning', '提示', '请先完成回答哦！', 3)
        return false
      }

      if (this.isRecordingPlaying) {
        this.audioStopPlay()
      }

      return true
    },
    nextQuestion () {
      if (!this.confirmDeclaration) {
        this.$refs.DA.showModal(this.$options.name)
        return
      }

      if (!this.hasVideoAndAudioPermission) {
        this.notificationOfNoVideoAndAudioPermission()
        return
      }

      if (!this.checkForRecording()) {
        return
      }

      events.$emit('curQueDone', this.curQueNum)

      if (this.preQuestionCnt > 0) {
        this.preQuestionCnt--
      }

      while (this.expressionsListList[this.curQueNum] == null) {

      }

        this.curQueNum++

      if (this.curQueNum >= 3) {
        this.submitAudioAnalysis(this.curQueNum - 2)
      }
    },
    submit () { // 发送语音的方法
      console.log('submit')

      if (!this.checkForRecording()) {
        return
      }

      this.questionNum--
      this.spinTip = '拼命计算中，请耐心等待测试报告哦 ~'
      this.isInSubmit = true

      for (let theSubmitQueNum = this.curQueNum - 1; theSubmitQueNum <= this.curQueNum; theSubmitQueNum++) {
        this.submitAudioAnalysis(theSubmitQueNum)
      }
      this.audioAnalysisResultCheckInterval = setInterval(() => {
        if (!this.audioAnalysisResultList.includes(null)) {
          this.isInSubmit = false
          clearInterval(this.audioAnalysisResultCheckInterval)
          console.log('audioAnalysisResultList: ' + JSON.stringify(this.audioAnalysisResultList))
          this.$refs.ARM.showModal(this.$options.name)
        }
        console.log('this.audioAnalysisResultCheckInterval')
        console.log('audioAnalysisResultList: ' + JSON.stringify(this.audioAnalysisResultList))
      }, 100)
      events.$emit('closeCamera')
    },
    submitAudioAnalysis (theSubmitQueNum) {
      this.recordObjs[theSubmitQueNum].formData = new FormData()
      const blob = this.recordObjs[theSubmitQueNum].recorder.getWAVBlob()// 获取 wav 格式音频数据
      // 此处获取到 blob 对象后需要设置 fileName 满足当前项目上传需求，其它项目可直接传把 blob 作为 file 塞入 formData
      const newBolb = new Blob([blob], { type: 'audio/wav' })
      const fileOfBlob = new File([newBolb],
        theSubmitQueNum + '_' + this.$store.getters.id + '_' + new Date().getTime() + '.wav')
      // formData 是传给后端的对象
      this.recordObjs[theSubmitQueNum].formData.append('multipartFile', fileOfBlob)

      // 发送给后端分析
      audioAnalysis(this.recordObjs[theSubmitQueNum].formData).then(res => {
        this.audioAnalysisResultList[theSubmitQueNum] = res.result
        console.log('audioAnalysisResultList: ' + JSON.stringify(this.audioAnalysisResultList))
      })
    },
    // 开始录音
    startRecording () {
      console.log('startRecording')
      if (!this.confirmDeclaration) {
        this.$refs.DA.showModal(this.$options.name)
        return
      }
      if (!this.hasVideoAndAudioPermission) {
        this.notificationOfNoVideoAndAudioPermission()
        return
      }
      if (this.recordObjs[this.curQueNum].recorder) {
        this.recorderDestroy()
        this.isRecordingPlaying = false
      }
      // 实例化语音对象
      this.recordObjs[this.curQueNum].recorder = new Recorder({
        // 16 16000 1 适合语音识别
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1 // 声道，支持 1 或 2， 默认是1
      })
      // 录音时
      this.recordObjs[this.curQueNum].recorder.onprogress = (params) => {
        this.recordObjs[this.curQueNum].duration = params.duration.toFixed(0)
        // console.log('录音时长(秒)', params.duration)
        // console.log('录音大小(字节)', params.fileSize)
        // console.log('录音音量百分比(%)', params.vol)
      }
      // 录音播放完成回调
      this.recordObjs[this.curQueNum].recorder.onplayend = () => {
        console.log('onplayend')
        this.isRecordingPlaying = false
        this.stopDrawAudio()
      }
      // 录音播放开始回调
      this.recordObjs[this.curQueNum].recorder.onplay = () => {
        console.log('onplay')
        this.timer = setInterval(this.addRecordingPlayingTime, 1000)
        this.isRecordingPlaying = true
      }

      Recorder.getPermission().then(() => {
        // 开始录音
        this.recordObjs[this.curQueNum].recorder.start()
        this.isRecording = true
      }, (error) => {
        console.log(`${error.name} : ${error.message}`)
      })
      // 画图
      setTimeout(() => this.drawAudio(), 200)
    },
    // 停止录音
    stopRecording () {
      console.log('stopRecording')
      this.recordObjs[this.curQueNum].recorder.stop() // 停止录音
      this.isRecording = false
      this.stopDrawAudio()
    },
    // 播放录音
    audioPlayback () {
      console.log('audioPlayback')
      if (this.isRecording) {
        this.stopRecording()
      }
      // 播放录音
      this.recordObjs[this.curQueNum].recorder.play()
      // 画图
      setTimeout(() => this.drawAudio(), 200)
    },
    addRecordingPlayingTime () {
      console.log('addRecordingPlayingTime')
      ++this.recordingPlayingTime
      if (this.recordingPlayingTime >= this.recordObjs[this.curQueNum].duration) {
        clearInterval(this.timer)
        this.recordingPlayingTime = 0
      }
    },
    // 停止录音播放
    audioStopPlay () {
      console.log('audioStopPlay')
      this.recordObjs[this.curQueNum].recorder.stopPlay()
      this.isRecordingPlaying = false
      clearInterval(this.timer)
      this.recordingPlayingTime = 0
      this.stopDrawAudio()
    },
    // 销毁录音实例
    recorderDestroy () {
      console.log('recorderDestroy')
      if (this.recordObjs[this.curQueNum].recorder) {
        this.recordObjs[this.curQueNum].recorder.destroy() // 销毁实例
      }
    },
    // 绘图
    drawAudio () {
      console.log('drawAudio')
      // 用 requestAnimationFrame 稳定 60 fps 绘制
      this.drawRecordId = requestAnimationFrame(this.drawAudio)

      // 实时获取音频大小数据
      const dataArray = this.isRecording ? this.recordObjs[this.curQueNum].recorder.getRecordAnalyseData()
        : this.recordObjs[this.curQueNum].recorder.getPlayAnalyseData()
      const bufferLength = dataArray.length

      // 填充背景色
      this.ctx.fillStyle = 'rgb(255, 255, 255)'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      // 设定波形绘制颜色
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = 'rgb(225,14,14)'

      this.ctx.beginPath()

      var sliceWidth = this.canvas.width * 1.0 / bufferLength // 一个点占多少位置，共有 bufferLength 个点要绘制
      var x = 0 // 绘制点的 x 轴位置

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = v * this.canvas.height / 2

        if (i === 0) {
          // 第一个点
          this.ctx.moveTo(x, y)
        } else {
          // 剩余的点
          this.ctx.lineTo(x, y)
        }
        // 依次平移，绘制所有点
        x += sliceWidth
      }

      this.ctx.lineTo(this.canvas.width, this.canvas.height / 2)
      this.ctx.stroke()
    },
    // 停止绘图
    stopDrawAudio () {
      console.log('stopDrawAudio')
      // 让波形图复平
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId)
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
</script>
