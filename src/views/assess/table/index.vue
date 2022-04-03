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
            <a-button style="left: 60%" @click="toTable(item.type)">
              开始测试
            </a-button>
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      data: [
        {
          title: '焦虑自评量表',
          type: 'sas',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sas用于焦虑测试'
        },
        {
          title: '抑郁自评量表',
          type: 'sds',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sds用于抑郁测试'
        },
        {
          title: '双相情感障碍测试',
          type: 'mdq',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'mdq用于双相感情障碍测试'
        },
        {
          title: '轻躁狂症自测表',
          type: 'HCL-32',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sas用于轻躁狂症测试'
        }
      ]
      // loading: true
    }
  },
  methods: {
    toTable (val) {
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
