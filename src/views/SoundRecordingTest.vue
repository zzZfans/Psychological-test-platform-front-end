<template>
  <page-header-wrapper>
    <a-card >
      <!-- 进度条 -->
      <a-row type="flex" justify="center">
        <a-col :span="20">
          <a-progress :percent="40"/>
        </a-col>
      </a-row>
      <!-- 题目 监控 -->

      <a-row type="flex" justify="center">
        <a-col :span="20">
          <div style="height: 150px;vertical-align:middle;display:table-cell;" >
            你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？
          </div>
        </a-col>
      </a-row>

      <!--<a-row type="flex" justify="space-around" align="middle" :gutter="48">-->
      <!--  <a-col flex="8">你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？你今天好吗？-->
      <!--  </a-col>-->
      <!--  <a-col flex="4" align="center">-->
      <!--    <div style="width: 150px;height: 150px;vertical-align:middle;display:table-cell;border: solid #de0e0e 1px;">-->
      <!--      摄像头-->
      <!--    </div>-->

      <!--  </a-col>-->
      <!--</a-row>-->

      <!-- 录音 -->
      <a-row type="flex" justify="end" align="middle" :gutter="24">
        <a-col :span="12">
          <canvas id="canvas" style="float: right;"></canvas>
        </a-col>
        <a-col :span="6">
          <a-row type="flex" justify="start">
            <a-col :span="8">
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
              <span :style="{ fontSize: '24px' }"> {{ this.duration }}s </span>
            </a-col>
            <a-col :span="8">
              <!-- 播放 -->
              <a-icon
                v-if="duration > 0 && !isRecordingPlaying"
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
                :style="{ fontSize: '24px' }"> {{ this.recordingPlayingTime }}s </span>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <!-- 下一题 -->
      <a-row type="flex" justify="end">
        <a-col :span="5">
          <a-button type="primary">
            下一题<a-icon type="right" />
          </a-button>
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>

</template>
<script>
import Recorder from 'js-audio-recorder'

export default {
  data () {
    return {
      // 正在录音
      isRecording: false,
      // 正在播放录音
      isRecordingPlaying: false,
      // 播放时长
      recordingPlayingTime: 0,
      // 定时器
      timer: null,
      // 用于存储创建的语音对象
      recorder: null,
      formData: null,
      // 录音时长
      duration: 0,
      drawRecordId: null,
      ctx: null,
      canvas: null
    }
  },
  mounted () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
  },
  methods: {
    callback (key) {
      console.log('callback')
      console.log(key)
    },
    submit () { // 发送语音的方法
      console.log('submit')
      this.recorder.pause() // 暂停录音
      this.timer = null
      var formData = new FormData()
      var blob = this.recorder.getWAVBlob()// 获取wav格式音频数据
      // 此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为		  file塞入formData
      var newbolb = new Blob([blob], { type: 'audio/wav' })
      var fileOfBlob = new File([newbolb], new Date().getTime() + '.wav')
      // formData是传给后端的对象,
      formData.append('file', fileOfBlob)

      // 发送给后端的方法
      // sendAudio(formData).then(res => {
      //   console.log(res)
      // })
    },
    // 开始录音
    startRecording () {
      console.log('startRecording')
      if (this.recorder) {
        this.recorderDestroy()
        this.isRecordingPlaying = false
      }
      // 实例化语音对象
      this.recorder = new Recorder({
        // 16 16000 1 适合语音识别
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1 // 声道，支持 1 或 2， 默认是1
      })
      // 录音时
      this.recorder.onprogress = (params) => {
        this.duration = params.duration.toFixed(0)
        // console.log('录音时长(秒)', params.duration)
        // console.log('录音大小(字节)', params.fileSize)
        // console.log('录音音量百分比(%)', params.vol)
      }
      // 录音播放完成回调
      this.recorder.onplayend = () => {
        console.log('onplayend')
        this.isRecordingPlaying = false
        this.stopDrawAudio()
      }
      // 录音播放开始回调
      this.recorder.onplay = () => {
        console.log('onplay')
        this.timer = setInterval(this.addRecordingPlayingTime, 1000)
        this.isRecordingPlaying = true
      }

      Recorder.getPermission().then(() => {
        // 开始录音
        this.recorder.start()
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
      this.recorder.stop() // 停止录音
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
      this.recorder.play()
      // 画图
      this.drawAudio()
    },
    addRecordingPlayingTime () {
      console.log('addRecordingPlayingTime')
      ++this.recordingPlayingTime
      if (this.recordingPlayingTime >= this.duration) {
        clearInterval(this.timer)
        this.recordingPlayingTime = 0
      }
    },
    // 停止录音播放
    audioStopPlay () {
      console.log('audioStopPlay')
      this.recorder.stopPlay()
      this.isRecordingPlaying = false
      clearInterval(this.timer)
      this.recordingPlayingTime = 0
      this.stopDrawAudio()
    },
    // 销毁录音实例
    recorderDestroy () {
      console.log('recorderDestroy')
      if (this.recorder) {
        this.recorder.destroy() // 销毁实例
      }
    },
    // 绘图
    drawAudio () {
      console.log('drawAudio')
      // 用 requestAnimationFrame 稳定 60 fps 绘制
      this.drawRecordId = requestAnimationFrame(this.drawAudio)

      // 实时获取音频大小数据
      const dataArray = this.isRecording ? this.recorder.getRecordAnalyseData() : this.recorder.getPlayAnalyseData()
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
      setTimeout(() => {
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId)
      }, 100)
    }
  }
}
</script>
