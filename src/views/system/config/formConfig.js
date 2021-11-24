// 查询表单配置
const searchFormOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  colon: false, // layout = horizontal 有效 label后是否有冒号
  form: [
    {
      label: '参数名称',
      name: 'configName',
      placeholder: '请输入参数名称',
      value: "",
      type: 'input'
    }, {
      label: '参数键名',
      name: 'configKey',
      placeholder: '请输入参数键名',
      value: "",
      type: 'input'
    }, {
      label: '系统内置',
      name: 'configType',
      placeholder: '请选择系统内置',
      value: "",
      options: [
        {label: '是', value: 'Y'},
        {label: '否', value: 'N'},
      ],
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }, {
      label: "创建时间",
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
  //   dataIndex: "configId",
  //   key: "configId",
  //   title: "参数主键",
  //   align: 'center'
  // },
  {
    dataIndex: "configName",
    key: "configName",
    title: "参数名称",
    align: 'center',
    ellipsis: true,
  }, {
    dataIndex: "configKey",
    key: "configKey",
    title: "参数键名",
    align: 'center',
    ellipsis: true,
  }, {
    dataIndex: "configValue",
    key: "configValue",
    title: "参数键值",
    align: 'center'
  }, {
    dataIndex: "configType",
    key: "configType",
    title: "系统内置",
    align: 'center',
    slots: {customRender: 'configType'}
  }, {
    dataIndex: "remark",
    key: "remark",
    ellipsis: true,
    title: "备注",
    align: 'center'
  }, {
    dataIndex: "createTime",
    key: "createTime",
    width: 180,
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
const dialogFromOptions = {
  titleShow: false,
  labelAlign: 'left',
  layout: 'horizontal',
  hideRequiredMark: false,
  colon: true, // layout = horizontal 有效 label后是否有冒号
  gutter: 10, // 表单块间隔
  form: [
    {
      label: 'ID',
      name: 'configId',
      value: "",
      type: 'input',
      span: '24',
      hidden: true
    },
    {
      label: '参数名称',
      name: 'configName',
      placeholder: '请输入参数名称',
      value: "",
      type: 'input',
      span: '24',
      rule: [
        {required: true, message: '请输入参数名称'}
      ],
    }, {
      label: '参数键名',
      name: 'configKey',
      placeholder: '请输入参数键名',
      value: "",
      type: 'input',
      span: '24',
      rule: [
        {required: true, message: '请输入参数键名'}
      ],
    }, {
      label: '参数键值',
      name: 'configValue',
      placeholder: '请输入参数键值',
      value: "",
      type: 'input',
      span: '24',
      rule: [
        {required: true, message: '请输入参数键值'}
      ],
    }, {
      label: '系统内置',
      name: 'configType',
      value: "",
      type: 'radioGroup',
      options: [
        {
          value: 'Y',
          label: '是',
        }, {
          value: 'N',
          label: '否',
        }
      ],
      span: '24'
    }, {
      label: '备注',
      name: 'remark',
      placeholder: '请输入内容',
      value: "",
      type: 'textarea',
      span: '24',
      a_attr: {
        autosize: {
          minRows: 3
        }
      },
    }
  ]
}

export {
  columns,
  searchFormOptions,
  dialogFromOptions
}