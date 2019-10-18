# yujiaproject

> A Vue.js project

## 目录结构 （2019.09.21）
yujia-village 结构
```
.
├── README.md
├── build
├── config // 配置项
├── dist // 打包文件
├── index.html
├── m  // 移动端 
├── mock // 数据模拟
├── node_modules // 依赖
├── package-lock.json
├── package.json 
├── src
├── static // 静态文件
└── yarn.lock

```

src 结构
```
src
├── App.vue
├── api   // 接口
│   ├── market.js
│   ├── personal.js
│   └── trains.js
├── assets    // 资源文件
├── components  // 组件
│   ├── SessionTitle.vue  // 标题
│   ├── banner.vue  
│   ├── footer.vue  // 底部
│   ├── header.vue  // 头部
│   └── notFound.vue  // 数据为空显示提示页
├── main.js // 加载文件
├── pages
│   ├── Login  
│   │   ├── login.vue  // 登录
│   │   ├── register.vue // 注册
│   │   └── reset.vue // 忘记密码
│   ├── aboutus.vue // 关于我们
│   ├── cultivate // 培训信息
│   │   ├── SessionTitle.vue
│   │   ├── cultivate.vue
│   │   └── detail.vue
│   ├── goods // 商品相关
│   │   ├── SessionTitle.vue
│   │   ├── collect.vue // 收藏
│   │   ├── detail.vue  // 详情
│   │   ├── order.vue // 订单
│   │   ├── payway.vue  // 支付
│   │   └── shopcar.vue // 购物车
│   ├── home.vue // 布局页
│   ├── joinclubhouse.vue // 联盟机构
│   ├── joinclubhousedetails.vue // 联盟机构详情
│   ├── main.vue // 首页
│   ├── market // 商场相关
│   │   ├── SessionTitle.vue
│   │   ├── detail.vue  // 商场搜索结果页
│   │   └── index.vue // 商场首页
│   ├── personalCenter // 个人中心相关
│   │   ├── SessionTitle.vue
│   │   ├── certification.vue // 认证填写材料
│   │   ├── cloud.vue // 云纹路组件
│   │   ├── identity.vue // 身份认证
│   │   ├── index.vue // 个人代金券和现金券
│   │   ├── recode.vue // 订单记录
│   │   ├── release.vue // 课程发布
│   │   ├── safetyCenter.vue  // 安全中心
│   │   ├── share.vue // 分享
│   │   ├── topTItle.vue  // 头部组件
│   │   └── useHistory.vue  // 金币充值记录
│   ├── yogoinformation.vue // 瑜伽资讯
│   ├── yogoinformationdetails.vue //瑜伽资讯---详情
│   ├── yogoknowledge.vue //瑜伽知识
│   ├── yogoknowledgedetails.vue //瑜伽知识---详情
│   ├── yogoteacher.vue //瑜伽名师
│   └── yogoteacherdetails.vue //瑜伽名师---详情
├── router // 路由相关
│   └── index.js
├── store // store
│   ├── getters.js
│   ├── index.js
│   └── modules
│       └── app.js // 个人信息
├── utils // 工具类
│   ├── Bus.js // 总线 Bus
│   ├── bee.js // 校验规则
│   ├── not_found.js // 挂载 notFound 组件
│   ├── request.js // 请求相关
│   └── session_title.js  // 挂载 SessionTitle 组件


```


## 注意项
* pc项目，有的地方是使用 rem。若要使用 rem 单位，请按设计图的 自定义> CSS Rem 20 px 置换成 rem。 *

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
