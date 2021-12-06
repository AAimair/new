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
        }
    ]
}

const tableRowForm = {
    titleShow: false, //  表单块标题是否隐藏
    labelAlign: "right", // label对齐方式 left|right,
    layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'
    hideRequiredMark: false, // 是否隐藏必选标记
    a_attr: {
        labelCol: {style: {width: '70px'}}
    }, //  原antd组件属性
    colon: false, // layout = horizontal 有效 label后是否有冒号
    // gutter: 10, // 表单块间隔
    form: [
        {
            span: 24,
            hidden: true,
            label: "主键",
            name: 'id',
            placeholder: '请输入主键',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "名称",
            name: 'name',
            placeholder: '请输入名称',
            value: '',
            type: 'input',
            rule: [{
                required: true,
                message: '名称不能为空',
            },],
        },
        {
            span: 24,
            hidden: false,
            label: "别名",
            name: 'alias',
            placeholder: '请输入别名',
            value: '',
            type: 'input',
            rule: [{
                required: true,
                message: '别名不能为空',
            },],
        },
        {
            span: 24,
            hidden: false,
            label: "规则",
            name: 'regulation',
            placeholder: '请输入规则',
            value: '',
            type: 'input',
            rule: [{
                required: true,
                message: '规则不能为空',
            },],
        },
        {
            span: 24,
            type: 'custom',
            soltName: 'regulationDesc',
        },
        {
            span: 24,
            hidden: false,
            label: "生成类型",
            name: 'genType',
            placeholder: '生成类型',
            value: 0,
            options: [
                {label: '每天生成', value: 0},
                {label: '每月生成', value: 1},
                {label: '每年生成', value: 2},
                {label: '递增', value: 3},
            ],
            type: 'radioGroup',
            rule: [{
                required: true,
                message: '生成类型为空',
            },],
        },
        {
            span: 24,
            type: 'custom',
            soltName: 'genTypeDesc',
        },
        {
            span: 24,
            hidden: false,
            label: "流水号长度",
            name: 'noLength',
            placeholder: '请输入流水号长度',
            value: '',
            type: 'input',
            a_attr: {
                type: 'number',
            },
            rule: [],
        },
        {
            span: 24,
            type: 'custom',
            soltName: 'noLengthDesc',
        },
        {
            span: 24,
            hidden: false,
            label: "初始值",
            name: 'initValue',
            placeholder: '请输入初始值',
            value: '',
            type: 'input',
            a_attr: {
                type: 'number',
            },
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "步长",
            name: 'step',
            placeholder: '请输入步长',
            value: '',
            type: 'input',
            a_attr: {
                type: 'number',
            },
            rule: [],
        },
    ]
}

export default {
    topForm,
    tableRowForm,
}