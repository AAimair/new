// 查询表单配置
const searchFormOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  colon: false, // layout = horizontal 有效 label后是否有冒号
  form: [
    {
      label: '公告标题',
      name: 'noticeTitle',
      placeholder: '请输入公告标题',
      value: "",
      type: 'input'
    }, {
      label: '操作人员',
      name: 'createBy',
      placeholder: '请输入操作人员',
      value: "",
      type: 'input'
    }, {
      label: '类型',
      name: 'noticeType',
      placeholder: '公告类型',
      value: "",
     getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }
  ]
}

// 表格列配置
const columns = [
  // {
  //   dataIndex: "noticeId",
  //   key: "noticeId",
  //   title: "序号",
  //   align: 'center'
  // },
  {
    dataIndex: "noticeTitle",
    key: "noticeTitle",
    title: "公告标题",
    align: 'center',
    ellipsis: true,
  }, {
    dataIndex: "noticeType",
    key: "noticeType",
    title: "公告类型",
    align: 'center',
    width: 100,
    slots: {customRender: 'noticeType'}
  }, {
    dataIndex: "status",
    key: "status",
    title: "状态",
    align: 'center',
    width: 100,
    slots: {customRender: 'status'}
  }, {
    dataIndex: "createBy",
    key: "createBy",
    title: "创建者",
    align: 'center',
    width: 100,
  }, {
    dataIndex: "createTime",
    key: "createTime",
    width: 150,
    ellipsis: true,
    title: "创建时间",
    align: 'center'
  }, {
    dataIndex: "action",
    key: "action",
    title: "操作",
    align: 'center',
    width: 200,
    slots: {customRender: 'action'}
  },
]

// 添加/修改 弹窗
const dialogFormOptions = {
  titleShow: false,
  labelAlign: 'left',
  layout: 'horizontal',
  hideRequiredMark: false,
  colon: true, // layout = horizontal 有效 label后是否有冒号
  gutter: 10, // 表单块间隔
  form: [
    {
      label: 'ID',
      name: 'noticeId',
      value: "",
      type: 'input',
      span: '24',
      hidden: true
    },
    {
      label: '公告标题',
      name: 'noticeTitle',
      placeholder: '请输入公告标题',
      value: "",
      type: 'input',
      span: '12',
      rule: [
        {required: true, message: '请输入公告标题'}
      ],
    }, {
      label: '公告类型',
      name: 'noticeType',
      placeholder: '请选择',
      value: "",
      type: 'select',
      span: '12',
      getOptions: null,
      rule: [
        {required: true, message: '请选择公告类型'}
      ],
    }, {
      label: '状态',
      name: 'status',
      value: "",
      type: 'radioGroup',
      getOptions: null,
      span: '24'
    }, {
      label: '内容',
      name: 'noticeContent',
      value: "",
      type: 'custom',
      span: '24',
      soltName: 'noticeContent'
    }
  ]
}

export {
  columns,
  searchFormOptions,
  dialogFormOptions
}