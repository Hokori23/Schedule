// This is just an example,
// so you can safely delete all default props below

export default {
    config: {
        name: "作业板",
        version: "0.1.4",
        updateTime: "2020/5/12",
        author: "Hokori"
    },
    configInfo: {
        name: "项目名",
        version: "版本号",
        updateTime: "更新时间",
        author: "作者"
    },
    login: {
        account: "账号",
        accountErr: "账号不能为空",
        accountWrong: "账号不存在",
        accountExisted: "账号已存在",
        password: "密码",
        passwordErr: "密码不能为空",
        passwordWrong: "账号或密码错误",
        nickName: "昵称",
        nickNameErr: "昵称不能为空",
        login: "登录",
        loginSuccess: "登陆成功",
        viewAsVisitor: "游客访问",
        loginExpired: "登录失效，请重新登录",
        noAccountYet: "还没有账号？",
        register: "立即注册",
        registerSuccess: "注册成功",
        forgot: "无法登录?",
        phoneNumber: "手机号",
        phoneNumberErr: "手机号不能为空",
        phoneNumberWrong: "手机号格式错误",
        plzFill: "请填写注册信息",
        checkCode: "验证码",
        checkCodeErr: "验证码不能为空",
        resend: "重发",
        send: "发送",
        registerAnnounceTitle: "注册须知",
        registerAnnouncement1: "您在此注册所用的账号密码将不会被公开滥用，请放心注册。",
        registerAnnouncement2: "如果你对我的项目感兴趣的话，可以通过点击这条信息访问我的博客，亦可以在评论区留言\n \n或者直接通过邮箱联系我[ hokori23@qq.com ]",
        registerAnnouncement3: "这是一个用来记录我作业的网站。\n如果你是我的同学的话，请随意注册登录使用这个网站。"
    },
    common: {
        confirm: "确定",
        cancel: "取消",
        reconnect: "重新连接",
        err: "错误",
        unknownErr: "未知错误",
        unknownErrTip: "这里出现了一些未知的错误，或许会影响程序的运行噢，有需求的话可以反馈给我 [hokori23@qq.com]",
        save: "保存",
        continue: "继续",
        finish: "完成",
        back: "返回",
        alert: "提示",
        more: "更多",
        loading: "加载中",
        edit: "修改",
        maxLength: "最大长度",
        delete: "删除",
        deleteConfirm: "确定要删除吗？"
    },
    location: {
        home: "首页",
        setting: "设置",
        about: "关于",
        user: "用户中心",
        userList: "用户目录"
    },
    user: {
        notLogin: "您还没有登录噢",
        suggestToLogin: "是否前往登录页面？",
        createdTime: "创建时间",
        activatedTime: "最后活跃时间",
        editMsg: "修改昵称",
        editSuccess: "更改信息成功",
        delete: "注销账号",
        deleteMsg: "输入密码以确定注销账号",
        deleteSuccess: "注销成功",
        logOut: "退出登录",
        logOutConfirm: "确定要退出登录吗？",
        noPower: "您没有权限进行此操作"
    },
    assignment: {
        self: "作业信息",
        add: "添加作业成功",
        addInfo: "添加作业",
        addErr: "已有该日作业，是否查看？",
        remove: "删除作业成功",
        removeErr: "无此日作业，删除失败",
        edit: "编辑作业成功",
        editErr: "编辑作业失败",
        query: "查询作业成功",
        queryAll: "遍历作业成功",
        queryAllErr: "遍历作业失败",
        deadLine: "期限",
        lastModified: '最后修改时间',
        author: '提交人'
    },
    subject: {
        self: "科目",
        add: "添加科目成功",
        addErr: "科目已存在",
        remove: "删除科目成功",
        removeErr: "科目不存在",
        edit: "编辑科目成功",
        editErr: "编辑科目失败",
        query: "查询科目成功",
        queryAll: "遍历科目成功"
    },
    setting: {
        language: "多语言",
        assignment: "作业表设置",
        darkMode: "夜间模式",
        days: "显示作业天数"
    },
    error: {
        unauthorized: "登录失效",
        forbidden: "无权限",
        unavailable: "不可用",
        unavailableInfo: "暂时连接不上服务器",
        offLine: '离线',
        offLineInfo: '您现在处于离线状态'
    },
    table: {
        subject: "科目",
        assignment: "作业信息",
        category: "分类"
    }
};
