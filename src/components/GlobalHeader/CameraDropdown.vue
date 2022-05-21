<template>
  <a-dropdown id="cameraDropdown" placement="bottomCenter">

    <span :style="{opacity: cameraIconOpacity}" class="ant-pro-drop-down">
      <a-icon type="camera" theme="twoTone" />
    </span>

    <template v-slot:overlay>
      <div style="position: relative;">
        <video
          :style="{'border-radius': (isNeedRecVis ? 8 : 4)+'px'}"
          @loadedmetadata="runFaceExpressions"
          ref="video"
          autoplay
          muted
          playsinline
          :width="isNeedRecVis?videoEl.videoWidth:videoWidth"
          :height="isNeedRecVis?videoEl.videoHeight:videoHeight"></video>

        <canvas
          :style="{width: (isNeedRecVis?videoEl.videoWidth:videoWidth)+'px',
                   height: (isNeedRecVis?videoEl.videoHeight:videoHeight)+'px',
                   position: 'absolute',
                   top: '0'}"
          ref="canvas" />
      </div>
    </template>

  </a-dropdown>
</template>

<script>
import * as faceapi from 'face-api.js'
import { AnchorPosition } from 'face-api.js/build/commonjs/draw/DrawTextField'
import events from '@/components/MultiTab/events'

export default {
  name: 'CameraDropdown',
  props: {},
  data () {
    return {
      expressionEnum: {
        'neutral': 0,
        'happy': 1,
        'sad': 2,
        'angry': 3,
        'fearful': 4,
        'disgusted': 5,
        'surprised': 6
      },
      isStopWorking: false,
      warningCnt: 0,
      maxWarningCnt: 3,
      faceNotFoundCnt: 0,
      faceNotMatchCnt: 0,
      maxFaceNotMatchCnt: 3,
      maxFaceNotFoundCnt: 3,
      expressionsList: [],
      caller: null,
      // 摄像头图标透明度
      cameraIconOpacity: 0,
      // 是否需要人脸检测可视化
      isNeedRecVis: false,
      // 摄像头视频流
      cameraStream: null,
      // 播放器元素
      videoEl: null,
      // 限定 videoWidth
      videoWidth: 192,
      // 限定 videoHeight
      videoHeight: 108,
      // 画布元素
      canvasEl: null,
      // 模型
      faceDetectionModelName: 'tinyFaceDetector',
      // 模型参数
      options: null,
      willBeDestroyed: false,
      // 样本人脸匹配矩阵数组对象转码结果
      faceMatcher: null,
      // 视频媒体参数配置
      constraints: {
        audio: false,
        video: {
          // ideal（应用最理想的）
          width: {
            min: 576,
            ideal: 1920,
            max: 1920
          },
          height: {
            min: 324,
            ideal: 1080,
            max: 1080
          },
          // frameRate 受限带宽传输时，低帧率可能更适宜
          frameRate: {
            min: 15,
            ideal: 30,
            max: 60
          },
          // 显示模式前置后置
          facingMode: 'user' // 前置 user 后置 environment
        }
      }
    }
  },
  // data 数据已经初始化，可以访问，但此时的 dom 没有挂载，可以在这里进行请求服务器数据等操作。
  created () {
    // console.log('created ' + Date.now())

    events.$on('curQueDone', (curQueNum) => {
      events.$emit('curQueExpressionsList' + this.caller, curQueNum, this.expressionsList)
      this.expressionsList = []
    })

    this.modelInit()
      .then(this.initFaceMatcher)

    document.onkeydown = (e) => {
      if (e.key === 'F9') {
        this.isNeedRecVis = !this.isNeedRecVis
      }
    }
  },
  // 此时组件渲染完毕，占位符也都被替换。
  mounted () {
    // console.log('mounted ' + Date.now())
    this.simulateDropdown()
  },
  // 组件在销毁前会调用 beforeDestroy 钩子，可以在这里进行一些定时器或者销毁操作。destroyed 钩子函数会在 Vue 实例销毁后调用。
  beforeDestroy () {
    // console.log('beforeDestroy ' + Date.now())
    this.willBeDestroyed = true

    this.closeCamera()
  },
  methods: {
    setCaller (caller) {
      this.caller = caller
    },
    // 模型加载
    async modelInit () {
      // console.log('modelInit ' + Date.now())
      // 人脸检测模型
      await faceapi.nets[this.faceDetectionModelName].loadFromUri('/models')
      // 表情识别模型
      await faceapi.loadFaceExpressionModel('/models')
      // 人脸面部标志模型（提高人脸识别、表情识别精度）
      await faceapi.loadFaceLandmarkModel('/models')
      // 人脸识别模型
      await faceapi.loadFaceRecognitionModel('/models')
      // 根据人脸检测模型选择对应的参数
      switch (this.faceDetectionModelName) {
        case 'ssdMobilenetv1':
          this.options = new faceapi.SsdMobilenetv1Options({
            minConfidence: 0.5 // (0,1) 0.5(default)
          })
          break
        case 'tinyFaceDetector':
          this.options = new faceapi.TinyFaceDetectorOptions({
            inputSize: 224, // 128 160 224 320 416(default) 512 608 (整除 32)
            scoreThreshold: 0.5 // (0,1) 0.5(default)
          })
          break
        case 'mtcnn':
          this.options = new faceapi.MtcnnOptions({
            minFaceSize: 20, // >= 0 20(default)
            scaleFactor: 0.709 // (0,1) 0.709(default)
          })
          break
      }
    },
    // 生成人脸匹配矩阵数组对象，样本图片同步转码
    async initFaceMatcher () {
      // console.log('initFaceMatcher ' + Date.now())

      if (this.willBeDestroyed) {
        return
      }

      const username = this.$store.getters.nickname
      const imageUri = this.$store.getters.faceRecognitionSource

      const imageEl = await faceapi.fetchImage(imageUri)
      const result = await this.detectSingleFaceAndLandmarksAndDescriptor(imageEl)
      const descriptors = []
      const { descriptor } = result
      descriptors.push(descriptor)

      // const imageEl2 = await faceapi.fetchImage('https://...........png')
      // const result2 = await this.detectSingleFaceAndLandmarksAndDescriptor(imageEl2)
      // descriptors.push(result2.descriptor)

      // 返回图片用户和图片转码数组
      // console.log('pre const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(username, descriptors)')
      const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(username, descriptors)
      // 人脸匹配矩阵数组对象转码结果
      // console.log('pre this.faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)')
      this.faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)
    },
    detectSingleFaceAndLandmarksAndDescriptor (imageEl) {
      // console.log('detectSingleFaceAndLandmarksAndDescriptor ' + Date.now())
      return faceapi
        .detectSingleFace(imageEl, this.options)
        .withFaceLandmarks()
        .withFaceDescriptor()
    },
    // 启动摄像头
    async cameraStartup (isNeedAudio) {
      // console.log('cameraStartup ' + Date.now())
      if (isNeedAudio) {
        this.constraints.audio = true
      }
      this.cameraStream = await navigator.mediaDevices
        .getUserMedia(this.constraints)
        .catch(() => {
          // Permission denied
          events.$emit('Permission denied' + this.caller)
          events.$emit('closeCamera')
        })
      if (this.willBeDestroyed) {
        this.closeCamera()
      }
    },
    // 模拟 hover 让 cameraDropdown 的 overlay 先渲染出来
    simulateDropdown () {
      // console.log('simulateDropdown ' + Date.now())
      document.getElementById('cameraDropdown').dispatchEvent(new Event('mouseenter'))
      setTimeout(() => {
        if (this.willBeDestroyed) {
          return
        }
        document.getElementById('cameraDropdown').dispatchEvent(new Event('mouseleave'))
        this.bindVideoAndCameraStream()
      }, 200)
    },
    // 将摄像头视频流绑定到 Video 上
    bindVideoAndCameraStream () {
      // console.log('bindVideoAndCameraStream ' + Date.now())
      if (this.willBeDestroyed) {
        return
      }
      if (this.cameraStream != null && this.faceMatcher != null) {
        if (this.videoEl == null) {
          this.videoEl = this.$refs.video
          if (this.videoEl) {
            this.videoEl.srcObject = this.cameraStream
            this.cameraIconOpacity = 1
            events.$emit('CameraOpenSuccess' + this.caller)
          }
        }
      } else {
        setTimeout(() => this.bindVideoAndCameraStream())
      }
    },
    // 关闭摄像头
    closeCamera () {
      // console.log('closeCamera ' + Date.now())
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach((track) => track.stop())
      }
    },
    // 人脸检测识别
    async runFaceExpressions () {
      if (this.isStopWorking) {
        return
      }
      // console.log('runFaceExpressions ' + Date.now())

      if (this.willBeDestroyed) {
        return
      }

      if (this.videoEl.paused) {
        // 当 Dropdown 收起时，Video 会自动 pause，这里 play 一下
        this.videoEl.play()
      }

      // 识别
      const result = await this.detectSingleFaceAndLandmarksAndDescriptor(this.videoEl)
        .withFaceExpressions()

      // console.log('result:' + JSON.stringify(result))

      if (result === undefined) {
        if (++this.faceNotFoundCnt > this.maxFaceNotFoundCnt) {
          this.isStopWorking = true
          this.$warning({
            title: '警告',
            content: (
              <div>
                <p>未检测到人脸，请将人脸放在摄像头的可视范围内或不要剧烈晃动！</p>
              </div>
            ),
            okText: '确定',
            width: 530,
            onOk: () => {
              this.isStopWorking = false
              this.runFaceExpressions()
            }
          })
        }
        this.runFaceExpressions()
        return
      } else {
        this.faceNotFoundCnt = 0
      }

      // 拿到情绪
      const { expressions, descriptor } = result

      // console.log('expressions:' + JSON.stringify(expressions))

      let curExpression = null
      let curMaxScore = 0

      for (const expressionsKey in expressions) {
            if (expressions[expressionsKey] > curMaxScore) {
              curMaxScore = expressions[expressionsKey]
              curExpression = expressionsKey
            }
      }

      // console.log(curMaxScore, curExpression)

      this.expressionsList.push(this.expressionEnum[curExpression])

      const label = this.faceMatcher.findBestMatch(descriptor).toString()

      if (label.indexOf('unknown') !== -1) {
        if (++this.faceNotMatchCnt > this.maxFaceNotMatchCnt) {
          this.warningCnt++
          this.isStopWorking = true
          if (this.warningCnt > this.maxWarningCnt) {
            this.$warning({
              title: '警告',
              content: (
                <div>
                  <p>警告已超过 {this.maxWarningCnt} 次，本次测试无效！</p>
                  <p>即将回到首页。</p>
                </div>
              ),
              okText: '确定',
              width: 530,
              onOk: () => {
                this.$router.push({ name: 'info' })
              }
            })
            return
          }
          this.$warning({
            title: '警告',
            content: (
              <div>
                <p>系统监测发现非本人测试，请对自己的心理测试负责！</p>
                <p>本次是第 {this.warningCnt} 次警告，超过 {this.maxWarningCnt} 次将取消本次测试。</p>
                <p>若是本人测试，请更新清晰可辨别的源图后再进行测试。</p>
              </div>
            ),
            okText: '确定',
            width: 530,
            onOk: () => {
              this.isStopWorking = false
              this.runFaceExpressions()
            }
          })
          return
        }
      } else {
        this.faceNotMatchCnt = 0
      }

      if (this.isNeedRecVis) {
        this.canvasEl = this.$refs.canvas
        // console.log('get dims')
        if (!(this.canvasEl && this.videoEl)) {
          return
        }
        const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true)
        // console.log('dims.width:' + dims.width + ' dims.height:' + dims.height)
        const resizedResult = faceapi.resizeResults(result, dims)

        // console.log('resizedResult:' + JSON.stringify(resizedResult))
        const minConfidence = 0.05

        const { detection } = resizedResult

        const options = { label: label, drawLabelOptions: { anchorPosition: AnchorPosition.TOP_LEFT } }
        new faceapi.draw.DrawBox(detection.box, options).draw(this.canvasEl)

        faceapi.draw.drawDetections(this.canvasEl, resizedResult)
        // console.log('drawDetections')
        faceapi.draw.drawFaceExpressions(this.canvasEl, resizedResult, minConfidence)
        // console.log('drawFaceExpressions-----------------------------------------------------')
      } else if (this.canvasEl != null) {
        // console.log('清空画布 canvas')
        this.canvasEl.getContext('2d').clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
        this.canvasEl = null
      }

      // 不断执行
      setTimeout(() => {
        if (this.willBeDestroyed) {
          return
        }
        this.runFaceExpressions()
      })
    }
  }
}
</script>
