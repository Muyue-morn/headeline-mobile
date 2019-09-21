/*
 * @Author: advance.YiYunmu
 * @Date: 2019-09-21 20:25:54
 * @Last Modified by: advance.YiYunmu
 * @Last Modified time: 2019-09-21 21:12:08
 * 主入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import Component from './components'
import { relativeTime } from './utils/date'
// 按需注册button组件
import {
  Button,
  Icon,
  Field,
  Cell,
  CellGroup,
  NavBar,
  Toast,
  Tabbar,
  TabbarItem,
  Search,
  Tab,
  Tabs,
  List,
  Grid,
  GridItem,
  Image,
  PullRefresh,
  Popup,
  Lazyload,
  Loading
} from 'vant'
Vue.use(Component)
Vue.config.productionTip = false
Vue.use(Button)
  .use(Icon)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(PullRefresh)
  .use(Popup)
  .use(Lazyload)
  .use(Loading)

Vue.filter('relativeTime', relativeTime)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
