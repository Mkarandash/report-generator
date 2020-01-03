import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    drawer: null,
    color: localStorage.getItem('color') || 'error',
    image: localStorage.getItem('image') || 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, userId) {
      state.status = 'success'
      state.token = token
      state.userId = userId
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
    setImage (state, payload) {
      state.image = payload
      localStorage.setItem('image', payload)
    },
    setColor (state, payload) {
      state.color = payload
      localStorage.setItem('color', payload)
    },
    setDrawer (state, payload) {
      state.drawer = payload
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('request')
        axios({ url: process.env.VUE_APP_REPORTS_SERVICE + '/users/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const userId = resp.data.userId
            localStorage.setItem('token', token)
            localStorage.setItem('id', userId)
            axios.defaults.headers.common['x-access-token'] = token
            commit('auth_success', token, userId)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: process.env.VUE_APP_REPORTS_SERVICE + '/users/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const userId = resp.data.userId
            localStorage.setItem('token', token)
            localStorage.setItem('id', userId)
            axios.defaults.headers.common['x-access-token'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('currentProject')
        delete axios.defaults.headers.common['x-access-token']
        state = null
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
