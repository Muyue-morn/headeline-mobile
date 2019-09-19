import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import Component from './components'

// 按需注册button组件
import {
  Button,
  Icon,
  Field,
  Cell,
  CellGroup,
  NavBar,
  Toast
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
