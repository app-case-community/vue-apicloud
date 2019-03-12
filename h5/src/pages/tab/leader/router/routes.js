import IndexPage from './../pages/index.vue'
const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/leader/add',
    component: () => import(/* webpackChunkName:"leader_add" */'./../pages/add.vue')
  }
]
export default routes
