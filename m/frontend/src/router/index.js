import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/pages/index')
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('@/pages/share')
    },
    {
      path: '/shareation',
      name: 'shareation',
      component: () => import('@/pages/shareation')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: '/yagainformation',
      name: 'yagainformation',
      component: () => import('../pages/homepage/yogaInForMation.vue'),
    },
    {
      path: '/informationdetail',
      name: 'informationdetail',
      component: () => import('../pages/homepage/inForMationDetail.vue')
    },
    {
      path: '/yogamessage',
      name: 'yogamessage',
      component: () => import('../pages/informationpage/yogaMessage.vue')
    },
    {
      path: '/messagedetail',
      name: 'messagedetail',
      component: () => import('../pages/informationpage/messageDetail.vue')
    },
    {
      path: '/fillorder',
      name: 'fillorder',
      component: () => import('../pages/market/fillOrder.vue')
    }
  ]
})