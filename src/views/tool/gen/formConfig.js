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
      label: "表名称",
      name: 'tableName',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "表描述",
      name: 'tableComment',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
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

// 导入表格查询栏
const importSearchForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "left", // label对齐方式 left|right,
  layout: "inline", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: true, // 是否隐藏必选标记
  // a_attr: {}, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "表名称",
      name: 'tableName',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      label: "表描述",
      name: 'tableComment',
      value: '',
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom
    },{
      type: 'custom',
      soltName: 'btns'
    }
  ]
};

// 基本信息表单
const basicForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '120px' } }
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "表名称",
      name: 'tableName',
      placeholder: '请输入表名称',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '表名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "表描述",
      name: 'tableComment',
      placeholder: '请输入表描述',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '表描述不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "实体类名称",
      name: 'className',
      placeholder: '',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '实体类名称不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "作者",
      name: 'functionAuthor',
      placeholder: '',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '作者不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
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

// 生成信息表单
const buildForm = {
  titleShow: false, //  表单块标题是否隐藏
  labelAlign: "right", // label对齐方式 left|right,
  layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'  
  hideRequiredMark: false, // 是否隐藏必选标记
  a_attr: {
    labelCol: { style: { width: '120px' } }
  }, //  原antd组件属性
  colon: false, // layout = horizontal 有效 label后是否有冒号
  // gutter: 10, // 表单块间隔
  form: [
    {
      label: "生成模板",
      name: 'tplCategory',
      placeholder: '请输入生成模板',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '生成模板不能为空',
        },
      ],
      type: 'select', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
      change: function(data){
        // 树表/主子表  其他配置
        data.form[8].hidden = true;
        data.form[9].hidden = true;
        if(data.value == 'tree'){
          data.form[8].hidden = false;
        }else if(data.value == 'sub'){
          data.form[9].hidden = false;
        }
      },
      options: [
        { label: '单表（增删改查）', value: 'crud' },
        { label: '树表（增删改查）', value: 'tree' },
        { label: '主子表（增删改查）', value: 'sub' },
      ],
    },{
      label: "生成包路径",
      name: 'packageName',
      placeholder: '请输入生成包路径',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '生成包路径不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "生成模块名",
      name: 'moduleName',
      placeholder: '',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '生成模块名不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "生成业务名",
      name: 'businessName',
      placeholder: '',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '生成业务名不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      label: "生成功能名",
      name: 'functionName',
      placeholder: '',
      value: '',
      span: 12,
      rule: [
        { 
          required: true,
          message: '生成功能名不能为空',
        },
      ],
      type: 'input', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
    },{
      //  上级菜单
      span: 12,
      type: 'custom', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
      soltName: 'superior',
    },{
      label: "生成代码方式",
      name: 'genType',
      value: '',
      span: 12,
      type: 'radioGroup', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea
      options: [
        { label: 'zip压缩包', value: '0' },
        { label: '自定义路径', value: '1' },
      ],
      change: function(data){
        // console.log(data);
        data.form[7].hidden = data.value === '0';
      }
    },{
      label: "自定义路径",
      name: 'genPath',
      placeholder: '',
      value: '',
      span: 24,
      hidden: true,
      type: 'input', 
    },{
      //  树表  其他表单数据
      span: 24,
      hidden: true,
      type: 'custom', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
      soltName: 'tree',
    },{
      //  主子表  关联信息
      span: 24,
      hidden: true,
      type: 'custom', // input/select/dateMonth/dateWeek/dateTime/radioGroup/treeSelect/checkboxGroup/custom/textarea 
      soltName: 'sub',
    }
  ]
}

export default {
  topSearchForm,
  importSearchForm,
  basicForm,
  buildForm,
}