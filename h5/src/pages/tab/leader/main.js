import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import initApp from '~/common/init.vue'

Vue.use(VueRouter)
initApp(App, {
  router
})
