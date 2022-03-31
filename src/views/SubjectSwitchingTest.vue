<template>
  <div style="width: 1000px">
    <a-radio-group v-model="mode" :style="{ marginBottom: '80px' }">
      <a-radio-button value="top">
        Horizontal
      </a-radio-button>
      <a-radio-button value="left">
        Vertical
      </a-radio-button>
      <a-button @click="addActive">123</a-button>
    </a-radio-group>

    <a-tabs
      default-active-key="1"
      :active-key="active"
      :tab-position="mode"
      :style="{ height: '2000px' }"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`"> Content of tab {{ i }} </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mode: 'top',
      active: 1
    }
  },
  methods: {
    callback (val) {
      console.log(val)
    },
    addActive () {
      ++this.active
    }
  }
}
</script>
