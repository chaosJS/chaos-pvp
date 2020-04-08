import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'
import router from './router'
Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Card from '@/components/Card.vue'
Vue.component('x-card', Card)
import http from './service'

import ListCard from '@/components/ListCard.vue'
Vue.component('list-card', ListCard)
Vue.prototype.$http = http
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
