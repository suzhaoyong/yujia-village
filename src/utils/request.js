import axios from 'axios'
import Bus from './Bus'
import store from "@/store";
import {
  Message,
  Loading
} from 'element-ui'
let loadingInstance = ""
const CancelToken = axios.CancelToken;
let  source 
// 处理非 get data 传参
function handleRequest(config) {
  if (config.url.search("getAlipayOrder") != -1 || config.url.search("getWechatOrder") != -1) {

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
  const access = sessionStorage.getItem('access') || ''
  config.headers['Authorization'] = access && `${JSON.parse(access).token_type}${JSON.parse(access).access_token}` || '';
  // config.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  // config.baseURL = '/api';
  // 
  // config.cancelToken = source && source.token
  // if (config.url.search("personal") != -1  || config.url.search("login") != -1 || config.url.search("telLogin") != -1) {
  //   if(access === '') {
  //     source && source.cancel('Operation canceled by the user.');
  //     console.log(config);
  //   }
  // }
  if (process.env.NODE_ENV === 'development') {
    // config.baseURL = '/api'; // 
    // config.baseURL = 'http://api.aomengyujia.com/api';
    config.baseURL = 'http://testapi.aomengyujia.com/api';
  } else {
    config.baseURL = 'https://api.yujiacun.net/api';
  }
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
  console.log('请求失败')
  console.log('response', response)
  console.log('status', status)
  console.log('data', data)
  if (status === 404) {
    message = '接口不存在';
  } else if (typeof status === 'undefined') {
    message = "登录已失效，请再次登录"
    Bus.$emit('login', true)
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('access')
    store.dispatch("INFO", {
      user: {}
    });
  }
  if (data.code === '0001') {
    message = "登录已失效，请再次登录"
    Bus.$emit('login', true)
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('access')
    store.dispatch("INFO", {
      user: {}
    });
  }
  /*
  if(data.code === '0001') {
    request.post('/auth/refresh')
        .then(data => {
          sessionStorage.setItem('access', JSON.stringify(data))
          store.dispatch("INFO", data);
          window.location.reload();
        })
        .catch(() => {
          store.dispatch("INFO", {});
          Message({
            message: '重置令牌失败',
            type: 'error',
            duration: 5 * 1000
          });
          Toast('请重新登录');
        })
        return Promise.resolve();
  }
  */
  /*
  if (data.code === '0001') {
    if (sessionStorage.getItem('access')) {
      // sessionStorage.removeItem('access')
      request.post('/auth/refresh')
        .then(data => {
          sessionStorage.setItem('access', JSON.stringify(data))
          store.dispatch("INFO", data);
          // window.location.reload();
        })
        .catch(() => {
          Message({
            message: '重置令牌失败',
            type: 'error',
            duration: 5 * 1000
          });
        })
        return Promise.resolve(); 
    } else {
      Bus.$emit('login', true)
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('access')
      store.dispatch("INFO", {
        user: {}
      });
    }
  }
*/
  if (status === 401) {
    if (config.url.search("login") != -1 || config.url.search("telLogin") != -1) { // 显示图形码报错信息
      message = data.msg
    } else {
      message = '请先登录'
    }
    

  } else if (status === 404) {
    message = '接口不存在';
  } else if (status >= 400 && status < 500) {
    message = data.msg
    if (data.msg == 'Too Many Attempts.') {
      message = '您的操作频率过多，请稍后重试'
    }
  } else if (status >= 500) {
    message = '服务器错误';
    if (data.url == '/api/auth/refresh') {
      Bus.$emit('login', true)
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('access')
      store.dispatch("INFO", {
        user: {}
      });
    }
  }
  // if (data.msg) {
  //   message = data.msg;
  // }

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
  // console.log(status, response);
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
