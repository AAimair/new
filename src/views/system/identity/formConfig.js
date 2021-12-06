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
        label: "主键",
        name: 'id',
        placeholder: '请输入主键',
        value: '',
        type: 'input',
      },
                  {
        label: "名称",
        name: 'name',
        placeholder: '请输入名称',
        value: '',
        type: 'input',
      },
                  {
        label: "别名",
        name: 'alias',
        placeholder: '请输入别名',
        value: '',
        type: 'input',
      },
                  {
        label: "规则",
        name: 'regulation',
        placeholder: '请输入规则',
        value: '',
        type: 'input',
      },
                  {
        label: "生成类型",
        name: 'genType',
        placeholder: '生成类型',
        value: '',
        options: [
          { label: '选项一', value: '0' },
          { label: '选项二', value: '1' },
        ],
        a_attr: {
          allowClear: true,
        },
        type: 'select',
      },
                  {
        label: "流水号长度",
        name: 'noLength',
        placeholder: '请输入流水号长度',
        value: '',
        type: 'input',
      },
                {
      label: "当前日期",
      span: 12,
      hidden: false,
      disabled: false,
      name: 'curData',
      placeholder: '当前日期',
      value: '',
      type: 'dateTime',
      format: 'YYYY/MM/DD HH|mm|ss',
      rule: [],
      change: function(){},
    },
                  {
        label: "初始值",
        name: 'initValue',
        placeholder: '请输入初始值',
        value: '',
        type: 'input',
      },
                  {
        label: "当前值",
        name: 'curValue',
        placeholder: '请输入当前值',
        value: '',
        type: 'input',
      },
                  {
        label: "步长",
        name: 'step',
        placeholder: '请输入步长',
        value: '',
        type: 'input',
      },
                  {
        label: "创建者",
        name: 'createBy',
        placeholder: '请输入创建者',
        value: '',
        type: 'input',
      },
                {
      label: "创建时间",
      span: 12,
      hidden: false,
      disabled: false,
      name: 'createTime',
      placeholder: '创建时间',
      value: '',
      type: 'dateTime',
      format: 'YYYY/MM/DD HH|mm|ss',
      rule: [],
      change: function(){},
    },
                  {
        label: "更新者",
        name: 'updateBy',
        placeholder: '请输入更新者',
        value: '',
        type: 'input',
      },
                {
      label: "更新时间",
      span: 12,
      hidden: false,
      disabled: false,
      name: 'updateTime',
      placeholder: '更新时间',
      value: '',
      type: 'dateTime',
      format: 'YYYY/MM/DD HH|mm|ss',
      rule: [],
      change: function(){},
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
      span: 24,
      hidden: false,
      label: "主键",
      name: 'id',
      placeholder: '请输入主键',
      value: '',
      type: 'input',
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "名称",
      name: 'name',
      placeholder: '请输入名称',
      value: '',
      type: 'input',
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "别名",
      name: 'alias',
      placeholder: '请输入别名',
      value: '',
      type: 'input',
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "规则",
      name: 'regulation',
      placeholder: '请输入规则',
      value: '',
      type: 'input',
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "生成类型",
      name: 'genType',
      placeholder: '生成类型',
      value: '',
      options: [
        { label: '选项一', value: '0' },
        { label: '选项二', value: '1' },
      ],
      a_attr: {
        allowClear: true,
      },
      type: 'select',
      rule: [
              ],
    },
                {
      span: 24,
      hidden: false,
      label: "流水号长度",
      name: 'noLength',
      placeholder: '请输入流水号长度',
      value: '',
      type: 'input',
            a_attr:{
        type: 'number',
      },
            rule: [
                ],
    },
                {
      label: "当前日期",
      span: 24,
      hidden: false,
      disabled: false,
      name: 'curData',
      placeholder: '当前日期',
      value: '',
      type: 'dateTime',
      format: 'YYYY/MM/DD HH|mm|ss',
      rule: [
              ],
      change: function(){},
    },
                {
      span: 24,
      hidden: false,
      label: "初始值",
      name: 'initValue',
      placeholder: '请输入初始值',
      value: '',
      type: 'input',
            a_attr:{
        type: 'number',
      },
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "当前值",
      name: 'curValue',
      placeholder: '请输入当前值',
      value: '',
      type: 'input',
            a_attr:{
        type: 'number',
      },
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "步长",
      name: 'step',
      placeholder: '请输入步长',
      value: '',
      type: 'input',
            a_attr:{
        type: 'number',
      },
            rule: [
                ],
    },
                {
      span: 24,
      hidden: false,
      label: "创建者",
      name: 'createBy',
      placeholder: '请输入创建者',
      value: '',
      type: 'input',
            rule: [
                ],
    },
                {
      label: "创建时间",
      span: 24,
      hidden: false,
      disabled: false,
      name: 'createTime',
      placeholder: '创建时间',
      value: '',
      type: 'dateTime',
      format: 'YYYY/MM/DD HH|mm|ss',
      rule: [
              ],
      change: function(){},
    },
                {
      span: 24,
      hidden: false,
      label: "更新者",
      name: 'updateBy',
      placeholder: '请输入更新者',
      value: '',
      type: 'input',
            rule: [
                ],
    },
                {
      label: "更新时间",
      span: 24,
      hidden: false,
      disabled: false,
      name: 'updateTime',
      placeholder: '更新时间',
      value: '',
      type: 'dateTime',
      format: 'YYYY/MM/DD HH|mm|ss',
      rule: [
              ],
      change: function(){},
    },
          ]
}

export default {
  topForm,
  tableRowForm,
}