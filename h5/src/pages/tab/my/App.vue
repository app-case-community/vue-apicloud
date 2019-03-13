<template>
    <div>
      my
      <!-- <van-button type="default">默认按钮</van-button> -->
      <nut-button small>去结算</nut-button>
    </div>
</template>
<style scoped>

</style>
<script>
// import { Button } from 'vant'
import { Button } from '@nutui/nutui'
export default {
  data () {
    return {
    }
  },
  components: {
    // [Button.name]: Button,
    [Button.name]: Button
  },
  mounted () {
    console.log('mounted', this)
  },
  onReady () {
    this.winHeight = window.api.winHeight
    console.log('test')
  }
}
</script>
