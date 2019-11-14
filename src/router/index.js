import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/pages/home'], resolve) //首页
const Main = resolve => require(['@/pages/main'], resolve) //首页
const Subjects = resolve => require(['@/pages/subjects'], resolve) //专题页
const Joinclubhouse = resolve => require(['@/pages/joinclubhouse'], resolve) //加盟机构
const Joinclubhousedetails = resolve => require(['@/pages/joinclubhousedetails'], resolve) //加盟机构---详情
const Yogoteacher = resolve => require(['@/pages/yogoteacher'], resolve) //瑜伽名师
const Yogoteacherdetails = resolve => require(['@/pages/yogoteacherdetails'], resolve) //瑜伽名师---详情
const Login = resolve => require(['@/pages/Login/login'], resolve) //登录
const Yogoknowledge = resolve => require(['@/pages/yogoknowledge'], resolve) //瑜伽知识
const Yogoknowledgedetails = resolve => require(['@/pages/yogoknowledgedetails'], resolve) //瑜伽知识---详情
const Yogoinformation = resolve => require(['@/pages/yogoinformation'], resolve) //瑜伽资讯
const Yogoinformationdetails = resolve => require(['@/pages/yogoinformationdetails'], resolve) //瑜伽资讯---详情
const Aboutus = resolve => require(['@/pages/aboutus'], resolve) //关于我们
Vue.use(Router)

const router = new Router({
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
  routes: [{
      path: '/',
      name: 'main',
      component: Home,
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [{
        path: '/login',
        component: Login
      }, ]
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
      component: Home, //首页
      children: [{
          path: '/market/index',
          meta: {
            header_name: 'market'
          },
          name: 'market',
          component: () => import('@/pages/market/index')
        },
        {
          path: '/market/detail',
          name: 'marketDetail',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/market/detail')
        },
      ]
    },
    {
      path: '/personal',
      name: 'personal index',
      component: Home,
      redirect: '/personal/index',
      children: [{
          path: 'index',
          name: 'personal index',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/index')
        },
        {
          path: 'recode',
          name: 'personal recode',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/recode')
        },
        {
          path: 'release',
          name: 'release',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/release')
        },
        {
          path: 'identity',
          name: 'identity',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/identity')
        },
        {
          path: 'certification',
          name: 'certification',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/certification')
        },
        {
          path: 'useHistory/:type',
          name: 'useHistory',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/useHistory')
        },
        {
          path: 'safety-center',
          name: 'safety-center',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/safetyCenter')
        },
        {
          path: 'share',
          name: 'share',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/share')
        },
        {
          path: 'order/thankYouPage/:orderId',
          name: 'thank you page',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/successPay')
        },
        {
          path: 'contactway',
          name: 'contactway',
          meta: {
            header_name: 'personal'
          },
          component: () => import('@/pages/personalCenter/contactway')
        },
      ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: Home, //首页
      children: [{
          path: '/goods/detail/:id',
          name: 'detailGoods',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/goods/detail')
        },
        {
          path: 'order',
          name: 'order',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/goods/order')
        },
        {
          path: 'payway',
          name: 'payway',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/goods/payway')
        },
        {
          path: 'shop-car/:id',
          name: 'shopCar',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/goods/shopcar')
        },
        {
          path: 'collect/:id',
          name: 'collect',
          meta: {
            header_name: 'market'
          },
          component: () => import('@/pages/goods/collect')
        },
      ]
    },
    {
      path: '/cultivate',
      name: 'cultivate',
      component: Home,
      children: [{
          path: '/cultivate/index',
          name: 'cultivate',
          meta: {
            header_name: 'cultivate'
          },
          component: () => import('@/pages/cultivate/cultivate')
        }, //培训信息
        {
          path: '/cultivate/detail/:id',
          meta: {
            header_name: 'cultivate'
          },
          component: () => import('@/pages/cultivate/detail')
        }, //培训信息-----详情
        {
          path: '/cultivate/order/:id',
          meta: {
            header_name: 'cultivate'
          },
          component: () => import('@/pages/cultivate/order')
        },
        {
          path: '/cultivate/order/pay/:orderId',
          meta: {
            header_name: 'cultivate'
          },
          component: () => import('@/pages/cultivate/payway')
        }
      ]
    },
    {
      path: '/main',
      name: 'Main',
      component: Home, //首页
      children: [{
          path: '/main',
          meta: {
            header_name: 'main'
          },
          component: Main
        } //首页
      ]
    },
    {
      path: '/subjects',
      name: 'Subjects',
      component: Home, //专题页
      children: [{
          path: '/subjects',
          meta: {
            header_name: 'main'
          },
          component: Subjects
        }
      ]
    },
    {
      path: '/joinclubhouse',
      name: 'Joinclubhouse',
      component: Home,
      children: [{
          path: '/joinclubhouse',
          meta: {
            header_name: 'joinclubhouse'
          },
          component: Joinclubhouse
        }, //加盟机构
        {
          path: '/joinclubhouse/joinclubhousedetails',
          meta: {
            header_name: 'joinclubhouse'
          },
          component: Joinclubhousedetails
        } //加盟机构----详情
      ]
    },
    {
      path: '/yogoteacher',
      name: 'Yogoteacher',
      component: Home,
      children: [{
          path: '/yogoteacher',
          meta: {
            header_name: 'yogoteacher'
          },
          component: Yogoteacher
        }, //瑜伽名师
        {
          path: '/yogoteacher/yogoteacherdetails',
          meta: {
            header_name: 'yogoteacher'
          },
          component: Yogoteacherdetails
        } //瑜伽名师----详情
      ]
    },
    {
      path: '/yogoknowledge',
      name: 'Yogoknowledge',
      component: Home,
      children: [{
          path: '/yogoknowledge',
          meta: {
            header_name: 'yogoknowledge'
          },
          component: Yogoknowledge
        }, //瑜伽知识
        {
          path: '/yogoknowledge/yogoknowledgedetails',
          meta: {
            header_name: 'yogoknowledge'
          },
          component: Yogoknowledgedetails
        } //瑜伽知识----详情
      ]
    },
    {
      path: '/yogoinformation',
      name: 'Yogoinformation',
      component: Home,
      children: [{
          path: '/yogoinformation',
          meta: {
            header_name: 'yogoinformation'
          },
          component: Yogoinformation
        }, //瑜伽资讯
        {
          meta: {
            header_name: 'yogoinformation'
          },
          path: '/yogoinformation/yogoinformationdetails',
          component: Yogoinformationdetails
        } //瑜伽资讯----详情
      ]
    },
    {
      path: '/aboutus',
      name: 'Aboutus',
      component: Home,
      children: [{
          path: '/aboutus',
          meta: {
            header_name: 'aboutus'
          },
          component: Aboutus
        } //关于我们
      ]
    },
    {
      path: '/pay/new_wechat_pay',
      name: 'wechat pay',
      component: () => import('@/pages/pay/wechatPay')
    },
  ]
})
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.scrollTo(0, 0)
  next();
})
// 列表页面的 beforeRouteLeave 钩子函数
router.beforeRouteLeave = (to, from, next) => {
  if (to.name) {
    from.meta.isUseCache = true;
  }
  next();
}

router.afterEach((to, from) => {

  let scrollContent = document.querySelector('.scroll-content');

  if (scrollContent) {

    scrollContent.scrollTop = 0;
    scrollContent.scrollLeft = 0;
  }
})
export default router;
