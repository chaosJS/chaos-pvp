import axios from 'axios'
import Vue from 'vue'
import router from '../router'
// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'http://localhost:3111/admin/api'
// } else if (process.env.NODE_ENV == 'test') {
//   axios.defaults.baseURL = 'http://localhost:3111/admin/testapi'
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://localhost:3111/admin/api'
// }
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:5222/admin/api',
  timeout: 10000
})
http.interceptors.request.use(
  config => {
    // 加token
    config.headers['Authorization'] = 'Bearer ' + (localStorage.token || '')
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
    if (err.response.status === 401) {
      // 鉴权没通过
      router.push('/login')
    }
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    return Promise.reject(err)
  }
)
axios.defaults.withCredentials = true
export default http
