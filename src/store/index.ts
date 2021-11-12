import { createStore } from 'vuex'

export default createStore({
  state: {
    // 用户基本信息
    userInfo: null,
    // 用户角色
    userRoles: null,
    // 用户权限
    userPermissions: null,
    // 路由菜单
    routerMenu: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
