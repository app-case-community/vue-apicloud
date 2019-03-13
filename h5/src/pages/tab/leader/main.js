import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import { initApp } from '~/plugins'

Vue.use(VueRouter)
initApp(App, {
  router
})
