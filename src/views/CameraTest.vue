<template>
  <div>
    <a-button @click="openCamera">openCamera</a-button>
    <a-button @click="closeCamera">closeCamera</a-button>
  </div>

</template>

<script>
import events from '@/components/MultiTab/events'

export default {
  name: 'CameraTest',
  data () {
    return {
    }
  },
  mounted () {

  },
  destroyed () {
  },
  methods: {
    openCamera () {
      events.$emit('openCamera')
    },
    closeCamera () {
      events.$emit('closeCamera')
    }
  }
}
</script>

<style scoped>

</style>
