// This is just an example,
// so you can safely delete all default props below

export default {
    config: {
        name: "Assignment Table",
        version: "0.1.4",
        updateTime: "2020/5/8",
        author: "Hokori"
    },
    configInfo: {
        name: "Project Name",
        version: "Version",
        updateTime: "Latest Update Time",
        author: "Author"
    },
    login: {
        account: "User ID",
        accountErr: "User ID required",
        accountWrong: "User ID not existed",
        accountExisted: "User ID has already existed",
        password: "Password",
        passwordErr: "Password required",
        passwordWrong: "User ID or Password wrong",
        nickName: "Nickname",
        nickNameErr: "Nickname required",
        login: "Login",
        loginSuccess: "Logged in successfully",
        viewAsVisitor: 'View as a visitor',
        loginExpired: "Login has expired, please log in again",
        noAccountYet: "Have no account yet?",
        register: "Register now",
        registerSuccess: "Register successfully",
        forgot: "Forgot?",
        phoneNumber: "Phone Number",
        phoneNumberErr: "Phone number required",
        phoneNumberWrong: "Phone number wrong",
        plzFill: "Please fill up the information",
        checkCode: "Verification Code",
        checkCodeErr: "Verification code required",
        resend: "Retry",
        send: "Send",
        registerAnnounceTitle: "Register Announcement",
        registerAnnouncement1: "I promise that the ID and Password that you register here will not be public anywhere.",
        registerAnnouncement2: "If you got interest on me, you can click this message to visit my blog and leave a comment there.\n \nOr just contact me through this email [ hokori23@qq.com ]",
        registerAnnouncement3: "This is A website to record my assignment.\nIf you are my classmate you can feel free to register and login this website."
    },
    common: {
        confirm: "Confirm",
        cancel: "Cancel",
        reconnect: "Reconnect",
        err: "Error",
        unknownErr: "Unknown Error",
        unknownErrTip: "Something goes wrong, maybe effect the execution of the program, you can contact me on [hokori23@qq.com] if you in need.",
        save: "Save",
        continue: "Continue",
        finish: "Finish",
        back: "Back",
        alert: "Alert",
        more: "More",
        loading: "Loading",
        edit: "Edit",
        maxLength: "Max Length",
        delete: "Delete",
        deleteConfirm: "Do you really want to delete it?"
    },
    location: {
        home: "Home",
        setting: "Settings",
        about: "About",
        user: "User Center",
        userList: "User Directory"
    },
    user: {
        notLogin: "Haven't logged in yet",
        suggestToLogin: "Move to login page?",
        createdTime: "Created Time",
        activatedTime: "Last Activated Time",
        editMsg: "Edit Nickname",
        editSuccess: "Edited your info successfully",
        delete: "Cancel Account",
        deleteMsg: "Input your password to confirm the operation",
        deleteSuccess: "Account was Canceled successfully",
        logOut: "Log out",
        logOutConfirm: "Do you really want to log out?",
        noPower: "You have no permission to do such thing."
    },
    assignment: {
        self: " Assignment",
        add: "Added the assignment successfully",
        addInfo: "Add assignment",
        addErr: "This day's assignment already exists, \nDo you wanna have a look?",
        remove: "Removed this assignment successfully",
        removeErr: "Removed failed because of no assignment in this day",
        edit: "Edited the assignment successfully",
        editErr: "Edit the assignment failed",
        query: "Queried assignment(s) successfully",
        queryAll: "Queried all assignments successfully",
        queryAllErr: "Query all assignments failed",
        deadLine: 'Deadline',
        lastModified: 'Last modified time'
    },
    subject: {
        self: "subject",
        add: "Added the subject successfully",
        addErr: "The subject already exists",
        remove: "Removed this subject successfully",
        removeErr: "Removed failed with non-existent subject",
        edit: "Edited the subject successfully",
        editErr: "Edit the subject failed",
        query: "Queried subject(s) successfully",
        queryAll: "Queried all subjects successfully"
    },
    setting: {
        language: "Language",
        assignment: "Assignment Table Configuration",
        darkMode: "Dark Mode",
        days: "The numbers of shown days"
    },
    error: {
        unauthorized: "Unauthorized",
        forbidden: "Forbidden",
        unavailable: "Unavailable",
        unavailableInfo: "The server is unavailable temporary",
        offLine: 'Offline',
        offLineInfo: 'You are offline now'
    },
    table: {
        subject: "Subject",
        assignment: "Assignment Info",
        category: "Category"
    }
};
