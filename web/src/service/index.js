import axios from 'axios'
import Vue from 'vue'
// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'http://localhost:3111/admin/api'
// } else if (process.env.NODE_ENV == 'test') {
//   axios.defaults.baseURL = 'http://localhost:3111/admin/testapi'
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://localhost:3111/admin/api'
// }
const http = axios.create({
  // baseURL: 'http://localhost:5222/web/api',
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  timeout: 10000
})
http.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    return Promise.reject(err)
  }
)
axios.defaults.withCredentials = true
export default http
