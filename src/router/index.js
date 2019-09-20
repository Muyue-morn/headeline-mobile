import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Tababr from '@/views/tabbar'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component: Login },
    {
      path: '/tabbar',
      component: Tababr,
      children: [
        { path: '', name: 'home', component: Home }
      ]
    }
  ]
})
