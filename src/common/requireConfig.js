// axios
import Axios from 'axios';

window.axios = Axios;

// 服务器地址配置文件
import serverConfig from './serverConfig.js';

function getCookie(objName) {//获取指定名称的cookie的值
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split("=");
      if (temp[0] == objName) return unescape(temp[1]);  //解码
  }
  return "";
}

// 参数请求
const http =  Axios.create({
  baseURL: serverConfig.serverUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
});
// 文件上传
const httpForm = Axios.create({
  baseURL: serverConfig.serverUrl,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// 排除TOKEN请求地址
var excludeTokenUrls = ['/login', '/captchaImage']


// 拦截器加head头信息 
http.interceptors.request.use(
  config => {
    var cookieToken = getCookie('token');
    var token = sessionStorage.getItem('token');
    // 如有cookie且cookie里的token不同于sessionStorage，重置sessionStorage
    if(cookieToken && cookieToken!=token){
      sessionStorage['token'] = cookieToken;
      token = cookieToken;
    }
    
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?';
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof(value) !== "undefined") {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                let params = propName + '[' + key + ']';
                let subPart = encodeURIComponent(params) + '=';
                url += subPart + encodeURIComponent(value[key]) + '&';
              }
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    if(excludeTokenUrls.indexOf(config.url)==-1){
      config.headers.Authorization = 'Bearer '+token;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);
httpForm.interceptors.request.use(
  config => {
    var cookieToken = getCookie('token');
    var token = sessionStorage.getItem('token');
    // 如有cookie且cookie里的token不同于sessionStorage，重置sessionStorage
    if(cookieToken && cookieToken!=token){
      sessionStorage['token'] = cookieToken;
      token = cookieToken;
    }

    if(excludeTokenUrls.indexOf(config.url)==-1){
      config.headers.Authorization = 'Bearer '+token;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);
http.interceptors.response.use(response => {
  if(response.data.code == '403'){
    window.location.href = window.location.origin + window.location.pathname + '#/login'
  }
  return response
});
httpForm.interceptors.response.use(response => {
  if(response.data.code == '403'){
    window.location.href = window.location.origin + window.location.pathname + '#/login'
  }
  return response
});

export default {
  http,
  httpForm,
}