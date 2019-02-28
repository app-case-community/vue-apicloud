const install = (Vue) => {
  if (install.installed) return
  install.installed = true
  Vue.mixin({
    beforeCreate () {
      if (this.$root.$children.length > 0 && this.$root.$children[0] === this) {
        document.addEventListener('apiready', () => {
          this.$options.onLoad && this.$options.onLoad.bind(this).call()
        })
      }
    }
  })
}
export default {
  install
}
