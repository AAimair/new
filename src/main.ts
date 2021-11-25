import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from "./common/common_vue.js"
import download from "./common/download.js";
import md5 from 'blueimp-md5';
import * as echarts from 'echarts';

const app  = createApp(App);
// alpUI  
import AlpUI from 'alp-ui';
import "alp-ui/dist/alp-ui.css"

// 服务器地址配置文件
import serverConfig from './common/serverConfig';
app.config.globalProperties.$serverConfig = serverConfig;
// 封装axois
import requestConfig from './common/requireConfig.js';
// axios
app.config.globalProperties.$axios = requestConfig.http;
app.config.globalProperties.$axiosFile = requestConfig.httpForm;
// ECharts
app.config.globalProperties.$echarts = echarts;
// common 通用方法
app.config.globalProperties.$common = common;
app.config.globalProperties.$loading = common.loading;
app.config.globalProperties.$download = download;

// md5
app.config.globalProperties.$md5 = md5;

(window as any).$_alp = app;

app.use(AlpUI);
app.use(store);
app.use(router)
app.mount('#app');
