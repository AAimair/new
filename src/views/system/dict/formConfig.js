// 顶部表格查询栏 搜索表单
const topSearchForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "left", // label对齐方式 left|right,
  layout: "inline", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "字典名称",
      name: 'dictName',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "字典类型",
      name: 'dictType',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "状态",
      name: 'status',
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
      name: 'params[beginTime]',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "-",
      name: 'params[endTime]',
      format: 'YYYY-MM-DD',
      value: '',
      type: 'dateTime', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },
  ]
};
// 底部表格查询栏 搜索表单
const bottomSearchForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "left", // label对齐方式 left|right,
  layout: "inline", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    // {
    //   label: "字典名称",
    //   name: 'postCode',
    //   value: '',
    //   type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    // },
    {
      label: "字典标签",
      name: 'dictLabel',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "状态",
      name: 'status',
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
};
// 字典类型表单
const dictTypeForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '70px' } },
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "字典dictId名称",
      name: 'dictId',
      hidden: true,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "字典名称",
      name: 'dictName',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
      rule: [
        { required: true, message: "字典名称不能为空" }
      ]
    },{
      label: "字典类型",
      name: 'dictType',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
      rule: [
        { required: true, message: "字典类型不能为空" }
      ]
    },{
      label: "状态",
      name: 'status',
      value: '0',
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      a_attr: {
        allowClear: true,
      },
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "备注",
      name: 'remark',
      value: '',
      type: 'textarea', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },
  ]
}
// 字典数据表单
const dictDataForm = {
  
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '70px' } },
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "dictCode",
      name: 'dictCode',
      value: '',
      hidden: true,
      disabled: true,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "字典类型",
      name: 'dictType',
      value: '',
      disabled: true,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "数据标签",
      name: 'dictLabel',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
      rule: [
        { required: true, message: "数据标签不能为空" }
      ]
    },{
      label: "数据键值",
      name: 'dictValue',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
      rule: [
        { required: true, message: "数据键值不能为空" }
      ]
    },{
      label: "样式属性",
      name: 'cssClass',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
      
    },{
      label: "显示排序",
      name: 'dictSort',
      value: 0,
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
      a_attr:{
        type: 'number'
      },
      rule: [
        { required: true, message: "数据顺序不能为空" }
      ]
    },{
      label: "回显样式",
      name: 'listClass',
      value: 'default',
      options: [
        { label: '默认', value: 'default' },
        { label: '主要', value: 'primary' },
        { label: '成功', value: 'success' },
        { label: '信息', value: 'info' },
        { label: '警告', value: 'warning' },
        { label: '危险', value: 'danger' },
      ],
      type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "状态",
      name: 'status',
      value: '0',
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      a_attr: {
        allowClear: true,
      },
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "备注",
      name: 'remark',
      value: '',
      type: 'textarea', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },
  ]
}



export default {
  topSearchForm,
  bottomSearchForm,

  dictTypeForm,
  dictDataForm,
}