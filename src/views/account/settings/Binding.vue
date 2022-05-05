<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <div>
      <a-upload
        v-model="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          从相册上传
        </a-button>
        <span>-------</span>
        <a-button>
          拍摄
        </a-button>
      </a-upload>
    </div>
    <div class="camera-box" style="width: 900px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="text-align: center;font-size: 14px;font-weight: bold;margin-bottom: 10px;">摄像头</div>
          <!-- 这里就是摄像头显示的画面 -->
          <video id="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoPlay></video>
          <canvas id="canvasCamera" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
          <!--          <video id="video" width="400" height="300"></video>-->
          <div class="iCenter" >
            <a-button type="primary" size="small" icon="el-icon-camera" @click="takePhone" style="margin-top: 10px;">开启摄像头</a-button>
            <a-button @click="drawImage" icon="el-icon-camera" size="small">拍照</a-button>
            <a-button id="stop" icon="el-icon-camera" size="small">完成</a-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center;font-size: 14px;font-weight: bold;margin-bottom: 10px;">拍摄效果</div>
          <!-- 这里是点击拍照显示的图片画面 -->
          <canvas id="canvas" width="400" height="300" style="display: block;"></canvas>
          <el-button
            :loading="loadingbut"
            icon="el-icon-check"
            type="primary"
            size="small"
            @click="takePhoneUpfile"
            style="margin-top: 10px;">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </a-list>
</template>

<script>
// import { putFileAttach } from '@/api/customer/animalinfo'
import { faceUpload } from '@/api/user'
export default {
  props: { // 拍摄所需属性
    tackPhoto: {// 父组件传过来的状态
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      videoWidth: 500, // 绘画布的宽高
      videoHeight: 400,
      stt: '',
      os: false, // 控制摄像头开关
      thisCancas: null,
      thisContext: null,
      imgSrc: '',
      thisVideo: null,
      loadingbut: false, // 拍摄所需
      preViewVisible: false,
      blobFile: null,
      canvas: null,
      video: null,
      mediaStreamTrack: '',
      data: [],
      fileList: {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    }
  },
  watch: {
    tackPhoto: {
      immediate: true,
      handler (newVal) { // 监听接收到拍摄状态后，开始调取摄像头权限。如果功能是在一个组件里面，下面步骤可以直接写在自己的触发方法里面
        if (newVal) {
          var video = document.querySelector('video')
          // eslint-disable-next-line no-unused-vars
          var text = document.getElementById('text')
          // var mediaStreamTrack;

          // 兼容代码
          window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL)

          if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {}
          }
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
              var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
              if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
              }
              return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject)
              })
            }
          }

          // 摄像头调用配置
          var mediaOpts = {
            audio: false
            // video: true,
            // video: { facingMode: 'environment' } // 或者 "user"
            // video: { width: 1280, height: 720 }
            // video: { facingMode: { exact: "environment" } }// 或者 "user"
          }

          const that = this
          navigator.mediaDevices.getUserMedia(mediaOpts).then(function (stream) {
            that.mediaStreamTrack = stream
            video = document.querySelector('video')
            if ('srcObject' in video) {
              video.srcObject = stream
            } else {
              video.src = window.URL && window.URL.createObjectURL(stream) || stream
            }
            video.play()
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      deep: true
    }
  },
  mounted () {
    // 摄像头
    this.video = document.getElementById('video')
    // 画布
    this.canvas = document.getElementById('canvas')
  },
  methods: {
    base64toFile (data, fileName) {
      const dataArr = data.split(',')
      const byteString = atob(dataArr[1])
      const options = {
        type: 'image/jpeg',
        endings: 'native'
      }
      const u8Arr = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i)
      }
      return new File([u8Arr], fileName + '.jpg', options)
    },
    faceUpload (data) {
      const str = this.base64toFile(data, 'file')
      const formData = new FormData()
      formData.append('file', str)
      faceUpload(formData).then(res => {
        alert(JSON.stringify(res))
        if (res.success) {
          this.$message.success('人脸采集成功！')
        } else {
          this.$message.error('采集失败！')
        }
      })
    },
    /* 完成拍照并对其照片进行上传 */
    onCancel () {
      this.$router.replace({ path: '@/views/account/settings/Binding' })
      this.visible = false
      /* this.resetCanvas(); */
      // console.log(this.imgSrc);
      this.imgFile = this.dataURLtoFile(this.imgSrc, new Date() + '.png')
      console.log(this.imgFile)
      this.stopNavigator()
      // let par = {
      //   photo: this.imgFile,
      // };
      const data = new FormData()
      data.append('photo', this.imgFile) // 1是图片，2是视频
      // data.append("code", this.addForm.code);
      console.log(data)
      // todo 图片上传
    },
    // 清空画布
    clearCanvas (id) {
      const c = document.getElementById(id)
      const cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    },

   // 重置画布
    resetCanvas () {
      // this.imgSrc = "";
      this.clearCanvas('canvasCamera')
    },
    base64ImgtoFile (dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
    // 调用摄像头 --- 进行绘制图片
    drawImage () {
      // 点击，canvas画图
      this.thisContext.drawImage(
        this.thisVideo,
        0,
        0,
        this.videoWidth,
        this.videoHeight
      )
      // 获取图片base64链接
      // 这里的dataurl就是base64类型
      this.imgSrc = this.thisCancas.toDataURL('image/png')

      /* const imgSrc=this.imgSrc; */
    },
    // 调用摄像头权限
    getCompetence () {
      // 必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this
        this.os = false // 切换成关闭摄像头
        // 获取画布节点
        this.thisCancas = document.getElementById('canvasCamera')
        // 为画布指定绘画为2d类型
        this.thisContext = this.thisCancas.getContext('2d')
        // 获取video节点
        this.thisVideo = document.getElementById('videoCamera')
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            const getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(
                new Error('getUserMedia is not implemented in this browser')
              )
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        const constraints = {
          audio: false,
          video: {
            width: _this.videoWidth,
            height: _this.videoHeight,
            transform: 'scaleX(-1)'
          }
        }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            _this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
            if ('srcObject' in _this.thisVideo) {
              _this.thisVideo.srcObject = stream
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream)
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play()
            }
            // 监听关闭按钮
            document.getElementById('stop').addEventListener('click', function () {
              _this.imgSrc = _this.thisCancas.toDataURL('image/png')
              _this.faceUpload(_this.imgSrc)
              _this.thisVideo.srcObject.getVideoTracks().forEach(function (track) {
                track.stop()
              })
            })
          })
          .catch(err => {
            this.$notify({
              title: '警告',
              message: '没有开启摄像头权限或浏览器版本不兼容.',
              type: 'warning',
              err: err
            })
          })
      })
    },
    takePhone () { // 点击拍照截图画面
      this.getCompetence()
      // const that = this
      // that.canvas.getContext('2d').drawImage(this.video, 0, 0, 400, 300)
      // const dataurl = that.canvas.toDataURL('image/jpeg')
      // that.blobFile = that.dataURLtoFile(dataurl, 'camera.jpg')
      // that.preViewVisible = true
    },
    takePhoneUpfile () { // 保存图片
      this.loadingbut = true
      const formData = new FormData()
      formData.append('file', this.blobFile) // 图片内容
      // 上传图片
      // eslint-disable-next-line no-undef
      putFileAttach(formData).then(res => { // 后台接口
        this.loadingbut = false
        this.$emit('picture', res.data.data)
        this.tackPhoto = false
        this.canvas.getContext('2d').clearRect(0, 0, 400, 300) // 清除画布
        // 关闭摄像头
        this.mediaStreamTrack.getVideoTracks().forEach(function (track) {
          track.stop()
        })
      }, error => {
        this.loadingbut = false
        window.console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.upload-list-inline :deep (.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline [class*='-upload-list-rtl'] :deep (.ant-upload-list-item) {
  float: right;
}
.camera-box #canvas{
  border: 1px solid #DCDFE6;
}
</style>
