import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/pages/home'], resolve)//首页
const Main = resolve => require(['@/pages/main'], resolve)//首页
const Joinclubhouse= resolve => require(['@/pages/joinclubhouse'], resolve)//加盟会馆
const Joinclubhousedetails= resolve => require(['@/pages/joinclubhousedetails'], resolve)//加盟会馆---详情
const Yogoteacher= resolve => require(['@/pages/yogoteacher'], resolve)//瑜伽名师
const Login = resolve => require(['@/pages/Login/login'], resolve)//登录
const Yogoknowledge= resolve => require(['@/pages/yogoknowledge'], resolve)//瑜伽知识
const Yogoinformation= resolve => require(['@/pages/yogoinformation'], resolve)//瑜伽资讯
const Aboutus= resolve => require(['@/pages/aboutus'], resolve)//关于我们
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [
        { path: '/login', component: Login },
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Login/register'),
    },
    {
      path: '/reset',
      name: 'Reset',
      component: () => import('@/pages/Login/reset'),
    },
    {
      path: '/market',
      name: 'market',
      component: Home,//首页
      children: [
        { path: '/market/index', name: 'market', component: () => import('@/pages/market/index') },
        { path: '/market/detail', name: 'marketDetail', component: () => import('@/pages/market/detail') },
      ]
    },
    {
      path: '/train',
      name: 'train',
      component: Home,//首页
      children: [
        { path: 'index', component: () => import('@/pages/train/index') },
        { path: 'detail/:id', component: () => import('@/pages/train/detail') },
      ]
    },
    {
      path: '/personal',
      name: 'personal',
      component: Home,
      children: [
        { path: 'index', name: 'personal', component: () => import('@/pages/personalCenter/index') },
        { path: 'certification', name: 'certification', component: () => import('@/pages/personalCenter/certification') },
        { path: 'safety-center', name: 'safety-center', component: () => import('@/pages/personalCenter/safetyCenter') },
        { path: 'share', name: 'share', component: () => import('@/pages/personalCenter/share') },
      ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: Home,//首页
      children: [
        { path: '/goods/detail/:id', name: 'detailGoods', component: () => import('@/pages/goods/detail') },
        { path: 'order/:id', name: 'order', component: () => import('@/pages/goods/order') },
        { path: 'shop-car/:id', name: 'shopCar', component: () => import('@/pages/goods/shopcar') },
        { path: 'collect/:id', name: 'collect', component: () => import('@/pages/goods/collect') },
      ]
    },
    {
      path: '/cultivate',
      name: 'cultivate',
      component: Home,
      children: [
        { path: '/cultivate/cultivate', component: () => import('@/pages/cultivate/cultivate') },//培训信息
        { path: '/cultivate/detail', component: () => import('@/pages/cultivate/detail') },//培训信息-----详情
      ]
    },
    {
        path: '/main',
        name: 'Main',
        component: Home,//首页
        children: [
          { path: '/main', component: Main}//首页
      ]
    },
    {
      path: '/joinclubhouse',
      name: 'Joinclubhouse',
      component: Home,
      children: [
        { path: '/joinclubhouse', component: Joinclubhouse},//加盟会馆
        { path: '/joinclubhouse/joinclubhousedetails', component: Joinclubhousedetails}//加盟会馆----详情
    ]
    },
    {
      path: '/yogoteacher',
      name: 'Yogoteacher',
      component: Home,
      children: [
        { path: '/yogoteacher', component: Yogoteacher}//瑜伽名师
    ]
    },
    {
      path: '/yogoknowledge',
      name: 'Yogoknowledge',
      component: Home,
      children: [
        { path: '/yogoknowledge', component: Yogoknowledge}//瑜伽知识
    ]
    },
    {
      path: '/yogoinformation',
      name: 'Yogoinformation',
      component: Home,
      children: [
        { path: '/yogoinformation', component: Yogoinformation}//瑜伽资讯
    ]
    },
    {
      path: '/aboutus',
      name: 'Aboutus',
      component: Home,
      children: [
        { path: '/aboutus', component: Aboutus}//关于我们
    ]
    },
    ]
})
