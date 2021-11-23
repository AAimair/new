// 上表查询参数配置
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
      label: '任务名称',
      name: 'jobName',
      placeholder: '请输入任务名称',
      value: "",
      type: 'input'
    }, {
      label: '任务组名',
      name: 'jobGroup',
      placeholder: '请选择任务组名',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }, {
      label: '任务状态',
      name: 'status',
      placeholder: '请选择任务状态',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    },
  ]
}

// 表格列配置
const tableColumns = [
  {
    dataIndex: "jobId",
    key: "jobId",
    width: 100,
    ellipsis: true,
    title: "任务编号",
    align: 'center'
  }, {
    dataIndex: "jobName",
    key: "jobName",
    title: "任务名称",
    width: 200,
    ellipsis: true,
    align: 'center'
  }, {
    dataIndex: "jobGroup",
    key: "jobGroup",
    title: "任务组名",
    align: 'center'
  }, {
    dataIndex: "invokeTarget",
    key: "invokeTarget",
    title: "调用目标字符串",
    ellipsis: true,
    align: 'center'
  }, {
    dataIndex: "cronExpression",
    key: "cronExpression",
    title: "cron执行表达式",
    ellipsis: true,
    align: 'center'
  }, {
    dataIndex: "status",
    key: "status",
    title: "状态",
    ellipsis: true,
    align: 'center',
    slots: {customRender: 'status'}
  }, {
    dataIndex: "action",
    key: "action",
    title: "操作",
    width: 250,
    align: 'center',
    slots: {customRender: 'action'}
  }
]

// 上表 添加/编辑 表单配置
const topFormOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'horizontal', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: false, // 是否隐藏必选标记
  colon: true, // layout = horizontal 有效 label后是否有冒号
  gutter: 10, // 表单块间隔
  form: [
    {
      label: "任务Id",
      name: 'jobId',
      type: 'input',
      hidden: true,
      span: 24,
    }, {
      label: "任务名称",
      name: 'jobName',
      type: 'input',
      placeholder: '请输入任务名称',
      span: 12,
      rule: [
        {required: true, message: "请输入任务名称"}
      ]
    }, {
      label: "任务分组",
      name: 'jobGroup',
      placeholder: '请选择任务分组',
      span: 12,
      type: 'select',
      getOptions: null
    }, {
      label: "调用方法",
      name: 'invokeTarget',
      placeholder: '请输入调用目标字符串',
      span: 24,
      type: 'input',
      rule: [
        {required: true, message: "请输入任务名称"}
      ]
    }, {
      label: "cron表达式",
      name: 'cronExpression',
      placeholder: '请输入cron执行表达式',
      span: 24,
      type: 'input',
      rule: [
        {required: true, message: "请输入任务名称"}
      ],
      suffix: {
        type: 'btn',  // btn/text
        // icon: 'ClockCircleOutlined',
        size: 12,
        text: '生成表达式',
        click: null
      },
    }, {
      label: "错误策略",
      name: 'misfirePolicy',
      span: 24,
      type: 'radioGroup',
      rule: [
        {required: true, message: "请选择错误策略"}
      ],
      options: [
        {
          value: "1",
          label: '立即执行',
          disabled: false,

        }, {
          value: "2",
          label: '执行一次',
          disabled: false,
        }, {
          value: "3",
          label: '放弃执行',
          disabled: false,
        }
      ]
    }, {
      label: "是否并发",
      name: 'concurrent',
      span: 12,
      type: 'radioGroup',
      rule: [
        {required: true, message: "请选择是否并发"}
      ],
      options: [
        {
          value: "0",
          label: '允许',
          disabled: false,
        }, {
          value: "1",
          label: '禁止',
          disabled: false,
        }
      ]
    }, {
      label: "状态",
      name: 'status',
      span: 12,
      type: 'radioGroup',
      getOptions: null,
      rule: [
        {required: true, message: "请选择状态"}
      ],
    }
  ]
}

// 上表 查看 表单
const topFormView = JSON.parse(JSON.stringify(topFormOptions))
topFormView.form.forEach(item => {
  item.disabled = true;
  item.hidden = false;
  item.suffix = undefined
})

// 下表查询参数配置
const bottomSearchOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'inline', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: '任务名称',
      name: 'jobName',
      placeholder: '请输入任务名称',
      value: "",
      type: 'input'
    }, {
      label: '任务组名',
      name: 'jobGroup',
      placeholder: '请选择任务组名',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select'
    }, {
      label: '执行状态',
      name: 'status',
      placeholder: '请选择执行状态',
      value: "",
      getOptions: null,
      a_attr: {
        allowClear: true,
      },
      type: 'select',
    }, {
      label: "执行时间",
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

// 下表列配置
const bottomTableColumns = [
  {
    dataIndex: "jobLogId",
    key: "jobLogId",
    width: 100,
    ellipsis: true,
    title: "日志编号",
    align: 'center'
  }, {
    dataIndex: "jobName",
    key: "jobName",
    width: 200,
    ellipsis: true,
    title: "任务名称",
    align: 'center'
  }, {
    dataIndex: "jobGroup",
    key: "jobGroup",
    title: "任务组名",
    align: 'center'
  }, {
    dataIndex: "invokeTarget",
    key: "invokeTarget",
    title: "调用目标字符串",
    align: 'center'
  }, {
    dataIndex: "jobMessage",
    key: "jobMessage",
    title: "日志信息",
    width: 200,
    ellipsis: true,
    align: 'center'
  }, {
    dataIndex: "status",
    key: "status",
    title: "执行状态",
    align: 'center',
    slots: {customRender: 'status'}
  }, {
    dataIndex: "createTime",
    key: "createTime",
    width: 200,
    ellipsis: true,
    title: "执行时间",
    align: 'center'
  }, {
    dataIndex: "action",
    key: "action",
    width: 100,
    title: "操作",
    align: 'center',
    slots: {customRender: 'action'}
  },
]

// 下表查看详细表单配置
const bottomViewOptions = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: 'left', // label对齐方式 left|right,
  layout: 'horizontal', // 表单布局 'horizontal'|'vertical'|'inline'
  hideRequiredMark: true, // 是否隐藏必选标记
  colon: false, // layout = horizontal 有效 label后是否有冒号
  gutter: 10, // 表单块间隔
  form: [
    {
      label: '日志序号',
      name: 'jobLogId',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '任务名称',
      name: 'jobName',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '任务分组',
      name: 'jobGroup',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '执行时间',
      name: 'createTime',
      value: "",
      type: 'input',
      disabled: true,
      span: 12,
    }, {
      label: '调用方法',
      name: 'invokeTarget',
      value: "",
      type: 'input',
      disabled: true,
      span: 24,
    }, {
      label: '日志信息',
      name: 'jobMessage',
      value: "",
      type: 'input',
      disabled: true,
      span: 24,
    }, {
      label: '执行状态',
      name: 'status',
      value: "",
      type: 'input',
      disabled: true,
      span: 24,
    }, {
      label: '异常信息',
      name: 'exceptionInfo',
      value: "",
      type: 'textarea',
      disabled: true,
      span: 24,
    }
  ]
}

export {
  searchOptions,
  tableColumns,
  topFormOptions,
  topFormView,
  bottomSearchOptions,
  bottomTableColumns,
  bottomViewOptions
}