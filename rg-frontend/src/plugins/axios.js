import axios from 'axios'
import store from '@/plugins/vuex'

const Axios = axios.create({
  baseURL: process.env.VUE_APP_REPORTS_SERVICE
})

Axios.interceptors.request.use(
  (config) => {
    config.headers['x-access-token'] = store.getters.token;
    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
)

export default Axios