<template>
  <a-dropdown id="cameraDropdown" placement="bottomCenter">

    <span class="ant-pro-drop-down">
      <a-icon type="camera" theme="twoTone" />
    </span>

    <template v-slot:overlay>
      <div style="position: relative;">
        <video
          :style="{'border-radius': (isNeedRecVis?8:4)+'px'}"
          @loadedmetadata="runFaceExpressions"
          ref="video"
          autoplay
          muted
          playsinline
          :width="isNeedRecVis?videoEl.videoWidth:192"
          :height="isNeedRecVis?videoEl.videoHeight:108"></video>

        <canvas
          :style="{width: (isNeedRecVis?videoEl.videoWidth:192)+'px',
                   height: (isNeedRecVis?videoEl.videoHeight:108)+'px',
                   position: 'absolute',
                   top: '0'}"
          ref="canvas" />
      </div>
    </template>

  </a-dropdown>

  <!--<div-->
  <!--  style="margin-right: 12px; align-items:center; display:flex;">-->
  <!--  <video-->
  <!--    :class="{'recognition-visualization':isNeedRecVis}"-->
  <!--    @loadedmetadata="runFaceExpressions"-->
  <!--    ref="video"-->
  <!--    autoplay-->
  <!--    muted-->
  <!--    playsinline-->
  <!--    :width="isNeedRecVis?-1:100"-->
  <!--    :height="isNeedRecVis?-1:64"></video>-->
  <!--  <canvas v-if="isNeedRecVis" class="recognition-visualization" ref="canvas" />-->
  <!--</div>-->
</template>

<script>
import * as faceapi from 'face-api.js'
import { AnchorPosition } from 'face-api.js/build/commonjs/draw/DrawTextField'

export default {
  name: 'CameraDropdown',
  props: {},
  data () {
    return {
      // 是否需要人脸检测可视化
      isNeedRecVis: false,
      // 摄像头视频流
      cameraStream: null,
      // 播放器元素
      videoEl: null,
      // 模型
      nets: 'tinyFaceDetector',
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
            min: 384,
            ideal: 1920,
            max: 1920
          },
          height: {
            min: 216,
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
    console.log('created ' + Date.now())
    this.modelInit()
      .then(this.initFaceMatcher)

    this.cameraStartup()

    document.onkeydown = (e) => {
      if (e.key === 'F9') {
        this.isNeedRecVis = !this.isNeedRecVis
      }
    }
  },
  // 此时组件渲染完毕，占位符也都被替换。
  mounted () {
    console.log('mounted ' + Date.now())
      this.simulateDropdown()
  },
  // 组件在销毁前会调用 beforeDestroy 钩子，可以在这里进行一些定时器或者销毁操作。destroyed 钩子函数会在 Vue 实例销毁后调用。
  beforeDestroy () {
    console.log('beforeDestroy ' + Date.now())
    this.willBeDestroyed = true

    this.closeCamera()
  },
  methods: {
    // 模型加载
    async modelInit () {
      console.log('modelInit ' + Date.now())
      await faceapi.nets[this.nets].loadFromUri('/models') // 算法模型
      // 表情识别
      await faceapi.loadFaceExpressionModel('/models') // 表情识别模型
      // 人脸识别
      await faceapi.loadFaceLandmarkModel('/models') // 轮廓模型
      await faceapi.loadFaceRecognitionModel('/models') // 人脸识别模型
      // 根据算法模型参数识别调整结果
      switch (this.nets) {
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
      console.log('initFaceMatcher ' + Date.now())

      if (this.willBeDestroyed) {
        return
      }

      const username = 'zfans'
      const imageUri = 'https://aliyuncs.com/123.jpg'

      const imageEl = await faceapi.fetchImage(imageUri)
      const result = await this.detectSingleFaceAndLandmarksAndDescriptor(imageEl)
      const descriptors = []
      const { descriptor } = result
      descriptors.push(descriptor)

      // const imageEl2 = await faceapi.fetchImage('https://...........png')
      // const result2 = await this.detectSingleFaceAndLandmarksAndDescriptor(imageEl2)
      // descriptors.push(result2.descriptor)

      // const descriptors = []
      // // 临时图片转码数据，将图片对象转数据矩阵对象
      // console.log('pre const imageEl = await faceapi.fetchImage(imageUri)')
      // const imageEl = await faceapi.fetchImage(imageUri)
      // console.log('pre descriptors.push(await faceapi.computeFaceDescriptor(imageEl))')
      // descriptors.push(await faceapi.computeFaceDescriptor(imageEl))

      // 返回图片用户和图片转码数组
      console.log('pre const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(username, descriptors)')
      const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(username, descriptors)
      // 人脸匹配矩阵数组对象转码结果
      console.log('pre this.faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)')
      this.faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)
    },
    detectSingleFaceAndLandmarksAndDescriptor (imageEl) {
      console.log('detectSingleFaceAndLandmarksAndDescriptor ' + Date.now())
        return faceapi
          .detectSingleFace(imageEl, this.options)
          .withFaceLandmarks()
          .withFaceDescriptor()
    },
    // 启动摄像头
    async cameraStartup () {
      console.log('cameraStartup ' + Date.now())
      this.cameraStream = await navigator.mediaDevices.getUserMedia(this.constraints)
      if (this.willBeDestroyed) {
        this.closeCamera()
      }
    },
    simulateDropdown () {
      console.log('simulateDropdown ' + Date.now())
      // 模拟 hover 让 cameraDropdown 的 overlay 先渲染出来
      document.getElementById('cameraDropdown').dispatchEvent(new Event('mouseenter'))
      setTimeout(() => {
        if (this.willBeDestroyed) {
          return
        }
        document.getElementById('cameraDropdown').dispatchEvent(new Event('mouseleave'))
        this.bindVideoAndCameraStream()
      }, 200)
    },
    bindVideoAndCameraStream () {
      console.log('bindVideoAndCameraStream ' + Date.now())
      if (this.willBeDestroyed) {
        return
      }
      if (this.cameraStream != null && this.faceMatcher != null) {
        if (this.videoEl == null) {
          this.videoEl = this.$refs.video
          if (this.videoEl) {
            this.videoEl.srcObject = this.cameraStream
          }
        }
      } else {
        setTimeout(() => this.bindVideoAndCameraStream())
      }
    },
    // 关闭摄像头
    closeCamera () {
      console.log('closeCamera ' + Date.now())
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach((track) => track.stop())
      }
    },
    // 人脸检测识别
    async runFaceExpressions () {
      console.log('runFaceExpressions ' + Date.now())

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

      console.log('result:' + JSON.stringify(result))

      if (result) {
        // 拿到情绪
        const { expressions } = result

        console.log('expressions:' + JSON.stringify(expressions))

        if (this.isNeedRecVis) {
          const canvas = this.$refs.canvas
          console.log('get dims')
          if (!(canvas && this.videoEl)) {
            return
          }
          const dims = faceapi.matchDimensions(canvas, this.videoEl, true)
          console.log('dims.width:' + dims.width + ' dims.height:' + dims.height)
          const resizedResult = faceapi.resizeResults(result, dims)

          console.log('resizedResult:' + JSON.stringify(resizedResult))
          const minConfidence = 0.05

          const { descriptor, detection } = resizedResult

          const label = this.faceMatcher.findBestMatch(descriptor).toString()
          const options = { label: label, drawLabelOptions: { anchorPosition: AnchorPosition.TOP_LEFT } }
          new faceapi.draw.DrawBox(detection.box, options).draw(canvas)

          faceapi.draw.drawDetections(canvas, resizedResult)
          console.log('drawDetections')
          faceapi.draw.drawFaceExpressions(canvas, resizedResult, minConfidence)
          console.log('drawFaceExpressions-----------------------------------------------------')
        }
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

<style>
.recognition-visualization {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 8px;
}
</style>
