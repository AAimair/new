// 查询参数配置
const searchOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: true, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: '登录地址',
      name: 'ipaddr',
      placeholder: '请输入登录地址',
      value: "",
      type: 'input'
    },{
      label: '用户名称',
      name: 'userName',
      placeholder: '请输入用户名称',
      value: "",
      type: 'input'
    },
  ]
}

const tableColumns = [
  {
    dataIndex: "idx",
    key: "idx",
    width: 50,
    title: "序号",
    align: 'center'
  },{
    dataIndex: "tokenId",
    key: "tokenId",
    width: 250,
    title: "会话编号",
    ellipsis: true,
    align: 'center'
  },{
    dataIndex: "userName",
    key: "userName",
    title: "登录名称",
    align: 'center'
  },{
    dataIndex: "deptName",
    key: "deptName",
    title: "部门名称",
    align: 'center'
  },{
    dataIndex: "ipaddr",
    key: "ipaddr",
    title: "主机",
    align: 'center'
  },{
    dataIndex: "loginLocation",
    key: "loginLocation",
    title: "登录地点",
    align: 'center'
  },{
    dataIndex: "browser",
    key: "browser",
    title: "浏览器",
    align: 'center'
  },{
    dataIndex: "os",
    key: "os",
    title: "操作系统",
    align: 'center'
  },{
    dataIndex: "loginTime",
    key: "loginTime",
    title: "登录时间",
    ellipsis: true,
    align: 'center',
    slots: { customRender: 'loginTime' },
  },{
    dataIndex: "action",
    key: "action",
    width: 120,
    title: "操作",
    align: 'center',
    slots: { customRender: 'action' },
  },
]

export {
  searchOptions,
  tableColumns
}