<template>
    <div id="app">处置</div>
</template>
<script>
export default {
  created () {
    window.refreshData = () => {
      this.loadData()
    }
  },
  methods: {
    loadData () {
      setTimeout(() => {
        window.api.refreshHeaderLoadDone()
      }, 1000)
    }
  }
}
</script>
