<template>
    <div>
      my
    </div>
</template>
<style scoped>

</style>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log('mounted', this)
  },
  onLoad () {
    this.winHeight = window.api.winHeight
    console.log('test')
  }
}
</script>
