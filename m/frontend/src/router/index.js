import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: { name: 'category' }
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
      children: [
        {
        path: 'category',
        name: 'category',
        meta: {
          header_name: 'market'
        },
        component: () => import('@/pages/market/category')
      }]
    },
    {
      path: '/goods',
      name: 'goods',
      component: Layout,
      redirect: { name: 'detail' },
      children: [
        {
        path: 'detail/:goods_id',
        name: 'detail',
        meta: {
          header_name: 'goods'
        },
        component: () => import('@/pages/market/goods/detail')
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
      path: '/teacherClub',
      name: 'teacherClub',
      component: () => import('@/pages/teacherClub/teacherClub')
    },
    {
      path: '/teacherClub/teacherDetails',
      name: 'teacherDetails',
      component: () => import('@/pages/teacherClub/teacherDetails')
    },
    {
      path: '/teacherClub/clubhouseDetails',
      name: 'clubhouseDetails',
      component: () => import('@/pages/teacherClub/clubhouseDetails')
    }
  ]
})
