import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/store/storage'
Vue.use(Vuex)

const state = {
  user: getItem('user')
}
const mutations = {
  saveToken (state, user) {
    state.user = user
    setItem('user', user)
    console.log(user)
  }
}
const actions = {

}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
