import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import common from "../common/common_vue.js";



// 登陆页面
const Login = () => import('../views/login/login.vue');
// 主体页面
const Home = () => import('../views/home/home.vue');
console.log(Home)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

interface checkPathType {
  token: Array<string>,
  noLogin: Array<string>,
  jurisdiction: Array<string>,
}

// 验证模块路径
var checkPaths = <checkPathType>{
  // 必须验证token路由 
  token: [],
  // 要验证免登陆路由 
  noLogin: [],
  // 需要验证权限
  jurisdiction: []
}

router.beforeEach((to, from, next) => {
  // 从cookie中取一下，如cookie中与sessionStorage不一致，用cookie
  var cookieToken = common.getCookie('cookieToken');
  var token = sessionStorage.getItem('token');
  // 如有cookie且cookie里的token不同于sessionStorage，重置sessionStorage
  if (cookieToken && cookieToken != token) {
    sessionStorage['token'] = cookieToken;
    token = cookieToken;
  }

  // 是否需要验证token
  if (checkPaths.token.indexOf(to.path) != -1) {
    // 请求验证token
    if (token) {
      // 验证请求
      next();
    } else {
      // 没有token 跳转登陆
      next({
        path: "/login",
      });
    }
  } else {
    // 没有token 跳转登陆
    if(to.path == '/'){
      // 默认登陆
      next({
        path: "/login",
      });
    }else{
      next();
    }
  }
});


export default router
