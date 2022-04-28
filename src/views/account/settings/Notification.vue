<template>
  <div>
    <a-list :data-source="data" :pagination="pagination">
      <template #renderItem="item">
        <a-list-item>
          <a-list-item-meta
          >
            <template #title>
              <a v-on:click="readMessage(item)">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-badge :dot="item.status === 0 ? 1 : 0">
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </a-badge>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <a-modal v-model="modalVisible" :title="modalTitle" @ok="handleOk">
      <p v-html="modalData"></p>
    </a-modal>
  </div>
</template>

<script>
import { getPushMessagePage, readMessage } from '@/api/pushRecord'
export default {
  data () {
    return {
      data: [],
      total: 0,
      modalVisible: false,
      modalTitle: '',
      modalData: '',
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: (total) => `共${total}条数据`,
        onShowSizeChange: this.pageSizeChange,
        onChange: this.pageChange

      }
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 10) + '...'
      }
      return value
    }
  },
  methods: {
    handleCancel () {
      this.modalVisible = false
    },
    handleOk () {
      this.modalVisible = false
    },
    readMessage (item) {
      this.modalVisible = true
      this.modalTitle = item.title
      this.modalData = item.message
      if (item.status === 0) {
        readMessage(item.id).then(res => {
          if (res.success) {
            const temp = this.g_data.unreadCount
            this.g_data.unreadCount = temp - 1
          }
        })
      }
    },
    pageSizeChange (pageNum) {
      this.loading = true
      this.pagination.pageSize = pageNum
      this.pagination.current = 1
      this.getPushMessagePage()
    },
    pageChange (page) {
      this.pagination.current = page
      this.getPushMessagePage()
    },
    getPushMessagePage () {
      const data = {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      getPushMessagePage(data).then(res => {
        if (res.success) {
          this.data = res.result.records
          this.total = res.result.total
          this.pagination.total = this.total
        }
      })
    }
  },
  created () {
    this.g_bus.$on('watch_unreadCount', () => {
      // 具体函数内容
      this.count = this.g_data.unreadCount
      this.getPushMessagePage()
    })
    this.getPushMessagePage()
  }
}
</script>

<style scoped>

</style>
