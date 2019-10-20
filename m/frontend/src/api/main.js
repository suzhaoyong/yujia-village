import request from '@/utils/request';
// 网页首页
export function getMainDetail() {
  return request.get(`/home/wap`)
}