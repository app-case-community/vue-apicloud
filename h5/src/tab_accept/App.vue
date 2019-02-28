<template>
    <div id="app">
        受理
    </div>
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
