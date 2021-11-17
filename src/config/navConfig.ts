// 主页
const indexPage = () => import("../views/index/index.vue");
// alpIcon图标列表
const alpIcon = () => import("../views/basic/svgIcon.vue");

// 岗位管理
const systemPost = () => import("../views/system/post/index.vue");
// 部门管理 
const systemDept = () => import("../views/system/dept/index.vue");

// 组件模块列表
const componentMap = {
  index: indexPage,
  alpIcon: alpIcon,
  post: systemPost,
  dept: systemDept,
}

// 模块图片
const modulePics = {
  1: require('../assets/projectPic/1.png'),
  2: require('../assets/projectPic/2.png'),
  3: require('../assets/projectPic/3.png'),
  4: require('../assets/projectPic/4.png'),
  5: require('../assets/projectPic/5.png'),
  6: require('../assets/projectPic/6.png'),
  7: require('../assets/projectPic/7.png'),
  8: require('../assets/projectPic/8.png'),
}

export default {
  // navConfg: navConfg,
  // 组件map
  componentMap,
  // 模块大图
  modulePics,
}