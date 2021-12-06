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
            label: "文件名",
            name: 'fileName',
            placeholder: '请输入文件名',
            value: '',
            type: 'input',
        },
        {
            label: "扩展名",
            name: 'ext',
            placeholder: '请输入扩展名',
            value: '',
            type: 'input',
        },
        {
            label: "创建时间",
            span: 12,
            name: 'params[beginTime]',
            value: '',
            type: 'dateTime',
            format: 'YYYY/MM/DD'
        },{
            label: "-",
            name: 'params[endTime]',
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
        labelCol: {style: {width: '70px'}}
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
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "附件分类ID",
            name: 'typeId',
            placeholder: '请输入附件分类ID',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "文件名",
            name: 'fileName',
            placeholder: '请输入文件名',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "附件类型",
            name: 'fileType',
            placeholder: '附件类型',
            value: '',
            options: [
                {label: '选项一', value: '0'},
                {label: '选项二', value: '1'},
            ],
            a_attr: {
                allowClear: true,
            },
            type: 'select',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "储存类型",
            name: 'storeType',
            placeholder: '储存类型',
            value: '',
            options: [
                {label: '选项一', value: '0'},
                {label: '选项二', value: '1'},
            ],
            a_attr: {
                allowClear: true,
            },
            type: 'select',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "文件路径",
            name: 'filePath',
            placeholder: '请输入文件路径',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "总字节数",
            name: 'totalBytes',
            placeholder: '请输入总字节数',
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
            label: "扩展名",
            name: 'ext',
            placeholder: '请输入扩展名',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "说明",
            name: 'note',
            placeholder: '请输入说明',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "是否已删除",
            name: 'isDel',
            placeholder: '请输入是否已删除',
            value: '',
            type: 'input',
            rule: [
                {
                    required: true,
                    message: '是否已删除不能为空',
                },
            ],
        },
        {
            span: 24,
            hidden: false,
            label: "文件MD5值",
            name: 'md5',
            placeholder: '请输入文件MD5值',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "上传是否失败",
            name: 'isFall',
            placeholder: '请输入上传是否失败',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "创建者",
            name: 'createBy',
            placeholder: '请输入创建者',
            value: '',
            type: 'input',
            rule: [],
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
            rule: [],
            change: function () {
            },
        },
        {
            span: 24,
            hidden: false,
            label: "更新者",
            name: 'updateBy',
            placeholder: '请输入更新者',
            value: '',
            type: 'input',
            rule: [],
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
            rule: [],
            change: function () {
            },
        },
    ]
}

export default {
    topForm,
    tableRowForm,
}