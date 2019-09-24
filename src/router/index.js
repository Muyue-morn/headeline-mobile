import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Tababr from '@/views/tabbar'
import Home from '@/views/home'
import Search from '@/views/search'
import SearchResult from '@/views/searchResult'

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
    },
    { path: '/search', name: 'search', component: Search }, // 搜索界面
    /**
     * 搜索结果页面
     */
    {
      path: '/search/:searchText',
      name: 'searchResult',
      component: SearchResult
    }
  ]
})
