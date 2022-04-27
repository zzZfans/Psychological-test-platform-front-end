<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import { getUnreadCount } from '@/api/pushRecord'

export default {
  data () {
    return {
    }
  },
  methods: {
    getMessage () {
      setInterval(() => {
          getUnreadCount().then(res => {
            if (res.success) {
              this.g_data.unreadCount = res.result
            }
          })
      }, 10000)
    }
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${domTitle} - ${i18nRender(title)}`))

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  },
  created () {
    this.getMessage()
  }
}
</script>
