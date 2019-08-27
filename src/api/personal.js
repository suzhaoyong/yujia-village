import request from '@/utils/request';

/* 个人资料  */
export function getUserInfo() {
  return request('/personal/home')
}

/** 提交认证资料 */
export function postUserInfo(args) {
  let params = {
    identity_auth: "", // 认证的身份 2=>馆主,4=>教练,7=>馆主+教练
    real_name: "",
    club_tel: "",
    club_name: "",
    city: "",
    province: "",
    area: "",
    address: "",
    img_exemption: "", //	免责声明图片
    img_work: "", // 工作证明(教练证书)
    img_license: "" // 营业执照
  }
  params = Object.assign({}, params, args)
  return request.post('/personal/home', params)
}

/* 现金券使用记录 */
export function getUsedRecord(id) {
  return request(`/personal/home/${id}`)
}

/* 修改提现银行卡 */
export function postChangeBankCard(args) {
  let params = {
    bank_card: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/changeBankCard`, params)
}

/* 获取银行卡信息 */
export function getBankCardInfo() {
  return request(`/personal/getBankCardInfo`)
}

/* 用户充值 */
export function postRecharge(args) {
  let params = {
    num: "", // 充值金额
    payment: "", // 支付方式
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/recharge`, params)
}

/* 用户修改资料 */
export function postUpdateInfo(args) {

  let params = {
    name: "", //
    real_name: "", //
    sex: "", // 性别1-女 2-男 3-保密
    birthday: "",
    city: "",
    province: "",
    area: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/personal/updateInfo`, params)
}
