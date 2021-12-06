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
            label: "系统名称",
            name: 'subsysName',
            placeholder: '请输入系统名称',
            value: '',
            type: 'input',
        },
        {
            label: "系统别名",
            name: 'alias',
            placeholder: '请输入系统别名',
            value: '',
            type: 'input',
        },
        {
            label: "本地系统",
            name: 'isLocal',
            placeholder: '是否本地系统',
            value: '',
            type: 'select',
            options: [
                { label: '是', value: 'Y' },
                { label: '否', value: 'N' },
            ],
            a_attr: {
                allowClear: true,
            },
        }
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
            hidden: true,
            label: "主键",
            name: 'subsysId',
            placeholder: '请输入主键',
            value: '',
            type: 'input',
            rule: [
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "系统名称",
            name: 'subsysName',
            placeholder: '请输入系统名称',
            value: '',
            type: 'input',
            rule: [
                {
                    required: true,
                    message: '系统名称不能为空',
                },
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "系统别名",
            name: 'alias',
            placeholder: '请输入系统别名',
            value: '',
            type: 'input',
            rule: [
                {
                    required: true,
                    message: '系统别名不能为空',
                },
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "LOGO类型",
            name: 'logoType',
            placeholder: 'LOGO类型',
            value: 'font',
            options: [
                { label: '字体图标', value: 'font' },
                { label: '图片', value: 'image' },
            ],
            type: 'radioGroup',
            a_attr: {
                allowClear: true,
            },
            rule: [
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "LOGO",
            name: 'logo',
            placeholder: '请输入LOGO',
            value: '',
            type: 'input',
            rule: [
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "基础URL",
            name: 'baseUrl',
            placeholder: '请输入基础URL',
            value: '',
            type: 'input',
            rule: [
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "主页地址",
            name: 'homePage',
            placeholder: '请输入主页地址',
            value: '',
            type: 'input',
            rule: [
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "本地系统",
            name: 'isLocal',
            placeholder: '是否本地系统',
            value: 'Y',
            type: 'select',
            options: [
                { label: '是', value: 'Y' },
                { label: '否', value: 'N' },
            ],
            a_attr: {
                allowClear: true,
            },
            rule: [
                {
                    required: true,
                    message: '是否本地系统不能为空',
                },
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "路径",
            name: 'path',
            placeholder: '请输入路径',
            value: '',
            type: 'textarea',
            rule: [
            ],
            a_attr: {
                rows: "4"
            },
        },
        {
            span: 24,
            hidden: false,
            label: "备注",
            name: 'memo',
            placeholder: '请输入备注',
            value: '',
            type: 'textarea',
            rule: [
            ],
            a_attr: {
                rows: "4"
            },
        },
    ]
}

export default {
    topForm,
    tableRowForm,
}