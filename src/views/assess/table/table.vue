<template>
  <page-header-wrapper>
    <a-card class="ant-pro-pages-list-projects-cardList">
      <!--      进度条-->
      <div style=" width: 90%;white-space: nowrap ">
        <a-progress
          :strokeWidth="17"
          stroke-linecap="square"
          :show-info="false"
          :percent="(number+1)*100/20"/>
        <span>&nbsp;&nbsp; {{ number+1 }}/20</span>
      </div>
      <br/>
      <!--      问题-->
      <div v-for="(ques,index) in wt" :key="index">
        <div v-if="number === index">
          <div id="question" style="font-size: 17px">{{ ques }}</div>
          <div id="answer">
            <div v-for="(ans,index1) in answer" :key="index1">
              <a-button style="border: none;font-size: 17px"  @click="next(index1 + 1)">{{ans}}</a-button>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>

export default {
  props: {
    types: String
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
        }
      ],
      title: '',
      wt: [],
      answer: []
    }
  },
  methods: {
    getValue (val) {
      this.result = this.result + val
    },
    next (val) {
      this.result = this.result + val
      if (this.number === (this.nums - 1)) {
        // todo 将结果传入后端
        alert(this.result)
        if (this.result > 40) {
          alert('焦虑！！！！！')
          this.$emit('change', 'table-index', val)
        }
      } else {
        this.number++
      }
    }
  },
  mounted () {
    // 1. 获取题目
    // this.getTables()
  }
}
</script>

<style scoped>

</style>
