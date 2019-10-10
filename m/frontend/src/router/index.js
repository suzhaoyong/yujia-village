import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout.vue'
// eslint-disable-next-line no-undef
const Home = resolve => require(['@/pages/home'], resolve) //首页

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'Main',
      component: Home,
      children: [{
        path: '/main',
        component: () => import('@/pages/main')
      }]
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Home,
      children: [{
        path: '/yogaknowledge',
        component: () => import('@/pages/homepage/yogaknowledge')
      }]
    },
    // 首页
    {
      path: '/home',
      component: Home,
      redirect: '/main'
    },
    // 个人中心
    {
      path: '/personal',
      name: 'personal',
      component: Home, 
      children: [{
        path: '/personal',
        component: () => import('@/pages/personal')
      }]
    },
    {
      // 我的订单
      path: '/myorder',
      component: () => import('@/pages/personalCenter/myorder')
    },
    {
      // 购物袋
      path: '/shoppingbag',
      component: () => import('@/pages/personalCenter/shoppingbag')
    },
    {
      // 地址管理
      path: '/address',
      component: () => import('@/pages/personalCenter/address')
    },
    {
      // 地址编辑
      path: '/addresscompile',
      name: 'addresscompile',
      component: () => import('@/pages/personalCenter/addresscompile')
    },
    {
      // 我的收藏
      path: '/collect',
      component: () => import('@/pages/personalCenter/collect')
    },
    {
      // 点赞的老师
      path: '/thumbteacher',
      component: () => import('@/pages/personalCenter/thumbteacher')
    },
    {
      // 购买的课程
      path: '/buycourse',
      component: () => import('@/pages/personalCenter/buycourse')
    },
    {
      // 认证中心
      path: '/authenticationcenter',
      component: () => import('@/pages/personalCenter/authenticationcenter')
    },
    {
      path: '/invitation',
      component: () => import('@/pages/personalCenter/invitation')
    },
    // 登录
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
    // 商场
    {
      path: '/store',
      name: 'store',
      component: Home, 
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
    // 商品
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
      component: Home,
      redirect: { name: 'teacherClub list' },
      children: [
        {
          path: 'list',
          name: 'teacherClub list',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/teacherClub/teacherClub')
        }
      ]
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
