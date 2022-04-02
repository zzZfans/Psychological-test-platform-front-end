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
            <a-button style="left: 60%">
              <a :href="toTable(item.type)">开始测试</a>
            </a-button>
          </a-card>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
export default {
  name: 'Table',
  mixins: [baseMixin],
  data () {
    return {
      data: [
        {
          title: '焦虑自评量表',
          type: '1',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sas用于焦虑测试'
        },
        {
          title: '焦虑自评量表',
          type: '2',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sas用于焦虑测试'
        },
        {
          title: '焦虑自评量表',
          type: '3',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sas用于焦虑测试'
        },
        {
          title: '焦虑自评量表',
          type: '4',
          cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
          description: 'sas用于焦虑测试'
        }
      ]
      // loading: true
    }
  },
  methods: {
    toTable (val) {
      return '/assess/table?type=' + val
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
