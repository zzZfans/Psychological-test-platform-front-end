<template>
  <page-header-wrapper>
    <a-card class="ant-pro-pages-list-projects-cardList">
      <a-modal
        v-model="modal2Visible"
        title="测试结果展示"
        centered
        @ok="Showmodal2Visible()"
      >
        <p>{{ this.access_results }}</p>
      </a-modal>
      <!--      进度条-->
      <div style=" width: 90%;white-space: nowrap ">
<!--        <div >-->
<!--          <a-text style="text-align:center;" type="primary"><dashboard-outlined />{{ dateFormat(date) }}</a-text>-->
<!--        </div>-->
        <div style="font-size: 25px;white-space: nowrap">
          <a-icon style="font-size: 50px" type="dashboard"></a-icon>
          <span v-show="!show" class="count">
            {{ getCode() }}s</span>
          <span style="float: right;color: #ff0000" v-show="!show" class="count">建议时间:{{ shownum(parseInt((wt.length*5) / 60) % 60) }}:{{ shownum(wt.length*5 % 60) }}s！</span>
        </div>
        <a-progress
          :strokeWidth="17"
          stroke-linecap="square"
          :show-info="false"
          :percent="(number+1)*100/wt.length"/>
        <span style="font-size: 18px">&nbsp;&nbsp; {{ number+1 }}/{{ wt.length }}</span>
      </div>
      <br/>
      <!--      问题-->
      <div v-for="(ques,index) in wt" :key="index">
        <div v-if="number === index">
          <div id="question" style="font-size: 25px">{{ ques }}</div>
          <br>
          <div id="answer">
            <div v-for="(ans,index1) in answer" :key="index1">
              <a-radio-group v-model="value" @change="onChange(index1+1)" >
                <a-radio :style="radioStyle" :value="index1" style="border: none;font-size: 25px ">
                  {{ ans }}
                </a-radio>
                <br>
              </a-radio-group>
            </div>
            <div style="clear: both"></div>
          </div>
          <div style="width: auto;height: 80px">
            <div>
              <a-config-provider style="top: 35px" :auto-insert-space-in-button="false">
                <a-button :disabled="isAble" type="primary" @click="rollbackone(index)">
                  <a-icon type="rollback" />返回上一题
                </a-button>
              </a-config-provider>
            </div>
            <div>
              <a-button style="height: 35px;left: 990px" type="primary" @click="backtop">
                <a-icon type="up-square-o" />
                退出测试
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </a-card>
    <declaration ref="DA" @requirePermissionSuccess="requirePermissionSuccess">
      <template slot="content">
        <p>一个简单的小评测。</p>
        <p>需要您授予摄像头权限。</p>
        <p>需要您授予录音权限。</p>
        <p>点击已知悉即代表同意以上要求。</p>
        <p>最终解释权归本小组所有。</p>
      </template>
    </declaration>
  </page-header-wrapper>
</template>

<script>
import Declaration from '@/components/Declaration'
import events from '@/components/MultiTab/events'
import { getUser } from '@/api/user'
import { saveAssessRecord } from '@/api/assess'

export default {
  name: 'TableRandom',
  props: {
    types: String
  },
  components: {
    Declaration
  },
  watch: {
    types: {
      immediate: true,
      handler (val) {
        for (let i = 0; i < this.tables.length; i++) {
          const temp = this.tables[i]
          if (temp.type === val) {
            this.wt = temp.wt
            this.title = temp.title
            this.answer = temp.answer
            this.nums = temp.wt.length
            break
          }
        }
      }
    }
  },
  data () {
    return {
      isInSubmit: false,
      isCameraLoading: false,
      hasVideoAndAudioPermission: false,
      confirmDeclaration: false,
      // 测试结果
      usetId: 0,
      username: '',
      accessType: '',
      resultLevel: 0,
      visible: false,
      modal1Visible: false,
      modal2Visible: false,
      access_results: '',
      // 测试结果
      resultplus: 0,
      lastvalue: '',
      show: true, // 计时器所用属性
      count: 0, // 计时器所用属性
      timer: null, // 计时器所用属性
      date: new Date(),
      gettime: '', // 当前时间
      value: '', // 选项数字
      timecode: '60',
      data: ' ',
      // 单项格式
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      result: 0,
      number: 0, // 第几题
      nums: 0, // 一共有几题
      tables: [
        {
          type: 'sas',
          title: '焦虑自评量表sas 20题',
          wt: [
            '1、我觉得比平常容易紧张和着急(焦虑)。',
            '2、我无缘无故地感到害怕(害怕)。',
            '3、我容易心里烦乱或觉得惊恐(惊恐)。',
            '4、我觉得我可能将要发疯(发疯感)。',
            '5、我、觉得一切都很好，也不会发生什么不幸(不幸预感)。',
            '6、我手脚发抖打颤(手足颤抖)',
            '7、我因为头痛,颈痛和背痛而苦恼(躯体疼痛)。',
            '8、我感觉容易衰弱和疲乏(乏力)。',
            '9、我觉得心平气和，組容易安静坐着(静坐不能)',
            '10、我觉得心跳很快(心慌)',
            '11、我因为一阵阵头晕而苦恼(头昏)。',
            '12、我有晕倒发作或觉得要晕倒似的(晕厥感)。',
            '13、我呼气吸气都感到很容易(呼吸困维)。',
            '14、我手脚麻木和刺痛(手足刺痛)。',
            '15、我因为胃痛和消化不良而苦恼(胃痛或消化不良)。',
            '16、我常常要小便(尿意频数)。',
            '17、我的手常常是干燥温暖的(多汗)。',
            '18、我脸红发热(面部潮红)。',
            '19、我容易入睡并且-夜睡得很好(睡眠障碍)',
            '20、我做恶梦。'
          ],
          answer: [
            '没有或很少时间有',
            '有时有',
            '大部分时间有',
            '绝大部分或全部时间都有'
          ]
        },
        {
          type: 'sds',
          title: '抑郁自评量表sds 20题',
          wt: [
            '1、我感到情绪沮丧，郁闷？',
            '2、我感到早晨心情最好？',
            '3、我要哭或想哭？',
            '4、我夜间睡眠不好？',
            '5、我吃饭象平时- -样多？',
            '6、我的性功能正常？',
            '7、我感到体重减轻？',
            '8、我为便秘烦恼？',
            '9、我的心跳比平时快？',
            '10、 我无故感到疲劳？',
            '11、我的头脑象往常一样清楚',
            '12、我做事情象平时一样不感到困难？',
            '13、 我坐卧不安,难以保持平静？',
            '14、我对未来感到有希望？',
            '15、我比平时更容易激怒？',
            '16、我觉得决定什么事很容易？',
            '17.我感到自已是有用的和不可缺少的人？',
            '18、我的生活很有意义？',
            '19、假若我死了别人会过得更好？',
            '20、我仍旧喜爱自己平时喜爱的东西？'
          ],
          answer: [
            '从无',
            '有时',
            '经常',
            '持续'
          ]
        },
        {
          type: 'mdq',
          title: '双相情感障碍测试 13题',
          wt: [
            '1、您感到非常好或非常开心，但其他人认为与您平时的状态不一样，或者还由于这种特别开心、兴奋而带来麻烦？',
            '2、您容易发脾气，经常大声指责别人、或与别人争吵或打架？',
            '3、您比平时更自信？',
            '4、您睡觉比平时少，而且也不想睡？',
            '5、您话比平时多，或说话速度比平时快?',
            '6、您觉得脑子灵活，反应比平时快，或难以减慢您的思维？',
            ' 7、您很容易被周围的事物干扰，以致不能集中注意力？',
            ' 8、您的精力比平时好？',
            '9、您比平时积极主动，或比平时做了更多的事情？',
            '10、您比平时喜欢社交或外出，如在半夜仍给朋友打电话？',
            '11、您的性欲比平时强？',
            ' 12、您做了一些平时不会做的事情，别人认为那些事情有些过分、愚蠢或冒险？',
            '13、您花钱太多，使自己或家庭陷入困境？'
          ],
          answer: [
            '是',
            '否'
          ]
        },
        {
          type: 'HCL-32',
          title: '轻躁狂症自测表 32题',
          wt: [
            '1、我需要睡眠的时间比平时少?',
            '2、我感觉精力充沛或活动增多?',
            '3、我更加自信?',
            '4、我更加喜欢我的工作?',
            '5、我更加喜欢交往(打更多电话、外出更加频繁)?',
            '6、我喜欢旅行并且确实旅行了很多?',
            '7、当时喜欢开快车或驾驶中更加不顾风险?',
            '8、我会花比较多的钱或很多的钱？',
            '9、在我的日常生活中更加冒险？',
            '10、我的活动量会增多（如花较多时间体育运动)？',
            '11、我有比较多活动的计划，或有许多计划活动？',
            '12、我有很多的想法，我更加才思敏捷？',
            '13、我不再害羞，不再前怕狼后怕虎？',
            '14、我穿的衣服更加鲜艳，打扮更加时髦？',
            '15、我希望接触更多人，或的确结识了更多的人？',
            '16、我对性更加感兴趣，或性欲明显增加？',
            '17、我更喜欢找异性聊天，或性行为比过去多？',
            '18、我更加健谈？',
            '19、我思维更加敏捷？',
            '20、当我讲话时，我更喜欢讲笑话或开更多玩笑？',
            '21、我比较容易分心？',
            '22、我从事很多新奇的事情？',
            '23、我的思维经常从一个话题跳到另一个话题？',
            '24、我感到做事更加迅速，或更加容易？',
            '25、我更加没有耐心，或更容易对别人发怒？',
            '26、我常常令他人疲惫不堪或恼怒？',
            '27、我经常与人争吵？',
            '28、我的情绪激昂，更加乐观？',
            '29、我喝更多的咖啡或茶？',
            '30、我抽更多的烟？',
            '31、我喝更多的酒？',
            '32、我吃更多的药物（镇静剂、抗焦虑药、兴奋剂)？'
          ],
          answer: [
            '是',
            '否'
          ]
        }
      ],
      title: '',
      wt: [],
      answer: []
    }
  },
  methods: {
    saveAssessRecord () {
      // alert(777)
      const data = {
        assessType: this.accessType,
        resultLevel: this.resultLevel,
        userId: this.userId,
        username: this.username
      }
      // alert(JSON.stringify(data))
      saveAssessRecord(data).then(res => {
        if (res.success) {
          // alert('测试数据已上传')
        } else {
          alert(this.$error)
        }
      })
    },
    Showmodal2Visible () {
      this.modal2Visible = false
      this.$router.push({ path: '/' })
    },
    drawAudio () {
      // console.log('drawAudio')
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
      // console.log('stopDrawAudio')
      // 让波形图复平
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId)
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    requirePermissionSuccess () {
      // console.log('requirePermissionSuccess')
      this.getCode()
    },
    // created () { // 显示当前时间
    //   this.gettimes()
    // },
    // 时间格式化
    dateFormat (time) {
      var date = new Date(time)
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    reset () {
      this.result = 0
      this.number = 0
      this.nums = 0
      this.title = ''
      this.wt = []
      this.answer = []
    },
    getValue (val) {
      this.result = this.result + val
    },
    sleep (duration) {
      return new Promise(resolve => {
        setTimeout(resolve, duration * 300)
      })
    },
    async onChange (val) {
      this.lastvalue = val
      await this.sleep(1)
      // console.log('radio checked', this.value)
      // alert('到onchange')
      this.isAble = false
      this.result = this.result + val
      if (this.number === (this.nums - 1)) {
        // 作假判断
        // if (this.count >= this.wt.length * 5) {
        // alert(this.result)
        this.computefunction()
        this.saveAssessRecord()
        this.modal2Visible = true
        await this.sleep(10000)
        this.reset()
        // this.$emit('change', 'table-index', val)
        // this.$emit('change', 'table-index')
        this.$router.push({ path: '/' })
        // } else {
        //   alert('存在作假测试！请重新测试')
        //   this.$emit('change', 'table-index')
        // }
      } else {
        this.number++
      }
      this.value = ''
    },
    // 计算方法分类
    computefunction () {
      if (this.types === 'sas') {
          this.resultplus = this.result * 1.25
        this.accessType = '焦虑'
        if (this.resultplus < 50) {
          this.access_results = '个体存在明显的焦虑症状，建议多看书、多运动、多社交'
          this.resultLevel = 0
        } else if (this.resultplus >= 50 && this.resultplus <= 59) {
          this.access_results = '个体焦虑症状比较明显，平时注意心态培养'
          this.resultLevel = 1
        } else if (this.resultplus >= 60 && this.resultplus < 69) {
          this.access_results = '个体存在焦虑症状，但不必过度担心，正常生活即可'
          this.resultLevel = 2
        } else {
          this.access_results = '个体不存在焦虑'
          this.resultLevel = 3
        }
      }
      if (this.types === 'sds') {
        // this.resultplus = this.result * 1.25 // 标准分计算
        this.resultplus = this.result / 80
        this.accessType = '抑郁'
        if (this.resultplus < 0.5) {
          this.access_results = '个体存在明显的抑郁症状，建议到相关医院求助'
          this.resultLevel = 0
        } else if (this.resultplus >= 0.5 && this.resultplus <= 0.59) {
          this.access_results = '个体有比较明显的抑郁症状，建议通过社交、运动改变现状'
          this.resultLevel = 1
        } else if (this.resultplus >= 0.6 && this.resultplus < 0.69) {
          this.access_results = '个体存在抑郁症状但不明显，不必过度紧张'
          this.resultLevel = 2
        } else {
          this.access_results = '个体不存在抑郁问题'
          this.resultLevel = 3
        }
      }
      if (this.types === 'mdq') {
        this.resultplus = this.result
        this.accessType = '强迫症'
        if (this.resultplus < 3) {
          this.access_results = '个体严重存在双相情感障碍，建议及时向专业心理专家寻求帮助'
          this.resultLevel = 0
        } else if (this.resultplus >= 3 && this.resultplus <= 6) {
          this.access_results = '个体存在比较明显的双相情感障碍问题，建议通过阅读相关书籍和社交来消除现状'
          this.resultLevel = 1
        } else if (this.resultplus >= 6 && this.resultplus < 9) {
          this.access_results = '个体存在双相情感障碍问题但不明显，正常生活即可'
          this.resultLevel = 2
        } else {
          this.access_results = '个体在双相情感障碍方面正常'
          this.resultLevel = 3
        }
      }
      if (this.types === 'HCL-32') {
        this.resultplus = this.result
        this.accessType = '精神病'
        if (this.resultplus < 9) {
          this.access_results = '个体存在明显的轻躁狂症，建议及时向专业心理院所寻求帮助'
          this.resultLevel = 0
        } else if (this.resultplus >= 9 && this.resultplus < 17) {
          this.access_results = '个体存在比较明显的轻躁狂症，建议养小动物改变习惯'
          this.resultLevel = 1
        } else if (this.resultplus >= 17 && this.resultplus < 23) {
          this.access_results = '个体存在轻躁狂症，但不明显，正常生活即可，积极向上'
          this.resultLevel = 2
        } else {
          this.access_results = '个体在轻躁狂症方面正常'
          this.resultLevel = 3
        }
      }
    },
    rollbackone (val) {
      this.val = val
      if (this.val === 0) {
        alert('无题可退！')
      } else {
        this.number--
        this.isAble = true
        this.result -= this.lastvalue
      }
    },
    backtop () {
      this.$router.push({ path: '/' })
      // this.$emit('change', 'table-index')
    },
    getCode () {
      // const TIME_COUNT = val
      if (!this.timer) {
        this.count = 0
        this.show = false
        this.timer = setInterval(() => {
          if (this.count >= 0) {
            this.count++
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
         }
        }, 1000)
      }
      return this.shownum(parseInt(this.count / 60) % 60) + ':' + this.shownum(this.count % 60)
    },
    shownum (num) {
      if (num < 10) {
        return '0' + num
      } else {
        return num
      }
    },
    getUser () {
      getUser().then(res => {
        if (res.success) {
          this.username = res.result.username
          this.userId = res.result.id
        }
      })
    }
  },
  created () {
    events.$on('ConfirmDeclaration' + this.$options.name, () => {
      this.$refs.DA.visible = false
      this.$refs.DA.loading = false
      this.isCameraLoading = true
      this.confirmDeclaration = true
      events.$emit('openCamera', this.$options.name, true)
    })
    events.$on('CancelDeclaration' + this.$options.name, () => {
      this.$router.push({ path: '/' })
      this.notification('warning', '提示', '您未知悉 “测前须知”，若仍需测试，请点击“已知悉”。', 5)
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
  },
  mounted () {
    this.$refs.DA.showModal(this.$options.name)
    // 1. 获取题目
    // this.getTables()
    // 显示当前日期时间
    const _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
      this.getUser()
  },
  beforeDestroy () {
    events.$emit('closeCamera')
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style scoped>

</style>
