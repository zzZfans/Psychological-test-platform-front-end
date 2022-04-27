<template>
  <div>
    <a-modal v-model="visible" :maskClosable="false" on-ok="handleOk">
      <template slot="title">测前须知
        <a-icon type="sound" theme="twoTone" />
      </template>
      <slot name="content"></slot>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          已知悉
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import events from '@/components/MultiTab/events'

export default {
  data () {
    return {
      callerEnum: {
        VoiceQAEval: 'VoiceQAEval',
        other: 'other'
      },
      caller: null,
      loading: false,
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
     handleOk (e) {
      this.loading = true
      switch (this.caller) {
        case this.callerEnum.VoiceQAEval:
          events.$emit('VoiceQAEvalConfirm')
          break
        case this.callerEnum.other:
          console.log(2)
      }
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>
