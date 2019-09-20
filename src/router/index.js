import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Tababr from '@/views/tabbar'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    /**
     * 登录页面路由
     */
    { path: '/', name: 'login', component: Login },
    /**
     * 主页面
     */
    {
      path: '/tabbar',
      component: Tababr,
      children: [
        { path: '', name: 'home', component: Home } // 主页
      ]
    }
  ]
})
