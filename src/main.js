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
  PullRefresh
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

Vue.filter('relativeTime', relativeTime)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
