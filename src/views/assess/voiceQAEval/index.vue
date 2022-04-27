<template>
  <page-header-wrapper>
    <a-spin
      tip="若有权限提示，请点击允许！摄像头加载中，请稍等片刻 ~"
      size="large"
      :spinning="isCameraLoading">
      <div class="spin-content">
        <a-card >
          <!-- 进度条 -->
          <a-row type="flex" justify="center">
            <a-col :span="20">
              <a-progress style="font-size: 16px;font-weight: 600" :strokeWidth="12" :percent="curQueNum*10"/>
            </a-col>
          </a-row>
          <!-- 题目 监控 -->

          <a-row type="flex" justify="center">
            <a-col :span="20">
              <div style="height: 150px;vertical-align:middle;display:table-cell;font-size: 16px;font-weight: 600" >
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
    <declaration ref="DA" @requirePermissionSuccess="requirePermissionSuccess">
      <template slot="content">
        <p>一个简单的小评测。</p>
        <p>我要你的视频权限。</p>
        <p>我要你的录音权限。</p>
        <p>点击已知悉即代表同意以上要求。</p>
        <p>最终解释权归本小组所有。</p>
      </template>
    </declaration>
  </page-header-wrapper>
</template>
<script>
import Recorder from 'js-audio-recorder'
// import { saveAudioAndAnalysis } from '@/api/assess'
import Declaration from '@/components/Declaration'
import events from '@/components/MultiTab/events'

export default {
  name: 'VoiceQAEval',
  components: {
    Declaration
  },
  data () {
    return {
      isCameraLoading: false,
      hasVideoAndAudioPermission: false,
      preQuestionCnt: 0,
      curQueNum: 1,
      questionNum: 10,
      questions: [],
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
    events.$on('VoiceQAEvalConfirm', () => {
      this.$refs.DA.visible = false
      this.$refs.DA.loading = false
      this.isCameraLoading = true
      events.$emit('openCamera', this.$options.name, true)
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
    for (let i = 0; i <= this.questionNum; i++) {
      this.recordObjs.push({
        // 用于存储创建的语音对象
        recorder: null,
        formData: null,
        // 录音时长
        duration: 0
      })
    }
    this.questions.push('')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题1')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题2')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题3')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题4')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题5')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题6')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题7')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题8')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题9')
    this.questions.push('当前--------------------------------------------------------------------------------------' +
      '--------------------------------------------------------------------------------------问题10')
  },
  mounted () {
    this.$refs.DA.showModal(this.$options.name)
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
  },
  methods: {
    requirePermissionSuccess () {
      console.log('requirePermissionSuccess')
    },
    preQuestion () {
      this.preQuestionCnt++
        this.curQueNum--
    },
    nextQuestion () {
      if (!this.hasVideoAndAudioPermission) {
        this.notification('warning', '提示', '由于您未授予权限（摄像头和麦克风），测试启动失败！请授予权限后刷新页面。', 3)
        return
      }

      if (this.recordObjs[this.curQueNum].duration <= 0) {
        this.notification('warning', '提示', '请先回答问题哦！', 1)
        return
      }

      if (this.isRecording) {
        this.stopRecording()
      }

      if (this.isRecordingPlaying) {
        this.audioStopPlay()
      }

      if (this.preQuestionCnt > 0) {
        this.preQuestionCnt--
      }

      if (this.curQueNum >= 3) {
        // todo
        console.log('提交第（this.curQueNum - 2）号题')
      }

        this.curQueNum++
    },
    submit () { // 发送语音的方法
      console.log('submit')
      this.recordObjs[this.curQueNum].recorder.pause() // 暂停录音
      this.recordObjs[this.curQueNum].formData = new FormData()
      const blob = this.recordObjs[this.curQueNum].recorder.getWAVBlob()// 获取 wav 格式音频数据
      // 此处获取到 blob 对象后需要设置 fileName 满足当前项目上传需求，其它项目可直接传把 blob 作为 file 塞入 formData
      const newBolb = new Blob([blob], { type: 'audio/wav' })
      const fileOfBlob = new File([newBolb], new Date().getTime() + '.wav')
      // formData 是传给后端的对象
      this.recordObjs[this.curQueNum].formData.append('file', fileOfBlob)

      // 发送给后端的方法
      // saveAudioAndAnalysis(this.recordObjs[this.curQueNum].formData).then(res => {
      //   console.log('res:' + res)
      // })
      console.log('第 ' + this.curQueNum + ' 题上传完毕！')
    },
    // 开始录音
    startRecording () {
      console.log('startRecording')
      if (!this.hasVideoAndAudioPermission) {
        this.notification('warning', '提示', '由于您未授予权限（摄像头和麦克风），测试启动失败！请授予权限后刷新页面。', 3)
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
      this.drawAudio()
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
      this.drawAudio()
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
