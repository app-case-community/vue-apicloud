import Vue from 'vue'
import App from './App.vue'
import ReadyPlugin from './../common/ready.plugin'
Vue.config.productionTip = false
Vue.use(ReadyPlugin)
new Vue({
  render: h => h(App)
}).$mount('#app')
