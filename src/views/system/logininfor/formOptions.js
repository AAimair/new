// 查询表单配置
const searchFormOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  colon: false, // layout = horizontal 有效 label后是否有冒号
  form: [
    {
      label: '登录地址',
      name: 'ipaddr',
      placeholder: '请输入登录地址',
      value: "",
      type: 'input'
    }, {
      label: '用户名称',
      name: 'userName',
      placeholder: '请输入用户名称',
      value: "",
      type: 'input'
    }, {
      label: '状态',
      name: 'status',
      placeholder: '请选择登录状态',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }, {
      label: "登录时间",
      class: "createStartTime",
      name: 'beginTime',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime',
    }, {
      label: "-",
      name: 'endTime',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime',
    },
  ]
}

// 表格列配置
const columns = [
  // {
  //   dataIndex: "infoId",
  //   key: "infoId",
  //   title: "访问编号",
  //   align: 'center'
  // },
  {
    dataIndex: "userName",
    key: "userName",
    ellipsis: true,
    title: "用户名称",
    align: 'center',
    sorter: true
  }, {
    dataIndex: "ipaddr",
    key: "ipaddr",
    width: 130,
    title: "登录地址",
    align: 'center',
  }, {
    dataIndex: "loginLocation",
    key: "loginLocation",
    ellipsis: true,
    title: "登录地点",
    align: 'center'
  }, {
    dataIndex: "browser",
    key: "browser",
    ellipsis: true,
    title: "浏览器",
    align: 'center'
  }, {
    dataIndex: "os",
    key: "os",
    title: "操作系统",
    align: 'center'
  }, {
    dataIndex: "status",
    key: "status",
    title: "登录状态",
    align: 'center',
    slots: {customRender: 'status'}
  }, {
    dataIndex: "msg",
    key: "msg",
    title: "操作信息",
    align: 'center',
  }, {
    dataIndex: "loginTime",
    key: "loginTime",
    title: "登录日期",
    align: 'center',
    sorter: true
  }
]

export {
  columns,
  searchFormOptions
}