import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: { name: 'market' }
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
      path: '/market',
      name: 'market',
      component: Layout,
      redirect: { name: 'category' },
      children: [{
        path: 'category',
        name: 'category',
        meta: {
          header_name: 'market'
        },
        component: () => import('@/pages/market/category')
      }]
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
      component: () => import('../components/yogaInForMation.vue')
    }
  ]
})
