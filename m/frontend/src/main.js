import Vue from 'vue'
import App from './App.vue'
import request from './utils/request'
import router from './router/index'
import './assets/css/common.css'
import './assets/font_1300707_w58sw6y12uk/iconfont.css'
import store from './store'
import 'amfe-flexible'
// import './common/rem'
import 'vant/lib/button/style';
import { Dialog, Rate ,Picker } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import VConsole from 'vconsole'

// if (process.env.NODE_ENV === 'production') {
//   new VConsole()
// }
// 全局注册
Vue.use(Dialog);
Vue.use(Rate);
Vue.use(Picker);
Vue.use(Swipe).use(SwipeItem);
require('./mock')

Object.defineProperty(Vue.prototype, '$request', { value: request })
Vue.config.productionTip = false
var qs = require('querystringify');
Vue.prototype.qs = qs;
// 注册工具库至 Vue 原型
Object.defineProperty(Vue.prototype, '$request', { value: request });
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
