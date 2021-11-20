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
      label: "岗位编码",
      name: 'postCode',
      placeholder: '请输入岗位编码',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "岗位名称",
      name: 'postName',
      placeholder: '请输入岗位名称',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "状态",
      name: 'status',
      placeholder: '岗位状态',
      value: '',
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      a_attr: {
        allowClear: true,
      },
      type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
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
      label: "postId",
      name: 'postId',
      value: null,
      hidden: true,
      span: 24,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "岗位名称",
      name: 'postName',
      placeholder: '请输入岗位名称',
      value: '',
      span: 24,
      rule: [
        { 
          required: true,
          message: '岗位名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "岗位编码",
      name: 'postCode',
      placeholder: '请输入岗位编码',
      value: '',
      span: 24,
      rule: [
        { 
          required: true,
          message: '岗位编码不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "岗位顺序",
      name: 'postSort',
      placeholder: '',
      value: '',
      span: 24,
      a_attr:{
        type: 'number',
      },
      rule: [
        { 
          required: true,
          message: '岗位顺序不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "岗位状态",
      name: 'status',
      value: '',
      span: 24,
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
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

export default {
  topForm,
  tableRowForm,
}