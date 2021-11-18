const mainForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '70px' } }
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  gutter: 10, // 表单块间隔
  form: [
    {
      label: "deptId",
      name: 'deptId',
      value: null,
      hidden: true,
      span: 12,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      type: 'custom',
      soltName: 'deptTree',
      span: 12,
      offset: 3,
    },{
      label: "部门名称",
      name: 'deptName',
      placeholder: '请输入部门名称',
      value: '',
      span: 12,
      offset: 3,
      rule: [
        { 
          required: true,
          message: '部门名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "显示顺序",
      name: 'orderNum',
      placeholder: '',
      value: '',
      span: 12,
      offset: 3,
      a_attr:{
        type: 'number',
      },
      rule: [
        { 
          required: true,
          message: '显示顺序不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "负责人",
      name: 'leader',
      placeholder: '',
      value: '',
      span: 12,
      offset: 3,
      a_attr:{
      },
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "联系电话",
      name: 'phone',
      placeholder: '',
      value: '',
      span: 12,
      offset: 3,
      a_attr:{
        type: 'number',
      },
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "邮箱",
      name: 'email',
      placeholder: '',
      value: '',
      span: 12,
      offset: 3,
      a_attr:{
      },
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "部门状态",
      name: 'status',
      value: '',
      span: 12,
      offset: 3,
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      type: 'custom',
      soltName: 'formBtn',
      span: 12,
      offset: 3,
    },
  ]
}

export default {
  mainForm,
}