import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'
import router from './router'
Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Card from '@/components/Card.vue'
Vue.component('x-card', Card)
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
