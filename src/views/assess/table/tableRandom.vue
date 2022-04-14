<template>
  <page-header-wrapper>
    <a-modal
v-model="modal2Visible"
      title="测试结果展示"
      centered
      @ok="modal2Visible = false"
    >
      <p>{{ this.access_results }}</p>
    </a-modal>
    <a-card class="ant-pro-pages-list-projects-cardList">
      <!--      进度条-->
      <div style=" width: 90%;white-space: nowrap ">
        <div >
          <a-text style="text-align:center;" type="primary"><dashboard-outlined />{{ dateFormat(date) }}</a-text>
        </div>
        <span style="right:600px; ">随机测试模块：{{ randomtype() }}</span>样
        <div style="font-size: 25px;white-space: nowrap">
          <span v-show="!show" class="count">计时器:{{ getCode() }}s</span>
          <span style="float: right;color: #ff0000" v-show="!show" class="count">建议时间:{{ shownum(parseInt(wt_randomqus.length*10 / 60) % 60) }}:{{ shownum(wt.length % 60) }}s！</span>
        </div>
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
          <div id="question" style="font-size: 25px">{{ index+1 }}、{{ ques }}</div>
          <br>
          <div id="answer">
            <div v-for="(ans,index1) in answer" :key="index1">
              <a-radio-group v-model="value" @change="onChange(index1+1)" >
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
        // alert('表单已有信息' + this.wt_randomqus)
          // for (let i = 0; i < temps.length; i++) {
          // }
        // }
        // 确定因子
      }
    }
  },
  data () {
    return {
      // 测试结果
      visible: false,
      modal1Visible: false,
      modal2Visible: false,
      access_results: '',
      // 测试结果
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
          type: '0',
          title: 'SCL-90 90题',
          wt: [
            ' 头痛',
            '神经过敏,感到不踏实',
            '头脑中有不必要的想法或字句盘旋',
            '头晕或晕倒',
            '对异性的兴趣减退',
            '对旁人责备求全',
            '感到别人能控制你的思想',
            '责怪别人制造麻烦',
            '忘记性大',
            '担心自己的衣饰整齐及仪表的端正',
            '容易烦恼或激动',
            '胸痛',
            '害怕空旷的场所或街道',
            '感到自己的精力下降,活动减慢',
            '想结束自己的生命',
            '听到旁人听不到的声音',
            '发抖',
            '感到大多数人都不可信任',
            '胃口不好',
            '容易哭泣',
            '同异性相处时感到害羞不自在',
            '感到受骗,中了圈套或有人想抓住你',
            '无缘无故的突然感到害怕',
            '自己不能控制的大发脾气',
            '怕单独出门',
            '经常责备自己.',
            '腰痛',
            '感到难以完成任务',
            '感到孤独',
            '感到苦闷',
            '过分担忧',
            '对事物不感兴趣',
            '感到害怕',
            '你的情感容易受到伤害',
            '旁人能知道你的私下想法',
            '感到别人不理解您,不同情您',
            '感到人们对您不友好,不喜欢您',
            '做事必须做得很慢以确保正确',
            '心跳得很厉害',
            '恶心或胃部不舒服',
            '感到比不上他人',
            '肌肉酸痛',
            '感到有人在监视您,谈论您',
            '难以入睡',
            '做事必须反复检查',
            '难以做出决定',
            '怕乘电车,公共汽车,地铁或火车',
            '呼吸有困难',
            '一阵阵发热或发冷',
            '因为感到害怕而避开某些东西，场合或活动',
            '脑子变空了',
            '身体发麻或刺痛',
            '喉咙有梗塞感',
            '感到前途没有希望',
            '不能集中精神',
            '感到身体的某一部分软弱无力',
            '感到紧张或容易紧张',
            '感到手或脚发重',
            '想到死亡的事',
            '吃得太多',
            '当别人看着您或谈论您时感到不自在',
            '有- -些不属于您的想法',
            '有想打人或伤害他人的冲动',
            '醒的太早',
            '必须反复洗手,点数',
            '睡得不稳不深',
            '有想摔坏或破坏东西的想法',
            '有一些别人没有的想法',
            '感到对别人神经过敏',
            '在商店或电影院等人多的地方感到不自在',
            '感到任何事情都很困难',
            '一阵阵恐惧或惊恐',
            '感到公共场合吃东西很不舒服',
            '经常与人争论',
            '单独一认时神经紧张',
            '别人对您的成绩没有做出恰当的评价',
            '即使和别人在- -起也感到孤单',
            '感到坐立不安心神不定',
            '感到自己没有什么价值',
            '感到熟悉的东西变得陌生或不像真的',
            '大叫或摔东西',
            '害怕会在公共场合晕倒',
            '感到别人想占您的便宜',
            '为--些有关性的想法而很苦恼',
            '您认为应该因为自己的过错而受到惩罚',
            '感到要很快把事情做完',
            '感到自己的身体有严重问题',
            '从未感到和其他人很亲近',
            '感到自己有罪',
            '感到自己的脑子有毛病'
  ], // 原题
          answer: [
            '没有',
            '很轻',
            '中等',
            '偏重',
            '严重'
          ]
        },
        {
          type: '1',
          title: 'SCL-90 90题',
          wt: [
            '头会痛',
            '神经会过敏,感到不踏实',
            '头脑有时会中有不必要的想法或字句盘旋',
            '会头晕或容易晕倒',
            '会对异性的有点兴趣减退',
            '会喜欢对旁人责备求全',
            '会感到别人能控制你的思想',
            '心理会责怪别人制造麻烦',
            '做事情会忘记性大',
            '社交场合会担心自己的衣饰整齐及仪表的端正',
            '工作时会容易烦恼或激动',
            '胸会痛',
            '会害怕在空旷的场所或街道',
            '会感到自己的活力下降,活动减慢',
            '有过会想结束自己的生命',
            '会感觉听力很好',
            '会容易发抖',
            '会感到大多数人都不可信任',
            '胃口会不好',
            '会容易产生哭泣',
            '同异性相处时会感到害羞不自在',
            '会感到受骗,中了圈套或有人想抓住你',
            '会无缘无故的突然感到害怕',
            '自己对大发脾气不能控制',
            '会怕单独出门',
            '会经常责备自己.',
            '会腰痛',
            '会感到难以完成任务',
            '会感到孤独',
            '会感到苦闷',
            '会过分担忧',
            '会对事物不感兴趣',
            '会感到害怕',
            '你的情感会容易受到伤害',
            '旁人会能知道你的私下想法',
            '会感到别人不理解您,不同情您',
            '会感到人们对您不友好,不喜欢您',
            '做事会必须做得很慢以确保正确',
            '会心跳得很厉害',
            '会恶心或胃部不舒服',
            '会感到比不上他人',
            '肌肉有点酸痛',
            '会感到有人在监视您,谈论您',
            '会难以入睡',
            '做事会必须反复检查',
            '会难以做出决定',
            '会怕乘电车,公共汽车,地铁或火车',
            '会存在呼吸有困难',
            '会一阵阵发热或发冷',
            '会因为感到害怕而避开某些东西，场合或活动',
            '脑子会变空了',
            '身体会发麻或刺痛',
            '喉咙会有梗塞感',
            '会感到前途没有希望',
            '会不能集中精神',
            '会感到身体的某一部分软弱无力',
            '会感到紧张或容易紧张',
            '会感到手或脚发重',
            '会想到死亡的事',
            '会吃得太多',
            '当别人看着您或谈论您时会感到不自在',
            '会有一些不属于您的想法',
            '会有想打人或伤害他人的冲动',
            '醒的会太早',
            '会反复洗手,点数',
            '会睡得不稳不深',
            '会有想摔坏或破坏东西的想法',
            '会有一些别人没有的想法',
            '会感到对别人神经过敏',
            '会在商店或电影院等人多的地方感到不自在',
            '会感到任何事情都很困难',
            '会-阵阵恐惧或惊恐',
            '会感到公共场合吃东西很不舒服',
            '经常会与人争论',
            '单独一认时会神经紧张',
            '别人对您的成绩不会做出恰当的评价',
            '即使和别人在一起也会感到孤单',
            '会感到坐立不安心神不定',
            '会感到自己没有什么价值',
            '会感到熟悉的东西变得陌生或不像真的',
            '会大叫或摔东西',
            '会害怕会在公共场合晕倒',
            '会感到别人想占您的便宜',
            '会为--些有关性的想法而很苦恼',
            '您会认为应该因为自己的过错而受到惩罚',
            '会感到要很快把事情做完',
            '会感到自己的身体有严重问题',
            '会从未感到和其他人很亲近',
            '会感到自己有罪',
            '会感到自己的脑子有毛病'
          ], // 识别词“会”
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
            '头有点痛',
            '神经有点过敏,感到不踏实',
            '头脑中有点不必要的想法或字句盘旋',
            '头有点晕或晕倒',
            '对异性的兴趣有点减退',
            '对旁人有点责备求全',
            '感到别人有点能控制你的思想',
            '有点责怪别人制造麻烦',
            '忘记性有点大',
            '有点担心自己的衣饰整齐及仪表的端正',
            '有点容易烦恼或激动',
            '胸有点痛',
            '有点害怕空旷的场所或街道',
            '有点感到自己的精力下降,活动减慢',
            '有点想结束自己的生命',
            '有点听到旁人听不到的声音',
            '有点发抖',
            '有点感到大多数人都不可信任',
            '胃口有点不好',
            '有点容易哭泣',
            '同异性相处时有点感到害羞不自在',
            '有点感到受骗,中了圈套或有人想抓住你',
            '有点无缘无故的突然感到害怕',
            '自己不能有点控制的大发脾气',
            '有点怕单独出门',
            '有点经常责备自己.',
            '腰有点痛',
            '有点感到难以完成任务',
            '有点感到孤独',
            '有点感到苦闷',
            '有点过分担忧',
            '对事物有点不感兴趣',
            '有点感到害怕',
            '你的情感有点容易受到伤害',
            '旁人有点能知道你的私下想法',
            '有点感到别人不理解您,不同情您',
            '有点感到人们对您不友好,不喜欢您',
            '有点做事必须做得很慢以确保正确',
            '心跳有点厉害',
            '有点恶心或胃部不舒服',
            '有点感到比不上他人',
            '肌肉有点酸痛',
            '有点感到有人在监视您,谈论您',
            '有点难以入睡',
            '做事有点必须反复检查',
            '有点难以做出决定',
            '有点怕乘电车,公共汽车,地铁或火车',
            '呼吸有点困难',
            '有点一阵阵发热或发冷',
            '有点因为感到害怕而避开某些东西，场合或活动',
            '脑子有点变空了',
            '身体有点发麻或刺痛',
            '喉咙有点梗塞感',
            '有点感到前途没有希望',
            '有点不能集中精神',
            '有点感到身体的某一部分软弱无力',
            '有点感到紧张或容易紧张',
            '有点感到手或脚发重',
            '有点想到死亡的事',
            '吃得有点多',
            '当别人看着您或谈论您时有点感到不自在',
            '有点有一些不属于您的想法',
            '有点想打人或伤害他人的冲动',
            '醒的有点早',
            '有点必须反复洗手,点数',
            '有点睡得不稳不深',
            '有点想摔坏或破坏东西的想法',
            '有点别人没有的想法',
            '有点感到对别人神经过敏',
            '在商店或电影院等人多的地方有点感到不自在',
            '有点感到任何事情都很困难',
            '有点一阵阵恐惧或惊恐',
            '有点感到公共场合吃东西很不舒服',
            '经常与人有点争论',
            '单独一认时有点神经紧张',
            '别人对您的成绩没有做出恰当的评价，有点敷衍',
            '即使和别人在一起也有点感到孤单',
            '有点感到坐立不安心神不定',
            '有点感到自己没有什么价值',
            '有点感到熟悉的东西变得陌生或不像真的',
            '有点喜欢大叫或摔东西',
            '有点害怕会在公共场合晕倒',
            '有点感到别人想占您的便宜',
            '为一些有关性的想法有点苦恼',
            '您认为应该因为自己的过错而有点惩罚',
            '有点感到要很快把事情做完',
            '有点感到自己的身体有严重问题',
            '从未感到和其他人有点亲近',
            '有点感到自己有罪',
            '有点感到自己的脑子有毛病'
          ], // 识别词“有点”
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
            '头经常痛',
            '神经经常过敏,感到不踏实',
            '头脑中经常有不必要的想法或字句盘旋',
            '头经常晕或晕倒',
            '对异性的兴趣经常减退',
            '对旁人经常责备求全',
            '经常感到别人能控制你的思想',
            '经常责怪别人制造麻烦',
            '忘记性经常大',
            '经常担心自己的衣饰整齐及仪表的端正',
            '经常容易烦恼或激动',
            '胸经常痛',
            '经常害怕空旷的场所或街道',
            '经常感到自己的精力下降,活动减慢',
            '经常想结束自己的生命',
            '经常听到旁人听不到的声音',
            '经常发抖',
            '经常感到大多数人都不可信任',
            '经常胃口不好',
            '经常容易哭泣',
            '同异性相处时经常感到害羞不自在',
            '经常感到受骗,中了圈套或有人想抓住你',
            '经常无缘无故的突然感到害怕',
            '自己经常不能控制的大发脾气',
            '经常怕单独出门',
            '（经常）责备自己.',
            '腰经常痛',
            '经常感到难以完成任务',
            '经常感到孤独',
            '经常感到苦闷',
            '经常过分担忧',
            '对事物经常不感兴趣',
            '经常感到害怕',
            '你的情感经常容易受到伤害',
            '旁人经常能知道你的私下想法',
            '经常感到别人不理解您,不同情您',
            '经常感到人们对您不友好,不喜欢您',
            '做事经常必须做得很慢以确保正确',
            '心跳经常很厉害',
            '经常恶心或胃部不舒服',
            '经常感到比不上他人',
            '经常肌肉酸痛',
            '经常感到有人在监视您,谈论您',
            '经常难以入睡',
            '做事经常必须反复检查',
            '经常难以做出决定',
            '经常怕乘电车,公共汽车,地铁或火车',
            '呼吸经常困难',
            '经常一阵阵发热或发冷',
            '经常因为感到害怕而避开某些东西，场合或活动',
            '经常脑子变空了',
            '身体经常发麻或刺痛',
            '喉咙经常梗塞感',
            '经常感到前途没有希望',
            '经常不能集中精神',
            '经常感到身体的某一部分软弱无力',
            '经常感到紧张或容易紧张',
            '经常感到手或脚发重',
            '经常想到死亡的事',
            '经常吃得太多',
            '当别人看着您或谈论您时经常感到不自在',
            '经常有一些不属于您的想法',
            '经常有想打人或伤害他人的冲动',
            '经常醒的太早',
            '经常必须反复洗手,点数',
            '经常睡得不稳不深',
            '经常有想摔坏或破坏东西的想法',
            '经常有一些别人没有的想法',
            '经常感到对别人神经过敏',
            '经常在商店或电影院等人多的地方感到不自在',
            '经常感到任何事情都很困难',
            '经常感到阵阵恐惧或惊恐',
            '经常感到公共场合吃东西很不舒服',
            '（经常）与人争论',
            '单独一认时经常神经紧张',
            '别人对您的成绩经常没有做出恰当的评价',
            '即使和别人在一起也经常感到孤单',
            '经常感到坐立不安心神不定',
            '经常感到自己没有什么价值',
            '经常感到熟悉的东西变得陌生或不像真的',
            '经常大叫或摔东西',
            '经常害怕会在公共场合晕倒',
            '经常感到别人想占您的便宜',
            '经常为--些有关性的想法而很苦恼',
            '您认为应该经常因为自己的过错而受到惩罚',
            '经常感到要很快把事情做完',
            '经常感到自己的身体有严重问题',
            '经常感到和其他人很疏远',
            '经常感到自己有罪',
            '经常感到自己的脑子有毛病'
          ], // 识别词“经常”
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
            '头突然痛',
            '神经突然过敏,感到不踏实',
            '头脑突然中有不必要的想法或字句盘旋',
            '突然头晕或晕倒',
            '对异性的兴趣突然减退',
            '对旁人突然责备求全',
            '突然感到别人能控制你的思想',
            '突然责怪别人制造麻烦',
            '忘记性突然大',
            '突然担心自己的衣饰整齐及仪表的端正',
            '容易突然烦恼或激动',
            '突然胸痛',
            '突然害怕空旷的场所或街道',
            '突然感到自己的精力下降,活动减慢',
            '突然想结束自己的生命',
            '突然听到旁人听不到的声音',
            '突然发抖',
            '突然感到大多数人都不可信任',
            '胃口突然不好',
            '突然容易哭泣',
            '同异性相处时突然感到害羞不自在',
            '突然感到受骗,中了圈套或有人想抓住你',
            '无缘无故的（突然）感到害怕',
            '自己不能控制的突然大发脾气',
            '突然怕单独出门',
            '突然责备自己.',
            '突然腰痛',
            '突然感到难以完成任务',
            '突然感到孤独',
            '突然感到苦闷',
            '突然过分担忧',
            '对事物突然不感兴趣',
            '突然感到害怕',
            '你的情感突然受到伤害',
            '旁人突然能知道你的私下想法',
            '突然感到别人不理解您,不同情您',
            '突然感到人们对您不友好,不喜欢您',
            '突然做事必须做得很慢以确保正确',
            '心跳突然很厉害',
            '突然恶心或胃部不舒服',
            '突然感到比不上他人',
            '肌肉突然酸痛',
            '突然感到有人在监视您,谈论您',
            '突然难以入睡',
            '做事突然必须反复检查',
            '突然难以做出决定',
            '突然怕乘电车,公共汽车,地铁或火车',
            '突然呼吸有困难',
            '突然一阵阵发热或发冷',
            '因为感到害怕而突然避开某些东西，场合或活动',
            '脑子突然变空了',
            '身体突然发麻或刺痛',
            '喉咙突然梗塞感',
            '突然感到前途没有希望',
            '突然不能集中精神',
            '突然感到身体的某一部分软弱无力',
            '突然感到紧张或容易紧张',
            '突然感到手或脚发重',
            '突然想到死亡的事',
            '突然吃得太多',
            '当别人看着您或谈论您时突然感到不自在',
            '突然有一些不属于您的想法',
            '突然有想打人或伤害他人的冲动',
            '突然醒的太早',
            '突然反复洗手,点数',
            '突然睡得不稳不深',
            '突然有想摔坏或破坏东西的想法',
            '突然有一些别人没有的想法',
            '突然感到对别人神经过敏',
            '在商店或电影院等人多的地方突然感到不自在',
            '突然感到任何事情都很困难',
            '突然-阵阵恐惧或惊恐',
            '突然感到公共场合吃东西很不舒服',
            '突然与人争论',
            '单独一认时突然神经紧张',
            '别人对您的成绩做出突然恰当的评价',
            '即使和别人在一起也突然感到孤单',
            '突然感到坐立不安心神不定',
            '突然感到自己没有什么价值',
            '突然感到熟悉的东西变得陌生或不像真的',
            '突然大叫或摔东西',
            '突然害怕会在公共场合晕倒',
            '突然感到别人想占您的便宜',
            '突然为一些有关性的想法而很苦恼',
            '突然认为应该因为自己的过错而受到惩罚',
            '突然感到要很快把事情做完',
            '突然感到自己的身体有严重问题',
            '从未突然感到和其他人如此亲近',
            '突然感到自己有罪',
            '突然感到自己的脑子有毛病'
          ], // 识别词“突然”
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
    // 结果展示
    // showModal () {
    //   this.visible = true
    // },
    // handleCancel () {
    //   this.visible = false
    // },
    // handleOk () {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.loading = false
    //     this.visible = false
    //   }, 2000)
    // },
    // setModal1Visible () {
    //   this.modal1Visible = this.visible
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
        this.modal2Visible = true
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
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 36 && this.resultplus >= 24) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 24) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 1) {
        this.resultplus = this.result
        if (this.resultplus > 30) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 30 && this.resultplus >= 20) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 20) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 2) {
        this.resultplus = this.result
        if (this.resultplus > 27) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 27 && this.resultplus >= 18) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 18) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 3) {
        this.resultplus = this.result
        if (this.resultplus > 39) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 39 && this.resultplus >= 26) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 26) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 4) {
        this.resultplus = this.result
        if (this.resultplus > 30) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 30 && this.resultplus >= 20) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 20) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 5) {
        this.resultplus = this.result
        if (this.resultplus > 18) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 18 && this.resultplus >= 12) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 12) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 6) {
        this.resultplus = this.result
        if (this.resultplus > 21) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 21 && this.resultplus >= 14) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 14) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 7) {
        this.resultplus = this.result
        if (this.resultplus > 18) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 18 && this.resultplus >= 12) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 12) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 8) {
        this.resultplus = this.result
        if (this.resultplus > 30) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 30 && this.resultplus >= 20) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 20) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        }
      }
      if (this.yinzitype === 9) {
        this.resultplus = this.result
        if (this.resultplus > 36) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus <= 36 && this.resultplus >= 24) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
        } else if (this.resultplus < 24) {
          this.access_results = '个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状'
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
