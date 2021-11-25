// 主页
const indexPage = () => import("../views/index/index.vue");
// alpIcon图标列表
const alpIcon = () => import("../views/basic/svgIcon.vue");

// 岗位管理
const systemPost = () => import("../views/system/post/index.vue");
// 部门管理 
const systemDept = () => import("../views/system/dept/index.vue");
// 字典管理
const systemDict = () => import("../views/system/dict/index.vue");
// 参数设置
const systemConfig = () => import("../views/system/config/index.vue");
// 公告通知
const systemNotice = () => import("../views/system/notice/index.vue");
// 操作日志
const systemOperlog = () => import("../views/system/operlog/index.vue");
// 登录日志
const systemLogininfor = () => import("../views/system/logininfor/index.vue");

//------- 系统监控 -----------//
// 在线用户
const monitorOnline = () => import("../views/monitor/online/index.vue");
// 定时任务
const monitorJob = () => import("../views/monitor/job/index.vue");
// 数据监控
const monitorDruid = () => import("../views/monitor/druid/index.vue");
// 服务监控
const monitorServer = () => import("../views/monitor/server/index.vue");
// 缓存监控
const monitorCache = () => import("../views/monitor/cache/index.vue");

// 代码生成
const toolGen = () => import("../views/tool/gen/index.vue");

//------- 系统工具 -----------//
// const toolSwagger = () => import("../views/tool/swagger/index.vue");

// 组件模块列表
const componentMap = {
  index: indexPage,
  alpIcon: alpIcon,
  post: systemPost,
  dept: systemDept,
  config: systemConfig,
  notice: systemNotice,
  operlog:systemOperlog,
  logininfor: systemLogininfor,
  online: monitorOnline,
  job: monitorJob,
  druid: monitorDruid,
  server: monitorServer,
  cache: monitorCache,
  dict: systemDict,
  gen: toolGen,
  // swagger: toolSwagger,
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