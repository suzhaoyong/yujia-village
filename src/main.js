// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import request from '@/utils/request';
import NotFound from '@/utils/not_found.js';
import SessionTitle from '@/utils/session_title.js';
import ElementUI from 'element-ui'

import MetaInfo from 'vue-meta-info'

import 'element-ui/lib/theme-chalk/index.css'
import {Carousel, CarouselItem} from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
import '../static/style/theme/index.css';
import '../static/style/hover.css';
import store from '@/store'

Vue.use(NotFound)
Vue.use(SessionTitle)
Vue.use(Share)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Vuex)
Vue.use(MetaInfo)
Object.defineProperty(Vue.prototype, '$request', { value: request });
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {
    document.dispatchEvent(new Even('render-event'))
  },
})
