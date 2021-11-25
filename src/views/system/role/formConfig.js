const topForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "left", // label对齐方式 left|right,
  layout: "inline", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "角色名称",
      name: 'roleName',
      placeholder: '请输入角色名称',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "权限字符",
      name: 'roleKey',
      placeholder: '请输入权限字符',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "状态",
      name: 'status',
      placeholder: '角色状态',
      value: '',
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      a_attr: {
        allowClear: true,
      },
      type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "创建时间",
      class: "createStartTime",
      name: 'beginTime',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "-",
      name: 'endTime',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },
  ]
}

const tableRowForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '70px' } }
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "roleId",
      name: 'roleId',
      value: null,
      hidden: true,
      span: 24,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "角色名称",
      name: 'roleName',
      placeholder: '请输入角色名称',
      value: '',
      span: 24,
      rule: [
        { 
          required: true,
          message: '角色名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "权限字符",
      name: 'roleKey',
      placeholder: '请输入权限字符',
      value: '',
      span: 24,
      rule: [
        { 
          required: true,
          message: '权限字符不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "角色顺序",
      name: 'roleSort',
      placeholder: '',
      value: '',
      span: 24,
      a_attr:{
        type: 'number',
      },
      rule: [
        { 
          required: true,
          message: '角色顺序不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "状态",
      name: 'status',
      value: '',
      span: 24,
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    }, {
      // 菜单权限
      span: 24,
      type: 'custom',
      soltName: 'menuLimit'
    },{
      label: "备注",
      name: 'remark',
      value: '',
      span: 24,
      a_attr: {
        rows: "4"
      },
      type: 'textarea', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    }
  ]
}

const limitForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '70px' } }
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "roleId",
      name: 'roleId',
      value: null,
      hidden: true,
      span: 12,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "角色名称",
      name: 'roleName',
      placeholder: '请输入角色名称',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '角色名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "权限字符",
      name: 'roleKey',
      placeholder: '请输入权限字符',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '权限字符不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "权限范围",
      name: 'dataScope',
      placeholder: '',
      value: '',
      span: 12,
      options: [],
      type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      // 数据权限
      span: 24,
      type: 'custom',
      soltName: 'dataLimit'
    }
  ]
}

export default {
  topForm,
  tableRowForm,
  limitForm,
}