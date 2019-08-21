import axios from 'axios'
import {
  Message
} from 'element-ui'

// 处理非 get data 传参
function handleRequest(config) {
  const {
    method,
    data,
    url,
    contentType
  } = config;
  // 请求头添加token
  config.headers['authtoken'] = 'xx';
  // 设置 baseURL
  config.baseURL = '/api';
  if (contentType === 'json') {
    config.headers['Content-Type'] = 'application/json';
  } 
  return config;
}

function handleRequestErr(err) {
  return Promise.reject(err);
}

// // 处理 responese 报错
function handleResponeseErr(err) {
  const {
    response = {}
  } = err;
  const {
    data = {}, status
  } = response;

  let message = '未知异常';
  if (status === 404) {
    message = '接口不存在';
  } else if (status > 500) {
    message = '服务器错误';
  }
  if (data.message) {
    message = data.message;
  }

  // 手动阻止（未配置接口域名）
  if (err.message !== 'cancel') {
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    });
  }
  return Promise.reject(err);
}

// 处理分页接口中的 meta ,element 分页组件，需要 number 类型
function handleResponse(response) {
  const { status, data } = response
  if(status >= 400 && status < 500) {

  }
  if( status >= 200 && status < 300) {
    return data;
  }
}

const request = axios.create({
  timeout: 15000 // 请求超时时间
});
// request拦截器
request.interceptors.request.use(handleRequest, handleRequestErr)
// respone拦截器
request.interceptors.response.use(handleResponse, handleResponeseErr)

export default request;
