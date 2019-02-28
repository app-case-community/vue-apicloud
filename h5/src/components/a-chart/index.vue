<template>
    <v-chart ref="vchart" autoresize :initOptions="initOptions" :options="options"/>
</template>
<script>
import ECharts from 'vue-echarts'
import 'zrender/lib/svg/svg'
import 'echarts/lib/chart/gauge'
export default {
  name: 'a-chart',
  props: {
    options: Object
  },
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      initOptions: {
        renderer: 'svg'
      }
    }
  },
  methods: {
    resize () {
      this.$refs.vchart.resize()
    }
  }
}
</script>
