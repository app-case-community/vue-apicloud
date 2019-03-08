<template>
    <div>
        add
        <button @click="back">back</button>
    </div>
</template>
<script>
export default {
  created () {
    // eslint-disable-next-line no-console
    console.log('add created')
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
