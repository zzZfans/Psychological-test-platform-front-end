<template>
  <keep-alive>
    <component :is="currentComponent" @change="change(arguments)" ref="comp" :types="types"></component>
  </keep-alive>
</template>

<script>
export default {
  data () {
    return {
      currentComponent: 'table-index',
      types: ''
    }
  },
  components: {
    'table-index': () => Promise.resolve(require('@/views/assess/table/index')),
    'table-pro': () => Promise.resolve(require('@/views/assess/table/table')),
    'table-random': () => Promise.resolve(require('@/views/assess/table/tableRandom'))
  },
  methods: {
    change (param) {
      this.currentComponent = param[0]
      setTimeout(() => {
        if (param[1]) {
          this.types = param[1]
        }
      }, 50)
    }
  }
}
</script>
