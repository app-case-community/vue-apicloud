<template>
    <div>
      my
      <!-- <van-button type="default">默认按钮</van-button> -->
      <nut-button @click="login" small>login</nut-button>
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
  },
  methods: {
    login () {
      this.$page.open('./login_index.html')
    }
  }
}
</script>
