import request from '@/utils/request';

/* 商品详细分类-筛选条件 */
export function getGoodsFilter() {
  return request('/goods')
}
/* 商品推荐页面数据 */
export function getGoodRecomment() {
  return request('/goods/goodRecomment')
}
/* 商品按条件查询  */
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
/* 查询指定商品 */
export function getGoodsById(id) {
  return request(`/goods/${id}`)
}
/* 添加购物车 */
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