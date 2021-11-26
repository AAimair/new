const topForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "left", // label对齐方式 left|right,
  layout: "inline", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [{
    label: "用户名称",
    name: 'userName',
    placeholder: '请输入用户名称',
    value: '',
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
  }, {
    label: "手机号码",
    name: 'phonenumber',
    placeholder: '请输入手机号码',
    value: '',
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
  }, {
    label: "状态",
    name: 'status',
    placeholder: '角色状态',
    value: '',
    options: [{
        label: '正常',
        value: '0'
      },
      {
        label: '停用',
        value: '1'
      },
    ],
    a_attr: {
      allowClear: true,
    },
    type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
  }, {
    label: "创建时间",
    class: "createStartTime",
    name: 'params[beginTime]',
    format: 'YYYY-MM-DD',
    value: '',
    type: 'dateTime', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
  }, {
    label: "-",
    name: 'params[endTime]',
    format: 'YYYY-MM-DD',
    value: '',
    type: 'dateTime', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
  }, ]
}

const tableRowForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: {
      style: {
        width: '70px'
      }
    }
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [{
    label: "userId",
    name: 'userId',
    value: null,
    hidden: true,
    span: 24,
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "用户昵称",
    name: 'nickName',
    placeholder: '',
    value: '',
    span: 12,
    rule: [{
      required: true,
      message: '用户昵称不能为空',
    }],
    type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    // label: "归属部门",
    soltName: 'dept',
    span: 12,
    type: 'custom', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "手机号码",
    name: 'phonenumber',
    placeholder: '请输入手机号码',
    value: '',
    rule: [{
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: ['change']
    }],
    span: 12,
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "邮箱",
    name: 'email',
    placeholder: '请输入邮箱',
    value: '',
    rule: [{
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: "'请输入正确的邮箱地址",
      trigger: ['change']
    }],
    span: 12,
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "用户名称",
    name: 'userName',
    placeholder: '请输入用户名称',
    value: '',
    span: 12,
    rule: [{
        required: true,
        message: '用户名称不能为空',
      },
      {
        min: 2,
        max: 20,
        message: '用户名称长度必须介于 2 和 20 之间',
        trigger: ['change']
      }
    ],
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "用户密码",
    name: 'password',
    placeholder: '请输入用户密码',
    value: '',
    span: 12,
    rule: [{
        required: true,
        message: '用户密码不能为空',
      },
      {
        min: 5,
        max: 20,
        message: '用户密码长度必须介于 5 和 20 之间',
        trigger: ['change']
      }
    ],
    a_attr: {
      type: 'password'
    },
    type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "用户性别",
    name: 'sex',
    value: '',
    span: 12,
    options: [],
    type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "状态",
    name: 'status',
    value: '',
    span: 12,
    options: [{
        label: '正常',
        value: '0'
      },
      {
        label: '停用',
        value: '1'
      },
    ],
    type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "岗位",
    name: 'postIds',
    value: '',
    span: 12,
    options: [],
    rule: [{
      required: true,
      message: '岗位不能为空',
    }],
    a_attr: {
      mode: 'multiple'
    },
    type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "角色",
    name: 'roleIds',
    value: '',
    span: 12,
    options: [],
    rule: [{
      required: true,
      message: '角色不能为空',
    }],
    a_attr: {
      mode: 'multiple'
    },
    type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }, {
    label: "备注",
    name: 'remark',
    value: '',
    span: 24,
    a_attr: {
      rows: "4"
    },
    type: 'textarea', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
  }]
}

export default {
  topForm,
  tableRowForm,
}