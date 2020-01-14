import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import store from '@/plugins/vuex'
import VueGoogleCharts from 'vue-google-charts'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

Vue.config.productionTip = false

export const event = new Vue()

Vue.component('date-time-picker', VueCtkDateTimePicker)
Vue.use(VueGoogleCharts)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
