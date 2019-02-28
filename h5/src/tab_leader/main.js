import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import ReadyPlugin from './../common/ready.plugin'
Vue.config.productionTip = false
Vue.use(ReadyPlugin)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
