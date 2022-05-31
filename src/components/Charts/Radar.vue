<template>
  <v-chart :forceFit="true" height="400" :data="data" :padding="[20, 20, 95, 20]" :scale="scale">
    <v-tooltip></v-tooltip>
    <v-axis :dataKey="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" />
    <v-axis :dataKey="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
    <v-legend dataKey="user" marker="circle" :offset="30" />
    <v-coord type="polar" radius="0.8" />
    <v-line position="item*level" color="red" :size="2" />
    <v-area  position="item*level" color="rgba(255,0,0,0.6)"/>
    <v-point position="item*level" color="red" :size="4" shape="circle" />
  </v-chart>
</template>

<script>
const axis1Opts = {
  dataKey: 'item',
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: true
  }
}
const axis2Opts = {
  dataKey: 'level',
  line: null,
  tickLine: null,
  grid: {
    type: 'polygon',
    lineStyle: {
      lineDash: null
    }
  }
}

const scale = [
  {
    dataKey: 'level',
    min: 0,
    max: 3
  }
]

export default {
  name: 'Radar',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      axis1Opts,
      axis2Opts,
      scale
    }
  }
}
</script>

<style scoped>

</style>
