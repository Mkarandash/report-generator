import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || undefined,
    userId: localStorage.getItem('userId') || undefined
  },
  mutations: {
    setValues (state, payload) {
      state.token = payload.token,
      state.userId = payload.userId
    },
    removeValues (state) {
      state.token = undefined,
      state.userId = undefined
    }
  },
  getters: {
    isLoggedIn: state => state.token && state.userId,
    userId: state => state.userId,
    token: state => state.token
  }
})