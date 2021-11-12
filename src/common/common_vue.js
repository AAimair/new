// 获取文档滚动高度
function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  }else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  }else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

// 获取元素到页面顶部的距离
function getElementTop(elem){
  var elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top
  elem=elem.offsetParent;//将elem换成起相对定位的父元素
  while(elem!=null){//只要还有相对定位的父元素
    //获得父元素 距他父元素的top值,累加到结果中
    elemTop+=elem.offsetTop;
    //再次将elem换成他相对定位的父元素上;
    elem=elem.offsetParent;
  }
  return elemTop;
}

// 格式化时间
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
      "M+": this.getMonth() + 1, //月份
      "w+": (function(that){
        var fullYear = that.getFullYear(),dayTime = 86400000;
        var d1 = new Date(fullYear+'-01-01').getTime();
        var d1W = new Date(fullYear+'-01-01').getDay();
        var d2 = that.getTime();
        var offsetTime = d2-d1-(d1W?(7-d1W):d1W)*dayTime; 
        var weekNum = Math.ceil(offsetTime/dayTime/7);
        return (d1W>0?1:0)+weekNum;
      })(this),
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

// base64图片进二进行文件（Blob）
function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  }
  var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}

// 对象数组查询
function searchArr(arr,ind,val){
  arr=Array.isArray(arr)?arr:[];
  for(var i=0;i<arr.length;i++){
    var one=arr[i];
    if(one[ind]==val){
      return {result:true,data:one,index:i};
    }
  }
  return {result:false,data:null,index:-1};
}

// loading
function loading (opt) {
  // 中间SVG图标
  var icon = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>';
  // 样式
  var style = `
    .alp-loading-parent--relative {position: relative!important;}
    .alp-loading-parent--hidden{overflow: hidden!important;}
    .alp-loading-mask {
      position: absolute;
      z-index: 99999;
      background-color: rgba(255,255,255,0.3);
      background-color: {bgColor};
      margin: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: opacity .3s;
    }
    .alp-loading-mask.is-fullscreen {
      position: fixed;
    }
    .alp-loading-spinner {
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      text-align: center;
      position: absolute;
    }
    .alp-loading-spinner .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90,150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #409eff;
      stroke: {iconColor};
      stroke-linecap: round;
    }
    .alp-loading-spinner>.circular {
      height: 42px;
      width: 42px;
      height: {size};
      width: {size};
      animation: loading-rotate 2s linear infinite;
    }
    @keyframes loading-rotate{to{transform:rotate(1turn)}}
    @keyframes loading-dash{
      0%{
        stroke-dasharray:1,200;
        stroke-dashoffset:0
      }
      50%{
        stroke-dasharray:90,150;
        stroke-dashoffset:-40px
      }
      to{
        stroke-dasharray:90,150;
        stroke-dashoffset:-120px
      }
    }
  `;
  // load的dom
  var loadingHtml = '<div class="alp-loading-spinner">'+icon+'</div>'
  // 对参数进行初始化
  if(!opt){
    opt = {
      target: 'body',
      background: 'rgba(255, 255, 255, 0.3)',
      size: 24,
      lock: false,
      iconColor: '',
    }
  }

  var pEl = "", loadingEl = "", isLock = false, styleEl = "";
  loadingEl = document.createElement("div");
  loadingEl.className = "alp-loading-mask";
  loadingEl.innerHTML = loadingHtml;
  styleEl = document.createElement('style');

  opt.target = opt.target||'body'; 
  if(typeof(opt.target)=='string'){
    pEl = document.querySelector(opt.target||'body');
  }else{
    pEl = opt.target;
  }
  if(pEl.style.position==''|| pEl.style.position=='static'){
    pEl.classList.add("alp-loading-parent--relative");
  } 
  // 是否锁滚动
  if(opt.lock){
    isLock = true;
    pEl.classList.add("alp-loading-parent--hidden");
    var offset = pEl.scrollTop;
    loadingEl.style = "top: "+offset+"px;bottom: "+offset+"px;";
  }

  var reg = new RegExp('{bgColor}|{size}|{iconColor}', 'ig');
  var customStyle = style.replace(reg, function(word) {
    var res = "";
    switch(word){
      case '{bgColor}':
        res = opt.background||'rgba(255,255,255,0.3)';
        break;
      case '{iconColor}':
        res = opt.iconColor||'#409eff';
        break;
      case '{size}':
        res = parseFloat(opt.size)?(parseFloat(opt.size)+'px'):'42px';
        break;
    }
    return res;
  });
  styleEl.innerHTML = customStyle;

  pEl.appendChild(styleEl);
  pEl.appendChild(loadingEl);

  return {
    close: function() {
      pEl.classList.remove("alp-loading-parent--relative");
      if(isLock){
        pEl.classList.remove("alp-loading-parent--hidden")
      }
      loadingEl.remove();
      styleEl.remove();
    }
  }
}

// 格式化数据  传入数据，保留位数
function numFormat (num, n) {
  var offset = Math.pow(10, n+1);
  // console.log(offset);
  return (Math.round (num * offset) / offset).toFixed(n);
}

// 计算字符串宽度  传入字符串 及字体大小(默认PX);
function calcStrWidth(str,size){
  var _c = document.createElement('canvas');
  var _ctx=_c.getContext("2d");
  _ctx.font= ''+parseInt(size)+"px Arial";
  // console.log(_ctx.measureText(''+str).width);
  return Math.ceil(_ctx.measureText(str).width);
}

// 深拷贝
function deepCopy(obj){
  var resData = null;
  if(typeofString(obj)=='Object' || typeofString(obj)=='Array'){
    var isLoop = false;
    try{
      JSON.stringify(obj);
    }catch(err){
      isLoop = true;
      resData = obj;
    }
    if(!isLoop){
      resData = typeofString(obj)=='Object'?{}:[];
      for(var k in obj){
        if(typeofString(obj[k])=='Object' || typeofString(obj[k])=='Array'){
          resData[k] = deepCopy(obj[k]);
        }else{
          resData[k] = obj[k];
        }
      }
    }
  }else{
    resData = obj;
  }
  return resData;
}

// 树型对象数据查找  data 查询数据  recursiveKey 递归key  searchKey 查询key  searchVal 查询值  pathArr  递归路径数组
function recursiveSearch({ data, recursiveKey, searchKey, searchVal}, pathArr){
  var res = {
    result: false,
    data: null,
    path: pathArr?[...pathArr]:[],
  }
  if(Array.isArray(data)){
    for(var i = 0;i<data.length;i++){
      var one = data[i];
      if(one[searchKey] == searchVal){
        res.result = true;
        res.data = one;
        res.path.push(one[searchKey]);
        break;
      }
      if(Array.isArray(one[recursiveKey])){
        var onePath = [].concat(res.path, one[searchKey])
        var deepRes = recursiveSearch({
          data: one[recursiveKey],
          recursiveKey: recursiveKey,
          searchKey: searchKey,
          searchVal: searchVal
        }, onePath);
        if(deepRes.result){
          res.result = deepRes.result;
          res.data = deepRes.data;
          res.path = deepRes.path;
          break;
        }
      }
    }
  }
  return res;
}
// 树型对象数据批量查找   data 查询数据  recursiveKey 递归key  searchKey 查询key  searchVal 查询值   返回data为数组
function recursiveSearchArr({ data, recursiveKey, searchKey, searchVal }){
  var res = {
    result: false,
    data: []
  }
  if(Array.isArray(data)){
    for(var i = 0;i<data.length;i++){
      var one = data[i];
      if(one[searchKey] == searchVal){
        res.result = true;
        res.data.push(one);
      }
      if(Array.isArray(one[recursiveKey])){
        var deepRes = recursiveSearchArr({
          data: one[recursiveKey],
          recursiveKey: recursiveKey,
          searchKey: searchKey,
          searchVal: searchVal
        });
        if(deepRes.result){
          res.result = deepRes.result;
          res.data = res.data.concat(deepRes.data);
        }
      }
    }
  }
  return res;
}

// 类型检测
function typeofString(obj){
  var res = Object.prototype.toString.call(obj);
  var typeData = res.replace(/[\[\]]/g,'').split(' ');
  return typeData[1];
}

//获取指定名称的cookie的值
function getCookie(objName) {//获取指定名称的cookie的值
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split("=");
      if (temp[0] == objName) return unescape(temp[1]);  //解码
  }
  return "";
}

// // 说明
// function help(){
//   var help={
//     DateFormat:"格式化时间：yyyy-MM-dd hh:mm:ss,月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)",
//     dataURItoBlob:"传入base64字符串，将base64转成Blob二进制文件",
//     searchArr:"二维对象数组查询，searchArr(objArr,itemKey,val)  传入要查询的数组，查询的对象下标，比对值",
//     loadingFun:"加载时过渡gif",
//     loadingClose:"关闭过渡gif",
//     alertModelMsg:'提示信息，传入提示信息字符串，显示后的回调，显示时间 common.alertModelMsg("123456",function(){console.log(112374)},6000)',
//     confirmModel:'选择提示，传入提示标题，提示信息字符串，按键组名称，确定回调，取消回调 common.confirmModel("这是标题","这是内容提示",["确定","取消"],function(){console.log("这是成功回调")},function(){console.log("这是失败回调")});',
//     numFormat:'格式化数据，传入数据及要保留的位数'
//   }
// }

export default {
  dataURItoBlob: dataURItoBlob,
  searchArr: searchArr,
  getScrollTop: getScrollTop,
  getClientHeight: getClientHeight,
  getScrollHeight: getScrollHeight,
  loading: loading,
  numFormat: numFormat,
  calcStrWidth: calcStrWidth,
  getElementTop: getElementTop,
  deepCopy: deepCopy,
  typeofString: typeofString,
  recursiveSearch: recursiveSearch,
  recursiveSearchArr: recursiveSearchArr,
  getCookie: getCookie,
};
