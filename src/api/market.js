import request from '@/utils/request';

/* 商品推荐页面数据 */
export function getGoodRecomment() {
  return request('/goods/goodRecomment')
}
/** 商品按条件查询  */
export function postShowGoodList(args = {}) {
  let params = {
    type: "",
    sort: "",
    color: "",
    season: "",
    price: "",
    person: "",
    material: ""
  }
  params = Object.assign({}, params, args)
  return request.post('/goods/showGoodList', params)
}

/** 最近浏览  */
export function postRecentbrowse(args = {}) {
  let params = {
    page: ""
  }
  params = Object.assign({}, params, args)
  return request.post('/goods/Recentbrowse', params)
}
/** 商品详细分类-筛选条件 */
export function getGoods() {
  return request('/goods')
}

/** 查询指定商品 */
export function getGoodsById(id) {
  return request(`/goods/${id}`)
}

/** 我的收藏 */
export function getUserCollect() {
  return request(`/userCollect/create`)
}

/** 收藏商品 */
export function postUserCollect(args = {}) {
  let params = {
    id: "",
    num: "",
    size: "",
    color: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCollect`, params)
}

/** 收藏商品添加购物车 */
export function postAddUserCart(args = {}) {
  let params = {
    id: "",
    num: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCollect/addUserCart`, params)
}

/** 删除收藏商品
 * @param id 商品主列表 编号
 */
export function deleteUserCollect(id) {
  return request.delete(`/userCollect/${id}`)
}

/** 我的购物车 */
export function getUserCart() {
  return request(`/userCart/create`)
}

/** 添加购物车 */
export function postUserCart(args = {}) {
  let params = {
    id: "",
    num: "",
    size: "",
    color: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCart`, params)
}

/** 购物车商品添加收藏 */
export function postAddUserCollect(args = {}) {
  let params = {
    id: [],
    num: []
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCart/addUserCollect`, params)
}

/** 删除购物车
 * @param id 商品主列表 编号
 */
export function deleteUserCart(id) {
  return request.delete(`/userCart/${id}`)
}

/** 用户订单 */
export function getUserOrder() {
  return request(`/goodOrder/userOrder`)
}
/** 用户地址 */
export function getUserAddress() {
  return request(`/goodOrder/create`)
}

/** 购物车提交订单 */
export function postUserOrder(args = {}) {
  let params = {
    id: "", // 商品副列表 编号
    num: "",
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCart/submitOrder`, params)
}

/** 新增订单 */
export function postGoodOrder(args = {}) {
  let params = {
    id: "", // 购物车列表编号
    lid: "", // 商品副列表 编号
    num: "",
    sendTime: "", // 送货时间 1-送货时间不限 2-仅周一周五送货 3-仅节假日/周末送货
    userName: "",
    userTel: "",
    userZone: "", // 地址省市区
    userAddress: "",
    userMessage: "",
    status: "", // 0不是新增地址 1是新增地址
    addressId: "",
    payment: "", // 付款方式 1-未支付 2-支付宝 3-微信

  }
  params = Object.assign({}, params, args)
  return request.post(`/goodOrder`, params)
}

/** 支付宝二维码展示 */
export function postGetAlipayCode(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
    body: "", // 订单商品名称
    total_fee: "", // 总价格
  }
  params = Object.assign({}, params, args)
  return request.post(`/alipay`, params)
}

/** 支付宝查询订单支付状态  */
export function postGetAlipayOrder(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
  }
  params = Object.assign({}, params, args)
  return request.post(`/getAlipayOrder`, params)
}


/** 微信二维码展示 */
export function postGetWechatpayCode(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
    body: "", // 订单商品名称
    total_fee: "", // 总价格
  }
  params = Object.assign({}, params, args)
  return request.post(`/wechatpay`, params)
}

/** 微信查询订单支付状态  */
export function postGetWechatOrder(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
  }
  params = Object.assign({}, params, args)
  return request.post(`/getWechatOrder`, params)
}
