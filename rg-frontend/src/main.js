// =========================================================
// * Vuetify Material Dashboard - v1.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licenses under MIT

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store/store'
import Vuetify from 'vuetify'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vuetify/dist/vuetify.min.css'
import 'chartist/dist/chartist.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import Axios from 'axios'
import VueGoogleCharts from 'vue-google-charts'

export const axios = Axios.create({
  baseURL: process.env.VUE_APP_REPORTS_SERVICE,
  headers: {
    'x-access-token': localStorage.getItem('token')
  }
})

export const event = new Vue()

Vue.config.productionTip = false

Vue.use(VueGoogleCharts)

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)

Vue.use(require('vue-chartist'))

Vue.use(Vuetify, {
  iconfont: 'mdi',
  primary: '#4caf50',
  secondary: '#4caf50',
  tertiary: '#495057',
  accent: '#82B1FF',
  error: '#f55a4e',
  info: '#00d3ee',
  success: '#5cb860',
  warning: '#ffa21a'
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
