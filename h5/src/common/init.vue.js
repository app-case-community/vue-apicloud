import Vue from 'vue'
import ReadyPlugin from './ready.plugin'

Vue.config.productionTip = false

Vue.use(ReadyPlugin)

Object.defineProperty(Vue.prototype, 'api', {
  get: function () {
    return window.api
  }
})
Object.defineProperty(Vue.prototype, '$api', {
  get: function () {
    return window.$api
  }
})

const initApp = (App, opts = {}) => {
  new Vue({
    ...opts,
    render: h => h(App)
  }).$mount('#app')
}
export default initApp
