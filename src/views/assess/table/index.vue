<template>
  <page-header-wrapper>
    <a-card class="ant-pro-pages-list-projects-cardList">
      <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable>
            <img slot="cover" :src="item.cover" :alt="item.title"/>
            <a-card-meta :title="item.title">
              <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template>
            </a-card-meta>
            <a-button style="left: 60%" type="primary" @click="toTable(item.type)">
              开始测试
            </a-button>
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.'
  )
}
export default {
  name: 'Table',
  data () {
    return {
      data: [
        {
          title: '焦虑自评量表',
          type: 'sas',
          cover: 'http://www.amosdzhn.space:9000/mentalhealth/69f2f078-9011-442b-80a7-696a7a118543/blob',
          description: 'sas用于焦虑测试'
        },
        {
          title: '抑郁自评量表',
          type: 'sds',
          cover: 'http://www.amosdzhn.space:9000/mentalhealth/41f295b8-bd58-45fa-a7b5-3d112deaab57/blob',
          description: 'sds用于抑郁测试'
        },
        {
          title: '双相情感障碍测试',
          type: 'mdq',
          cover: 'http://www.amosdzhn.space:9000/mentalhealth/2d05a831-8196-4945-9b00-52f0569ca814/blob',
          description: 'mdq用于双相感情障碍测试'
        },
        {
          title: '轻躁狂症自测表',
          type: 'HCL-32',
          cover: 'http://www.amosdzhn.space:9000/mentalhealth/de1bc4c9-f14b-47a4-bb56-eb9c036b8950/blob',
          description: 'sas用于轻躁狂症测试'
        }
      ]
      // loading: true
    }
  },
  methods: {
    toTable (val) {
      const key = `open${Date.now()}`
      this.$notification.open({
        message: '温馨提示',
        description:
          '请认真填写本次心理测试，禁止出现连续选相同选项，本系统将三次警告，警告次数完后将会自动退出测试，每道题建议时间为20秒！',
        style: {
          width: '600px',
          marginLeft: `${-850}px`,
          marginTop: `${300}px`
        },
        btn: h => {
          return h(
            'a-button',
            {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => this.$notification.close(key)
              }
            },
            '已悉知。'
          )
        },
        key,
        onClose: close
      })
      this.$emit('change', 'table-pro', val)
    }
  }
  // mounted () {
  //   this.getList()
  // },
  // methods: {
  //   handleChange (value) {
  //     console.log(`selected ${value}`)
  //   },
  //   getList () {
  //     this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
  //       console.log('res', res)
  //       this.data = res.result
  //       this.loading = false
  //     })
  //   }
  // }
}
</script>

<style lang="less" scoped>

.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, .45);
}

.heading {
  color: rgba(0, 0, 0, .85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, .25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .text {

  }
  .status-list {
    text-align: left;
  }
}
</style>
