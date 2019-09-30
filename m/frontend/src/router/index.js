import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/teacherClub'
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
      path: '/teacherClub',
      name: 'teacherClub',
      component: () => import('@/pages/teacherClub/teacherClub')
    },
    {
      path: '/teacherClub/teacherDetails',
      name: 'teacherDetails',
      component: () => import('@/pages/teacherClub/teacherDetails')
    }
  ]
})