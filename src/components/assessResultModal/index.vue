<template>
  <div>
    <a-modal
      v-model="visible"
      :maskClosable="false"
      :closable="false"
      :width="1000"
      :keyboard="false"
      @cancel="handleCancel">
      <template slot="title">
        <a-icon type="file-text" theme="twoTone" /> 测试结果
      </template>
      <slot name="content"></slot>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" @click="handleOk">
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
    handleOk (e) {
      this.visible = false
      events.$emit('ConfirmDeclaration' + this.caller)
    },
    handleCancel (e) {
      console.log('handleCancel')
      this.visible = false
      events.$emit('CancelDeclaration' + this.caller)
    }
  }
}
</script>
