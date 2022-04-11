<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="title"
    :sub-title="description">

    <template #extra>
      <!--<a-button size="large" type="primary">查看邮箱</a-button>-->
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">去登录</a-button>
    </template>

  </a-result>
</template>

<script>
export default {
  name: 'RegisterResult',
  data () {
    return {
      description: '欢迎━(*｀∀´*)ノ亻!',
      form: {}
    }
  },
  computed: {
    title () {
      const v = this.form && this.form.username || 'xxx'
      return `您的账户：${v} 注册成功`
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
