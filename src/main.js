// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Carousel, CarouselItem} from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})