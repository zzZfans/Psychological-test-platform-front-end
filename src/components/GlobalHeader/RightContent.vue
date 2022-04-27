<template>
  <div :class="wrpCls">
    <!-- 摄像头 -->
    <camera-dropdown ref="camera-dropdown" v-if="cameraDropdownVisible" :class="prefixCls"></camera-dropdown>
    <!-- 用户 -->
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <!-- 语言切换 -->
    <select-lang :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import CameraDropdown from '@/components/GlobalHeader/CameraDropdown'
import events from '@/components/MultiTab/events'

export default {
  name: 'RightContent',
  components: {
    CameraDropdown,
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {},
      cameraDropdownVisible: false
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: 'Serati Ma'
      }
    }, 1500)

    // 监听打开摄像头消息
    events.$on('openCamera', (caller, isNeedAudio) => {
      this.cameraDropdownVisible = true
      this.$nextTick(() => {
        this.$refs['camera-dropdown'].setCaller(caller)
        this.$refs['camera-dropdown'].cameraStartup(isNeedAudio)
      })
    })

    // 监听关闭摄像头消息
    events.$on('closeCamera', () => {
      this.cameraDropdownVisible = false
    })
  },
  methods: {

  }
}
</script>
