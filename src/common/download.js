import { saveAs } from 'file-saver'
import axios from 'axios'

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

function getToken(){
  var cookieToken = getCookie('token');
  var token = sessionStorage.getItem('token');
  // 如有cookie且cookie里的token不同于sessionStorage，重置sessionStorage
  if(cookieToken && cookieToken!=token){
    sessionStorage['token'] = cookieToken;
    token = cookieToken;
  }
  return 'Bearer '+token;
}

export default {
  name(name, isDelete = true) {
    var url = serverConfig.serverUrl + "/common/download?fileName=" + encodeURI(name) + "&delete=" + isDelete
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': getToken() }
    }).then(async (res) => {
      const isLogin = await this.blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURI(res.headers['download-filename']))
      }
    })
  },
  resource(resource) {
    var url = serverConfig.serverUrl + "/common/download/resource?resource=" + encodeURI(resource);
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': getToken() }
    }).then(async (res) => {
      const isLogin = await this.blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURI(res.headers['download-filename']))
      }
    })
  },
  zip(url, name) {
    var url = serverConfig.serverUrl + url
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': getToken() }
    }).then(async (res) => {
      const isLogin = await this.blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      }
    })
  },
  saveAs(text, name, opts) {
    saveAs(text, name, opts);
  },
  async blobValidate(data) {
    try {
      const text = await data.text();
      JSON.parse(text);
      return false;
    } catch (error) {
      return true;
    }
  },
}

