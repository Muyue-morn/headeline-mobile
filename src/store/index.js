import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/store/storage'
Vue.use(Vuex)

const state = {
  user: getToken('user')
}
const mutations = {
  saveToken (state, user) {
    state.user = user
    setToken('user', user)
  }
}
const actions = {

}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
