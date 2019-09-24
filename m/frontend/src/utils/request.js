import axios from 'axios'
// 处理非 get data 传参
function handleRequest(config) {
  const {
    contentType
  } = config;
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
  var message = '未知异常';
  var response = err.response
  var data = response.data
  var status = response.status
  if (status === 404) {
    message = '接口不存在';
  } else if (status >= 400 && status < 500) {
    message = data.msg
    if (data.msg == 'Too Many Attempts.') {
      message = '您的操作频率过多，请稍后重试'
    }
  } else if (status >= 500) {
    message = '服务器错误';
  }
  return Promise.reject(message);
}

// 处理分页接口中的 meta ,element 分页组件，需要 number 类型
function handleResponse(response) {
  const {
    data,
    status
  } = response
  if (status >= 400 && status < 500) {
    return Promise.reject(response)
  }
  if (status >= 200 && status < 300) {
    return Promise.resolve(data);
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