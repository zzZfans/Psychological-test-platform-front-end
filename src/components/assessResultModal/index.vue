<template>
  <div>
    <a-modal
      v-model="visible"
      :maskClosable="false"
      :closable="false"
      :width="1000"
      :keyboard="false">
      <template slot="title">
        <a-icon type="file-text" theme="twoTone" />
        测试报告
      </template>
      <slot name="content"></slot>
      <template slot="footer">
        <a-button type="primary" @click="assessAgain">
          再测一次
        </a-button>
        <a-button type="primary" @click="gotoDashboard">
          返回首页
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>

export default {
  data () {
    return {
      caller: null,
      visible: false
    }
  },
  created () {
  },
  methods: {
    showModal (caller) {
      this.visible = true
      this.caller = caller
    },
    assessAgain () {
      location.reload()
    },
    gotoDashboard () {
      this.$router.push({ path: '/dashboard/info' })
    }
  }
}
</script>
