import request from '@/utils/request';

/* 瑜伽大会列表 */
export function getTrains(page = 1) {
  return request(`/yoga/conference?page=${page}`)
}
/* 瑜伽大会列表 */
export function postTrainsList(page = 1, args) {
  let params = {
    startTime: "",
    endTime: "",
    // minPrice: "",
    // maxPrice: "",
    province: "",
    city: "",
    area: "",
    // diff: "", // 难度,整数,小于10
    // course_type_id: [], // 瑜伽类型,数组传参且数组元素必须是正整数(数组元素是瑜伽类型的id)
  }
  params = Object.assign({}, params, args)
  return request.post(`/yoga/conference?page=${page}`, params)
}
/* 最新最热 */
export function getOrderByTrains() {
  return request('/orderByTrains')
}

/** 瑜伽大会筛选 */
export function postTrains(page, args) {
  let params = {
    startTime: "",
    endTime: "",
    // minPrice: "",
    // maxPrice: "",
    province: "",
    city: "",
    area: "",
    // diff: "", // 难度,整数,小于10
    // course_type_id: [], // 瑜伽类型,数组传参且数组元素必须是正整数(数组元素是瑜伽类型的id)
  }
  params = Object.assign({}, params, args)
  return request.post(`/yoga/conference?page=${page}`, params)
}

export function postTrainsRank(page=2, args) {
  let params = {

  }
  params = Object.assign({}, params, args)
  return request.post(`/yoga/conference?page=${page}`, params)
}

/* 瑜伽大会详情 */
export function getTrainsById(id) {
  return request(`/yoga/conference/${id}`)
}

/* 新增订单-瑜伽大会 */
export function postTrainsOrder(args) {
  let params = {
    id: '',
    cashId: '',
    cashMoney: '',
    couponId: '',
    fraction: '',
    discountId: ''  
  }
  params = Object.assign({}, params, args)
  return request.post(`/trains/new/order`, params)
}

/* 微信二维码展示 */
export function postGetWechatpayCode(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
  }
  params = Object.assign({}, params, args)
  return request.post(`/wechatpay`, params)
}

/* 微信查询订单支付状态  */
export function postGetWechatOrder(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
  }
  params = Object.assign({}, params, args)
  return request.post(`/getWechatOrder`, params)
}