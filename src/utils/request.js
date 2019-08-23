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
  // const xtoken = {
  //   access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmFvbWVuZ3l1amlhLmNvbS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTU2NjQzMTcwNSwiZXhwIjoxNTY2NDM1MzA1LCJuYmYiOjE1NjY0MzE3MDUsImp0aSI6IkM2Mzk3VU9sc1VnTGlGdnAiLCJzdWIiOjE0LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._9SNoIBHmGRwH_rX8oNMSVZa2Bj9Y1intq8htgYKW9g",
  //   expires_in: 3600,
  //   token_type: "bearer"
  // }
  // config.headers['Authorization'] = xtoken.token_type + xtoken.access_token
  // 请求头添加token
  const access = sessionStorage.getItem('access')
  config.headers['Authorization'] = access && `${JSON.parse(access).token_type}${JSON.parse(access).access_token}` || '';

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
    data = {}, status, config
  } = response;

  let message = '未知异常';
  if (status === 401) {
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
