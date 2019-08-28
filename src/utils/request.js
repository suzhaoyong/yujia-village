import axios from 'axios'
import Bus from './Bus'
import {
  Message,
  Loading
} from 'element-ui'
let loadingInstance = ""
// 处理非 get data 传参
function handleRequest(config) {
  if (config.url.startsWith('/api/getAlipayOrder') && config.url.startsWith('/api/getWechatOrder')) {

  } else {
    loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0)'
    });
  }
  const {
    method,
    data,
    url,
    contentType
  } = config;
  // 请求头添加token
  const access = sessionStorage.getItem('access')
  config.headers['Authorization'] = access && `${JSON.parse(access).token_type}${JSON.parse(access).access_token}` || '';

  // config.baseURL = '/api';
  config.baseURL = 'http://api.aomengyujia.com/api';
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
  loadingInstance && loadingInstance.close();
  const {
    response = {}
  } = err;
  const {
    data = {}, status, config
  } = response;

  let message = '未知异常';
  if (status === 401) {
    message = '请先登录'
    if (sessionStorage.getItem('access')) {
      // sessionStorage.removeItem('access')
      request.post('/auth/refresh')
        .then(data => {
          sessionStorage.setItem('access', JSON.stringify(data))
          window.location.reload();
        })
        .catch(() => {
          Message({
            message: '重置令牌失败',
            type: 'error',
            duration: 5 * 1000
          });
        })

    } else {
      Bus.$emit('login', true)
      sessionStorage.removeItem('user')
    }

  } else if (status === 404) {
    message = '接口不存在';
  } else if (status >= 400 && status < 500) {
    message = data.msg
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
  loadingInstance && loadingInstance.close();
  const {
    status,
    data
  } = response
  if (status >= 400 && status < 500) {
    return Promise.reject(response);
  }
  if (status >= 200 && status < 300) {
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
