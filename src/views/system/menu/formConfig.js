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
      label: "菜单类型",
      name: 'menuType',
      value: '',
      span: 12,
      offset: 3,
      rule: [
        { 
          required: true,
          message: '菜单类型不能为空',
        },
      ],
      options: [
        { label: '目录', value: 'M' },
        { label: '菜单', value: 'C' },
        // { label: '按钮', value: 'F' },
      ],
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      // 上级菜单
      type: 'custom',
      soltName: 'menuTree',
      span: 12,
      offset: 3,
    },{
      // 菜单图标
      type: 'custom',
      soltName: 'icon',
      span: 12,
      offset: 3,
    },{
      // 目录大图/模块展示图标
      type: 'custom',
      soltName: 'pic',
      span: 21,
      offset: 3,
    },{
      label: "菜单名称",
      name: 'menuName',
      placeholder: '',
      value: '',
      span: 12,
      offset: 3,
      rule: [
        { 
          required: true,
          message: '菜单名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "显示排序",
      name: 'orderNum',
      placeholder: '',
      value: '',
      span: 12,
      offset: 3,
      rule: [
        { 
          required: true,
          message: '显示排序不能为空',
        },
      ],
      a_attr: {
        type: 'number'
      },
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },
    {
      label: "目录描述",
      name: 'remark',
      hidden: true,
      value: '',
      hidden: true,
      span: 12,
      offset: 3,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "是否外链",
      name: 'isFrame',
      value: '',
      span: 12,
      offset: 3,
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
      change: function(data){
        // console.log(data)
        data.form[8].hidden = data.value !== '0';
        // data.form[]
      },
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },
    {
      label: "外链地址",
      name: 'remark_link',
      value: '',
      hidden: true,
      span: 12,
      offset: 3,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },
    {
      label: "模块关键字",
      name: 'path',
      value: '',
      span: 12,
      offset: 3,
      rule: [
        { 
          required: true,
          message: '模块关键字不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },
    {
      label: "权限字符",
      name: 'perms',
      value: '',
      span: 12,
      offset: 3,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "模块参数",
      name: 'query',
      value: '',
      span: 12,
      offset: 3,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },
    // {
    //   label: "是否缓存",
    //   name: 'isCache',
    //   value: '',
    //   span: 12,
    //   offset: 3,
    //   options: [
    //     { label: '是', value: '0' },
    //     { label: '否', value: '1' },
    //   ],
    //   type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    // },
    {
      label: "显示状态",
      name: 'visible',
      value: '',
      span: 12,
      offset: 3,
      options: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' },
      ],
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "菜单状态",
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
    {
      label: "menuId",
      name: 'menuId',
      value: '',
      hidden: true,
      span: 12,
      offset: 3,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },
  ]
}

export default {
  mainForm,
}