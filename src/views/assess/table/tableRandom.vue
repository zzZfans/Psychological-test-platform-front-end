<template>
  <page-header-wrapper>
    <a-card class="ant-pro-pages-list-projects-cardList">
      <!--      进度条-->
      <div style=" width: 90%;white-space: nowrap ">
        <div >
          <a-text style="text-align:center;" type="primary"><dashboard-outlined />{{ dateFormat(date) }}</a-text>
        </div>
        <span style="right:600px; ">随机测试模块：{{randomtype()}}</span>
        <div style="font-size: 25px;white-space: nowrap">
          <span v-show="!show" class="count">计时器:{{ getCode() }}s</span>
          <span style="float: right;color: #ff0000" v-show="!show" class="count">建议时间:{{ shownum(parseInt(wt_randomqus.length*10 / 60) % 60) }}:{{ shownum(wt.length % 60) }}s！</span>
        </div>s
        <a-progress
          :strokeWidth="17"
          stroke-linecap="square"
          :show-info="false"
          :percent="(number+1)*100/wt_randomqus.length"/>
        <span style="font-size: 18px">&nbsp;&nbsp; {{ number+1 }}/{{ wt_randomqus.length }}</span>
      </div>
      <br/>
      <!--      问题-->
      <div v-for="(ques,index) in wt_randomqus" :key="index">
        <div v-if="number === index">
          <div id="question" style="font-size: 25px">{{ ques }}</div>
          <br>
          <div id="answer">
            <div v-for="(ans,index1) in answer" :key="index1">
              <a-radio-group v-model="vlue" @change="onChange(index1+1)" >
                <a-radio :style="radioStyle" :value="index1+1" style="border: none;font-size: 25px ">
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
      handler () {
        // eslint-disable-next-line no-unused-vars
        // const random = this.random_access(5).toString()
        // for (let i = 0; i < this.tables.length; i++) {
        //   const temp = this.tables[i]
        //   if (temp.type === random) {
        //     this.wt = temp.wt
        //     this.title = temp.title
        //     this.answer = temp.answer
        //     this.nums = temp.wt.length
        //     break
        //   }
        // }
        // 确定因子
        // eslint-disable-next-line no-unused-vars
        const randomYinzi = this.random_access(9)
        this.yinzitype = randomYinzi
        const temps = this.yinzi[randomYinzi] // 因子类型
        // alert('因子类型' + temps)
        for (let i = 0; i < temps.length; i++) { // 遍历因子的各道题
          const tempss = temps[i]
          // alert('表单数' + tempss)
          const randomtype = this.random_access(4).toString()
          // alert('随机表单数' + randomtype)
          // eslint-disable-next-line no-unused-expressions
          for (let i = 0; i < this.tables.length; i++) {
            const temp = this.tables[i]
            // alert('获取题单' + temp + '哪个表' + temp.type.toString())
            if (temp.type === randomtype) {
              // alert('获取出来的表单信息' + temp.wt)
              this.wt = temp.wt
              this.wt_randomqus.push(this.wt[tempss - 1])
              // alert('准备放入随机的的题' + this.wt[tempss - 1])
              // alert('表单已有信息' + this.wt_randomqus)
              this.answer = temp.answer
              // this.nums = temp.wt_randomqus.length
              // alert(this.wt_randomqus)
              // break
            }
            // break
          }
          }
        this.nums = this.wt_randomqus.length
        alert('表单已有信息' + this.wt_randomqus)
          // for (let i = 0; i < temps.length; i++) {
          // }
        // }
        // 确定因子
      }
    }
  },
  data () {
    return {
      yinzitype: 0,
      // 因子项目
      yinzi: [
        [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58], // 躯体化共12项
        [3, 9, 10, 28, 38, 45, 46, 51, 55, 65], // 强迫症状共10项
        [6, 21, 34, 36, 37, 41, 61, 69, 73], // 人际关系敏感共9项
        [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79], // 抑郁共13项
        [2, 17, 23, 33, 39, 57, 72, 78, 80, 86], // 焦虑共10项
        [11, 24, 63, 67, 74, 81], // 敌对共6项
        [13, 25, 47, 50, 70, 75, 82], // 恐怖共7项
        [8, 18, 43, 68, 76, 83], // 偏执共6项
        [7, 16, 35, 62, 77, 84, 85, 87, 88, 90], // 精神病性共10项
        [19, 44, 59, 60, 64, 66, 89] // 其他共7项
      ],
      wt_randomqus: [],
      // 因子项目
      resultplus: 0,
      lastvalue: '',
      show: true, // 计时器所用属性
      count: '', // 计时器所用属性
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
          type: '1',
          title: 'SCL-90 90题',
          wt: [
            '1. 头痛',
            '2.神经过敏,感到不踏实',
            '3.头脑中有不必要的想法或字句盘旋',
            '4.头晕或晕倒',
            '5.对异性的兴趣减退',
            '6. 对旁人责备求全',
            '7.感到别人能控制你的思想',
            '8.责怪别人制造麻烦',
            '9.忘记性大',
            '10.担心自己的衣饰整齐及仪表的端正',
            '11.容易烦恼或激动',
            '12.胸痛',
            '13.害怕空旷的场所或街道',
            '14.感到自己的精力下降,活动减慢',
            '15.想结束自己的生命',
            '16.听到旁人听不到的声音',
            '17.发抖',
            '18.感到大多数人都不可信任',
            '19.胃口不好',
            '20.容易哭泣',
            '21.同异性相处时感到害羞不自在',
            '22.感到受骗,中了圈套或有人想抓住你',
            '23.无缘无故的突然感到害怕',
            '24.自己不能控制的大发脾气',
            '25.怕单独出门',
            '26.经常责备自己.',
            '27.腰痛',
            '28.感到难以完成任务',
            '29.感到孤独',
            '30.感到苦闷',
            '31.过分担忧',
            '32.对事物不感兴趣',
            '33.感到害怕',
            '34.你的情感容易受到伤害',
            '35.旁人能知道你的私下想法',
            '36.感到别人不理解您,不同情您',
            '37.感到人们对您不友好,不喜欢您',
            '38.做事必须做得很慢以确保正确',
            '39.心跳得很厉害',
            '40.恶心或胃部不舒服',
            '41.感到比不上他人',
            '42.肌肉酸痛',
            '43.感到有人在监视您,谈论您',
            '44.难以入睡',
            '45.做事必须反复检查',
            '46.难以做出决定',
            '47.怕乘电车,公共汽车,地铁或火车',
            '48.呼吸有困难',
            '49.一阵阵发热或发冷',
            '50.因为感到害怕而避开某些东西，场合或活动',
            '51.脑子变空了',
            '52.身体发麻或刺痛',
            '53.喉咙有梗塞感',
            '54.感到前途没有希望',
            '55.不能集中精神',
            '56.感到身体的某一部分软弱无力',
            '57.感到紧张或容易紧张',
            '58.感到手或脚发重',
            '59.想到死亡的事',
            '60.吃得太多',
            '61.当别人看着您或谈论您时感到不自在',
            '62.有- -些不属于您的想法',
            '63.有想打人或伤害他人的冲动',
            '64.醒的太早',
            '65.必须反复洗手,点数',
            '66.睡得不稳不深',
            '67.有想摔坏或破坏东西的想法',
            '68.有一些别人没有的想法',
            '69.感到对别人神经过敏',
            '70.在商店或电影院等人多的地方感到不自在',
            '71.感到任何事情都很困难',
            '72. -阵阵恐惧或惊恐',
            '73.感到公共场合吃东西很不舒服',
            '74.经常与人争论',
            '75.单独一认时神经紧张',
            '76.别人对您的成绩没有做出恰当的评价',
            '77.即使和别人在- -起也感到孤单',
            '78.感到坐立不安心神不定',
            '79.感到自己没有什么价值',
            '80.感到熟悉的东西变得陌生或不像真的',
            '81.大叫或摔东西',
            '82.害怕会在公共场合晕倒',
            '83.感到别人想占您的便宜',
            '84.为--些有关性的想法而很苦恼',
            '85.您认为应该因为自己的过错而受到惩罚',
            '86.感到要很快把事情做完',
            '87.感到自己的身体有严重问题',
            '88.从未感到和其他人很亲近',
            '89.感到自己有罪',
            '90.感到自己的脑子有毛病'
  ],
          answer: [
            '没有',
            '很轻',
            '中等',
            '偏重',
            '严重'
          ]
        },
        {
          type: '2',
          title: 'SCL-90 90题',
          wt: [
            '1. 头痛',
            '2.神经过敏,感到不踏实',
            '3.头脑中有不必要的想法或字句盘旋',
            '4.头晕或晕倒',
            '5.对异性的兴趣减退',
            '6. 对旁人责备求全',
            '7.感到别人能控制你的思想',
            '8.责怪别人制造麻烦',
            '9.忘记性大',
            '10.担心自己的衣饰整齐及仪表的端正',
            '11.容易烦恼或激动',
            '12.胸痛',
            '13.害怕空旷的场所或街道',
            '14.感到自己的精力下降,活动减慢',
            '15.想结束自己的生命',
            '16.听到旁人听不到的声音',
            '17.发抖',
            '18.感到大多数人都不可信任',
            '19.胃口不好',
            '20.容易哭泣',
            '21.同异性相处时感到害羞不自在',
            '22.感到受骗,中了圈套或有人想抓住你',
            '23.无缘无故的突然感到害怕',
            '24.自己不能控制的大发脾气',
            '25.怕单独出门',
            '26.经常责备自己.',
            '27.腰痛',
            '28.感到难以完成任务',
            '29.感到孤独',
            '30.感到苦闷',
            '31.过分担忧',
            '32.对事物不感兴趣',
            '33.感到害怕',
            '34.你的情感容易受到伤害',
            '35.旁人能知道你的私下想法',
            '36.感到别人不理解您,不同情您',
            '37.感到人们对您不友好,不喜欢您',
            '38.做事必须做得很慢以确保正确',
            '39.心跳得很厉害',
            '40.恶心或胃部不舒服',
            '41.感到比不上他人',
            '42.肌肉酸痛',
            '43.感到有人在监视您,谈论您',
            '44.难以入睡',
            '45.做事必须反复检查',
            '46.难以做出决定',
            '47.怕乘电车,公共汽车,地铁或火车',
            '48.呼吸有困难',
            '49.一阵阵发热或发冷',
            '50.因为感到害怕而避开某些东西，场合或活动',
            '51.脑子变空了',
            '52.身体发麻或刺痛',
            '53.喉咙有梗塞感',
            '54.感到前途没有希望',
            '55.不能集中精神',
            '56.感到身体的某一部分软弱无力',
            '57.感到紧张或容易紧张',
            '58.感到手或脚发重',
            '59.想到死亡的事',
            '60.吃得太多',
            '61.当别人看着您或谈论您时感到不自在',
            '62.有- -些不属于您的想法',
            '63.有想打人或伤害他人的冲动',
            '64.醒的太早',
            '65.必须反复洗手,点数',
            '66.睡得不稳不深',
            '67.有想摔坏或破坏东西的想法',
            '68.有一些别人没有的想法',
            '69.感到对别人神经过敏',
            '70.在商店或电影院等人多的地方感到不自在',
            '71.感到任何事情都很困难',
            '72. -阵阵恐惧或惊恐',
            '73.感到公共场合吃东西很不舒服',
            '74.经常与人争论',
            '75.单独一认时神经紧张',
            '76.别人对您的成绩没有做出恰当的评价',
            '77.即使和别人在- -起也感到孤单',
            '78.感到坐立不安心神不定',
            '79.感到自己没有什么价值',
            '80.感到熟悉的东西变得陌生或不像真的',
            '81.大叫或摔东西',
            '82.害怕会在公共场合晕倒',
            '83.感到别人想占您的便宜',
            '84.为--些有关性的想法而很苦恼',
            '85.您认为应该因为自己的过错而受到惩罚',
            '86.感到要很快把事情做完',
            '87.感到自己的身体有严重问题',
            '88.从未感到和其他人很亲近',
            '89.感到自己有罪',
            '90.感到自己的脑子有毛病'
          ],
          answer: [
            '没有',
            '很轻',
            '中等',
            '偏重',
            '严重'
          ]
        },
        {
          type: '3',
          title: 'SCL-90 90题',
          wt: [
            '1. 头痛',
            '2.神经过敏,感到不踏实',
            '3.头脑中有不必要的想法或字句盘旋',
            '4.头晕或晕倒',
            '5.对异性的兴趣减退',
            '6. 对旁人责备求全',
            '7.感到别人能控制你的思想',
            '8.责怪别人制造麻烦',
            '9.忘记性大',
            '10.担心自己的衣饰整齐及仪表的端正',
            '11.容易烦恼或激动',
            '12.胸痛',
            '13.害怕空旷的场所或街道',
            '14.感到自己的精力下降,活动减慢',
            '15.想结束自己的生命',
            '16.听到旁人听不到的声音',
            '17.发抖',
            '18.感到大多数人都不可信任',
            '19.胃口不好',
            '20.容易哭泣',
            '21.同异性相处时感到害羞不自在',
            '22.感到受骗,中了圈套或有人想抓住你',
            '23.无缘无故的突然感到害怕',
            '24.自己不能控制的大发脾气',
            '25.怕单独出门',
            '26.经常责备自己.',
            '27.腰痛',
            '28.感到难以完成任务',
            '29.感到孤独',
            '30.感到苦闷',
            '31.过分担忧',
            '32.对事物不感兴趣',
            '33.感到害怕',
            '34.你的情感容易受到伤害',
            '35.旁人能知道你的私下想法',
            '36.感到别人不理解您,不同情您',
            '37.感到人们对您不友好,不喜欢您',
            '38.做事必须做得很慢以确保正确',
            '39.心跳得很厉害',
            '40.恶心或胃部不舒服',
            '41.感到比不上他人',
            '42.肌肉酸痛',
            '43.感到有人在监视您,谈论您',
            '44.难以入睡',
            '45.做事必须反复检查',
            '46.难以做出决定',
            '47.怕乘电车,公共汽车,地铁或火车',
            '48.呼吸有困难',
            '49.一阵阵发热或发冷',
            '50.因为感到害怕而避开某些东西，场合或活动',
            '51.脑子变空了',
            '52.身体发麻或刺痛',
            '53.喉咙有梗塞感',
            '54.感到前途没有希望',
            '55.不能集中精神',
            '56.感到身体的某一部分软弱无力',
            '57.感到紧张或容易紧张',
            '58.感到手或脚发重',
            '59.想到死亡的事',
            '60.吃得太多',
            '61.当别人看着您或谈论您时感到不自在',
            '62.有- -些不属于您的想法',
            '63.有想打人或伤害他人的冲动',
            '64.醒的太早',
            '65.必须反复洗手,点数',
            '66.睡得不稳不深',
            '67.有想摔坏或破坏东西的想法',
            '68.有一些别人没有的想法',
            '69.感到对别人神经过敏',
            '70.在商店或电影院等人多的地方感到不自在',
            '71.感到任何事情都很困难',
            '72. -阵阵恐惧或惊恐',
            '73.感到公共场合吃东西很不舒服',
            '74.经常与人争论',
            '75.单独一认时神经紧张',
            '76.别人对您的成绩没有做出恰当的评价',
            '77.即使和别人在- -起也感到孤单',
            '78.感到坐立不安心神不定',
            '79.感到自己没有什么价值',
            '80.感到熟悉的东西变得陌生或不像真的',
            '81.大叫或摔东西',
            '82.害怕会在公共场合晕倒',
            '83.感到别人想占您的便宜',
            '84.为--些有关性的想法而很苦恼',
            '85.您认为应该因为自己的过错而受到惩罚',
            '86.感到要很快把事情做完',
            '87.感到自己的身体有严重问题',
            '88.从未感到和其他人很亲近',
            '89.感到自己有罪',
            '90.感到自己的脑子有毛病'
          ],
          answer: [
            '没有',
            '很轻',
            '中等',
            '偏重',
            '严重'
          ]
        },
        {
          type: '4',
          title: 'SCL-90 90题',
          wt: [
            '1. 头痛',
            '2.神经过敏,感到不踏实',
            '3.头脑中有不必要的想法或字句盘旋',
            '4.头晕或晕倒',
            '5.对异性的兴趣减退',
            '6. 对旁人责备求全',
            '7.感到别人能控制你的思想',
            '8.责怪别人制造麻烦',
            '9.忘记性大',
            '10.担心自己的衣饰整齐及仪表的端正',
            '11.容易烦恼或激动',
            '12.胸痛',
            '13.害怕空旷的场所或街道',
            '14.感到自己的精力下降,活动减慢',
            '15.想结束自己的生命',
            '16.听到旁人听不到的声音',
            '17.发抖',
            '18.感到大多数人都不可信任',
            '19.胃口不好',
            '20.容易哭泣',
            '21.同异性相处时感到害羞不自在',
            '22.感到受骗,中了圈套或有人想抓住你',
            '23.无缘无故的突然感到害怕',
            '24.自己不能控制的大发脾气',
            '25.怕单独出门',
            '26.经常责备自己.',
            '27.腰痛',
            '28.感到难以完成任务',
            '29.感到孤独',
            '30.感到苦闷',
            '31.过分担忧',
            '32.对事物不感兴趣',
            '33.感到害怕',
            '34.你的情感容易受到伤害',
            '35.旁人能知道你的私下想法',
            '36.感到别人不理解您,不同情您',
            '37.感到人们对您不友好,不喜欢您',
            '38.做事必须做得很慢以确保正确',
            '39.心跳得很厉害',
            '40.恶心或胃部不舒服',
            '41.感到比不上他人',
            '42.肌肉酸痛',
            '43.感到有人在监视您,谈论您',
            '44.难以入睡',
            '45.做事必须反复检查',
            '46.难以做出决定',
            '47.怕乘电车,公共汽车,地铁或火车',
            '48.呼吸有困难',
            '49.一阵阵发热或发冷',
            '50.因为感到害怕而避开某些东西，场合或活动',
            '51.脑子变空了',
            '52.身体发麻或刺痛',
            '53.喉咙有梗塞感',
            '54.感到前途没有希望',
            '55.不能集中精神',
            '56.感到身体的某一部分软弱无力',
            '57.感到紧张或容易紧张',
            '58.感到手或脚发重',
            '59.想到死亡的事',
            '60.吃得太多',
            '61.当别人看着您或谈论您时感到不自在',
            '62.有- -些不属于您的想法',
            '63.有想打人或伤害他人的冲动',
            '64.醒的太早',
            '65.必须反复洗手,点数',
            '66.睡得不稳不深',
            '67.有想摔坏或破坏东西的想法',
            '68.有一些别人没有的想法',
            '69.感到对别人神经过敏',
            '70.在商店或电影院等人多的地方感到不自在',
            '71.感到任何事情都很困难',
            '72. -阵阵恐惧或惊恐',
            '73.感到公共场合吃东西很不舒服',
            '74.经常与人争论',
            '75.单独一认时神经紧张',
            '76.别人对您的成绩没有做出恰当的评价',
            '77.即使和别人在- -起也感到孤单',
            '78.感到坐立不安心神不定',
            '79.感到自己没有什么价值',
            '80.感到熟悉的东西变得陌生或不像真的',
            '81.大叫或摔东西',
            '82.害怕会在公共场合晕倒',
            '83.感到别人想占您的便宜',
            '84.为--些有关性的想法而很苦恼',
            '85.您认为应该因为自己的过错而受到惩罚',
            '86.感到要很快把事情做完',
            '87.感到自己的身体有严重问题',
            '88.从未感到和其他人很亲近',
            '89.感到自己有罪',
            '90.感到自己的脑子有毛病'
          ],
          answer: [
            '没有',
            '很轻',
            '中等',
            '偏重',
            '严重'
          ]
        },
        {
          type: '5',
          title: 'SCL-90 90题',
          wt: [
            '1. 头痛',
            '2.神经过敏,感到不踏实',
            '3.头脑中有不必要的想法或字句盘旋',
            '4.头晕或晕倒',
            '5.对异性的兴趣减退',
            '6. 对旁人责备求全',
            '7.感到别人能控制你的思想',
            '8.责怪别人制造麻烦',
            '9.忘记性大',
            '10.担心自己的衣饰整齐及仪表的端正',
            '11.容易烦恼或激动',
            '12.胸痛',
            '13.害怕空旷的场所或街道',
            '14.感到自己的精力下降,活动减慢',
            '15.想结束自己的生命',
            '16.听到旁人听不到的声音',
            '17.发抖',
            '18.感到大多数人都不可信任',
            '19.胃口不好',
            '20.容易哭泣',
            '21.同异性相处时感到害羞不自在',
            '22.感到受骗,中了圈套或有人想抓住你',
            '23.无缘无故的突然感到害怕',
            '24.自己不能控制的大发脾气',
            '25.怕单独出门',
            '26.经常责备自己.',
            '27.腰痛',
            '28.感到难以完成任务',
            '29.感到孤独',
            '30.感到苦闷',
            '31.过分担忧',
            '32.对事物不感兴趣',
            '33.感到害怕',
            '34.你的情感容易受到伤害',
            '35.旁人能知道你的私下想法',
            '36.感到别人不理解您,不同情您',
            '37.感到人们对您不友好,不喜欢您',
            '38.做事必须做得很慢以确保正确',
            '39.心跳得很厉害',
            '40.恶心或胃部不舒服',
            '41.感到比不上他人',
            '42.肌肉酸痛',
            '43.感到有人在监视您,谈论您',
            '44.难以入睡',
            '45.做事必须反复检查',
            '46.难以做出决定',
            '47.怕乘电车,公共汽车,地铁或火车',
            '48.呼吸有困难',
            '49.一阵阵发热或发冷',
            '50.因为感到害怕而避开某些东西，场合或活动',
            '51.脑子变空了',
            '52.身体发麻或刺痛',
            '53.喉咙有梗塞感',
            '54.感到前途没有希望',
            '55.不能集中精神',
            '56.感到身体的某一部分软弱无力',
            '57.感到紧张或容易紧张',
            '58.感到手或脚发重',
            '59.想到死亡的事',
            '60.吃得太多',
            '61.当别人看着您或谈论您时感到不自在',
            '62.有- -些不属于您的想法',
            '63.有想打人或伤害他人的冲动',
            '64.醒的太早',
            '65.必须反复洗手,点数',
            '66.睡得不稳不深',
            '67.有想摔坏或破坏东西的想法',
            '68.有一些别人没有的想法',
            '69.感到对别人神经过敏',
            '70.在商店或电影院等人多的地方感到不自在',
            '71.感到任何事情都很困难',
            '72. -阵阵恐惧或惊恐',
            '73.感到公共场合吃东西很不舒服',
            '74.经常与人争论',
            '75.单独一认时神经紧张',
            '76.别人对您的成绩没有做出恰当的评价',
            '77.即使和别人在- -起也感到孤单',
            '78.感到坐立不安心神不定',
            '79.感到自己没有什么价值',
            '80.感到熟悉的东西变得陌生或不像真的',
            '81.大叫或摔东西',
            '82.害怕会在公共场合晕倒',
            '83.感到别人想占您的便宜',
            '84.为--些有关性的想法而很苦恼',
            '85.您认为应该因为自己的过错而受到惩罚',
            '86.感到要很快把事情做完',
            '87.感到自己的身体有严重问题',
            '88.从未感到和其他人很亲近',
            '89.感到自己有罪',
            '90.感到自己的脑子有毛病'
          ],
          answer: [
            '没有',
            '很轻',
            '中等',
            '偏重',
            '严重'
          ]
        }
      ],
      title: '',
      wt: [],
      answer: []
    }
  },
  methods: {
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
      // eslint-disable-next-line no-undef
      this.lastvalue = val
      await this.sleep(1)
      console.log('radio checked', this.value)
      // alert('到onchange')
      this.isAble = false
      this.result = this.result + val
      if (this.number === (this.nums - 1)) {
        // todo 将结果传入后端
          this.computefunction()
        // 作假判断
        if (this.getCode() >= this.wt_randomqus.length * 10) {
          alert(this.result)
          // if (this.result > 40) {
            // alert('焦虑！！！！！')
            this.reset()
            this.$emit('change', 'table-index', val)
          // }
        } else {
          alert('存在作假测试！')
        }
      } else {
        this.number++
        this.value = ''
      }
    },
    // 计算方法分类
    computefunction () {
      if (this.yinzitype === 0) {
        this.resultplus = this.result
        if (this.resultplus > 36) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 36 && this.resultplus >= 24) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 24) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 1) {
        this.resultplus = this.result
        if (this.resultplus > 30) {
          alert('强迫症状较明显')
        } else if (this.resultplus <= 30 && this.resultplus >= 20) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 20) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 2) {
        this.resultplus = this.result
        if (this.resultplus > 27) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 27 && this.resultplus >= 18) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 18) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 3) {
        this.resultplus = this.result
        if (this.resultplus > 39) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 39 && this.resultplus >= 26) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 26) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 4) {
        this.resultplus = this.result
        if (this.resultplus > 30) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 30 && this.resultplus >= 20) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 20) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 5) {
        this.resultplus = this.result
        if (this.resultplus > 18) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 18 && this.resultplus >= 12) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 12) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 6) {
        this.resultplus = this.result
        if (this.resultplus > 21) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 21 && this.resultplus >= 14) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 14) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 7) {
        this.resultplus = this.result
        if (this.resultplus > 18) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 18 && this.resultplus >= 12) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 12) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 8) {
        this.resultplus = this.result
        if (this.resultplus > 30) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 30 && this.resultplus >= 20) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 20) {
          alert('躯体症状表现不明显')
        }
      }
      if (this.yinzitype === 9) {
        this.resultplus = this.result
        if (this.resultplus > 36) {
          alert('个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状')
        } else if (this.resultplus <= 36 && this.resultplus >= 24) {
          alert('个体存在不适感但不明显')
        } else if (this.resultplus < 24) {
          alert('躯体症状表现不明显')
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
      this.$emit('change', 'table-index')
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
    random_access (val) {
      // eslint-disable-next-line no-unused-vars
      const val1 = Math.round(Math.random() * val)
      return val1
    },
    randomtype () {
      if (this.yinzitype === 0) { return '躯体化' }
      if (this.yinzitype === 1) { return '强迫症状' }
      if (this.yinzitype === 2) { return '人际关系敏感' }
      if (this.yinzitype === 3) { return '抑郁' }
      if (this.yinzitype === 4) { return '焦虑' }
      if (this.yinzitype === 5) { return '敌对' }
      if (this.yinzitype === 6) { return '恐怖' }
      if (this.yinzitype === 7) { return '偏执' }
      if (this.yinzitype === 8) { return '精神病性' }
      if (this.yinzitype === 9) { return '其它项目 (睡眠、饮食等)' }
    }
  },
  mounted () {
    // 1. 获取题目
    // this.getTables()
    // 显示当前日期时间
    const _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style scoped>

</style>
