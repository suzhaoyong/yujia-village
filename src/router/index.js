import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/pages/home'], resolve)//首页
const Main = resolve => require(['@/pages/main'], resolve)//主页
const Joinclubhouse= resolve => require(['@/pages/joinclubhouse'], resolve)//加盟会馆
const Yogoteacher= resolve => require(['@/pages/yogoteacher'], resolve)//瑜伽名师
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/main',
        name: 'Home',
        component: Home,//首页
        children: [
          { path: '/main', component: Main}//首页
      ]
    },
    {
      path: '/joinclubhouse',
      name: 'Home',
      component: Home,//加盟会馆
      children: [
        { path: '/joinclubhouse', component: Joinclubhouse}//加盟会馆
    ]
  },
  {
    path: '/yogoteacher',
    name: 'Home',
    component: Home,//瑜伽名师
    children: [
      { path: '/yogoteacher', component: Yogoteacher}//瑜伽名师
  ]
  },
  ]
})
