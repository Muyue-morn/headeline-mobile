import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Tababr from '@/views/tabbar'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/tabbar', name: 'tabbar', component: Tababr }
  ]
})
