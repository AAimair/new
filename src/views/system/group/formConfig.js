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
            label: "名称",
            name: 'name',
            placeholder: '请输入用户组名称',
            value: '',
            type: 'input',
        },
        {
            label: "编码",
            name: 'code',
            placeholder: '请输入用户组编码',
            value: '',
            type: 'input',
        }
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
        {
            label: "用户名称",
            name: 'params[userName]',
            placeholder: '请输入用户名称',
            value: '',
            type: 'input',
        },
        {
            label: "用户昵称",
            name: 'params[nickName]',
            placeholder: '请输入用户昵称',
            value: '',
            type: 'input',
        }
    ]
};
// 用户组表单
const sysUserGroupForm = {
    titleShow: false, //  表单块标题是否隐藏
    labelAlign: "right", // label对齐方式 left|right,
    layout: "horizontal", // 表单布局 'horizontal'|'vertical'|'inline'
    hideRequiredMark: false, // 是否隐藏必选标记
    a_attr: {
        labelCol: {style: {width: '70px'}},
    }, //  原antd组件属性
    colon: false, // layout = horizontal 有效 label后是否有冒号
    // gutter: 10, // 表单块间隔
    form: [
        {
            span: 24,
            hidden: true,
            label: "用户组ID",
            name: 'id',
            placeholder: '请输入用户组ID',
            value: '',
            type: 'input',
            rule: [],
        },
        {
            span: 24,
            hidden: false,
            label: "用户组名称",
            name: 'name',
            placeholder: '请输入用户组名称',
            value: '',
            type: 'input',
            rule: [{
                required: true,
                message: '用户组名称不能为空',
            },],
        },
        {
            span: 24,
            hidden: false,
            label: "用户组编码",
            name: 'code',
            placeholder: '请输入用户组编码',
            value: '',
            type: 'input',
            rule: [{
                required: true,
                message: '用户组编码不能为空',
            },],
        },
        {
            span: 24,
            hidden: false,
            label: "备注",
            name: 'remark',
            placeholder: '请输入备注',
            value: '',
            type: 'input',
            rule: [],
        }
    ]
}

// 用户选择查询栏
const userSelectForm = {
    titleShow: false, //  表单块标题是否隐藏
    labelAlign: "left", // label对齐方式 left|right,
    layout: "inline", // 表单布局 'horizontal'|'vertical'|'inline'
    hideRequiredMark: true, // 是否隐藏必选标记
    // a_attr: {}, //  原antd组件属性
    colon: false, // layout = horizontal 有效 label后是否有冒号
    // gutter: 10, // 表单块间隔
    form: [
        {
            label: "用户名称",
            name: 'params[userName]',
            placeholder: '请输入用户名称',
            value: '',
            type: 'input',
        },
        {
            label: "用户昵称",
            name: 'params[nickName]',
            placeholder: '请输入用户昵称',
            value: '',
            type: 'input',
        },{
            type: 'custom',
            soltName: 'btns'
        }
    ]
};
export default {
    topSearchForm,
    bottomSearchForm,

    sysUserGroupForm,
    userSelectForm,
}