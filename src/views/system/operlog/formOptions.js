// 查询表单配置
const searchFormOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  colon: false, // layout = horizontal 有效 label后是否有冒号
  form: [
    {
      label: '系统模块',
      name: 'title',
      placeholder: '请输入系统模块',
      value: "",
      type: 'input'
    }, {
      label: '操作人员',
      name: 'operName',
      placeholder: '请输入操作人员',
      value: "",
      type: 'input'
    }, {
      label: '类型',
      name: 'businessType',
      placeholder: '请选择操作类型',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }, {
      label: '状态',
      name: 'status',
      placeholder: '请选择状态',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }, {
      label: "操作时间",
      class: "createStartTime",
      name: 'params[beginTime]',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime',
    }, {
      label: "-",
      name: 'params[endTime]',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime',
    },
  ]
}

// 表格列配置
const columns = [
  // {
  //   dataIndex: "operId",
  //   key: "operId",
  //   ellipsis: true,
  //   title: "日志编号",
  //   align: 'center'
  // },
  {
    dataIndex: "title",
    key: "title",
    title: "系统模块",
    align: 'center'
  }, {
    dataIndex: "businessType",
    key: "businessType",
    title: "操作类型",
    align: 'center',
    slots: {customRender: 'type'}
  }, {
    dataIndex: "requestMethod",
    key: "businessType",
    title: "请求方式",
    align: 'center'
  }, {
    dataIndex: "operName",
    key: "operName",
    width: 100,
    ellipsis: true,
    title: "操作人员",
    align: 'center',
    sorter: true
  }, {
    dataIndex: "operIp",
    key: "operIp",
    width: 130,
    ellipsis: true,
    title: "操作地址",
    align: 'center'
  }, {
    dataIndex: "operLocation",
    key: "operLocation",
    width: 130,
    ellipsis: true,
    title: "操作地点",
    align: 'center'
  }, {
    dataIndex: "status",
    key: "status",
    title: "操作状态",
    align: 'center',
    slots: {customRender: 'status'}
  }, {
    dataIndex: "operTime",
    key: "operTime",
    title: "操作日期",
    align: 'center',
    sorter: true
  }, {
    dataIndex: "action",
    key: "action",
    title: "操作",
    align: 'center',
    slots: {customRender: 'action'}
  },
]

// 详细表单配置
const detailFormOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'horizontal', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  colon: false, // layout = horizontal 有效 label后是否有冒号
  gutter: 10, // 表单块间隔
  form: [
    {
      label: '操作模块：',
      name: 'title',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '登录信息：',
      name: 'operIp',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '请求地址：',
      name: 'operUrl',
      value: "",
      type: 'textarea',
      disabled: true,
      span: 12,
    }, {
      label: '请求方式：',
      name: 'requestMethod',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '操作方法：',
      name: 'method',
      value: "",
      type: 'textarea',
      disabled: true,
      span: 24,
    }, {
      label: '请求参数：',
      name: 'operParam',
      value: "",
      type: 'textarea',
      disabled: true,
      span: 24,
    }, {
      label: '返回参数：',
      name: 'jsonResult',
      value: "",
      type: 'textarea',
      disabled: true,
      span: 24,
    }, {
      label: '操作状态：',
      name: 'status',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '操作时间：',
      name: 'operTime',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '异常信息：',
      name: 'errorMsg',
      value: "",
      type: 'textarea',
      disabled: true,
      span: 24,
    }
  ]
}

export {
  columns,
  searchFormOptions,
  detailFormOptions
}