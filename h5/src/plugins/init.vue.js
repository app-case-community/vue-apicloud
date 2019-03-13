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

// 打开页面
var _openw = null
Vue.prototype.$page = {
  open (url, title, anim, titleBarOpts) {
    if (_openw) { return } // 防止快速点击
    var api = window.api
    var params = {
      url,
      pageParam: {
        title,
        titleBarOpts
      }
    }
    if (anim) {
      params.animation = {
        type: anim,
        subType: 'from_right',
        duration: 300
      }
    }
    api.openWin(params)
  },
  close () {
    var api = window.api
    api.closeWin()
  }
}

const initApp = (App, opts = {}) => {
  new Vue({
    ...opts,
    render: h => h(App)
  }).$mount('#app')
}
export default initApp
