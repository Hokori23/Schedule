import Vue from "vue";

const formatTimeStamp = timeStamp => {
    let time = null;
    if (timeStamp) {
        time = new Date(Number(timeStamp));
    } else {
        time = new Date();
    }
    const arrCN = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ];
    const arrEN = ["Sun", "Mon", "Feb", "Wed", "Thu", "Fri", "Sat"];
    let date = time.getDay();
    let lang = localStorage.getItem("language");
    let dateFormatted = "";
    if (lang === "zh-hans") {
        dateFormatted = arrCN[date];
    } else if (lang === "en-us") {
        dateFormatted = arrEN[date];
    }
    let tempMonth = time.getMonth() + 1;
    let tempDate = time.getDate();
    if (tempMonth < 10) {
        tempMonth = "0" + tempMonth;
    }
    if (tempDate < 10) {
        tempDate = "0" + tempDate;
    }

    return {
        year: time.getFullYear(),
        month: tempMonth,
        date: tempDate,
        day: dateFormatted,
        hour: time.getHours(),
        minute: time.getMinutes(),
        toString: function() {
            return `${this.year}/${this.month}/${this.date} ${this.hour}:${this.minute}`;
        },
        format1: function() {
            return `${this.year}/${this.month}/${this.date}`;
        }
    };
};

const timeStampFloor = timeStamp => {
    let time = null;
    // timeStamp = timeStamp || null;
    if (timeStamp) {
        time = new Date(timeStamp);
    } else {
        time = new Date();
    }
    let floorTime = new Date(time.getFullYear(), time.getMonth(), time.getDate());
    return floorTime.getTime();
};
const dealWithSuccess = (vm, data) => {
    // console.log("success", data);
    //自定义错误码处理
    let title = "";
    let message = "";
    let onDismiss = null;
    let flag = 0;
    /**
     * @flag
     * Number 0 对话框
     * Number 1 通知栏
     */
    switch (data.errcode) {
        case 10000:
            {
                message = vm.$t("user.getUsersSuccess");
                flag = 1;
                break;
            }
        case 10001:
            {
                message = vm.$t("login.registerSuccess");
                onDismiss = async() => {
                    //登录
                    let res = await vm.$store.dispatch("LoginLayout/login", vm);
                    vm.$dealWithSuccess(vm, res.data);
                };
                break;
            }
            //登陆成功
        case 10002:
            {
                message = vm.$t("login.loginSuccess");
                flag = 1;
                vm.$store.commit("MainLayout/user", data.data[0]);
                vm.$router.push("/");
                break;
            }
        case 10004:
            {
                message = vm.$t("user.deleteSuccess");
                flag = 1;
                break;
            }
        case 10006:
            {
                message = vm.$t("user.editSuccess");
                flag = 1;
                break;
            }
        case 20000:
            {
                message = vm.$t("subject.add");
                flag = 1;
                break;
            }
        case 20001:
            {
                message = vm.$t("subject.remove");
                flag = 1;
                break;
            }
        case 20002:
            {
                message = vm.$t("subject.edit");
                flag = 1;
                break;
            }
        case 30000:
            {
                message = vm.$t("assignment.add");
                flag = 1;
                break;
            }
        case 30001:
            {
                message = vm.$t("assignment.remove");
                flag = 1;
                break;
            }
        case 30002:
            {
                message = vm.$t("assignment.edit");
                flag = 1;
                break;
            }
        default:
            {
                title = vm.$t("common.unknownErr");
                message = vm.$t("common.unknownErrTip") + ", " + data.errcode;
            }
    }

    if (!flag) {
        vm.$q
            .dialog({
                title: title || vm.$t("common.alert"),
                message: message
            })
            .onDismiss(onDismiss);
    } else {
        vm.$q.notify({
            message: message
        });
    }
    return data;
};

const dealWithError = (vm, e) => {
    // console.log("error", e);
    if (!navigator.onLine) {
        vm.$q.dialog({
            title: vm.$t("error.offLine"),
            message: vm.$t("error.offLineInfo")
        });
        return;
    }
    //HTTP协议错误码处理
    if (e.errcode >= 400 && e.errcode <= 505) {
        if (e.errcode === 400) {
            vm.$q.dialog({
                title: vm.$t("common.unknownErr"),
                message: e.message
            });
        } else if (e.errcode === 401) {
            vm.$q
                .dialog({
                    title: vm.$t("error.unauthorized"),
                    message: vm.$t("user.notLogin"),
                    ok: vm.$t("user.suggestToLogin"),
                    cancel: vm.$t("common.cancel")
                })
                .onOk(() => {
                    vm.$router.push("/login");
                });
        } else if (e.errcode === 402) {
            //登录信息验证失败
            vm.$q
                .dialog({
                    title: vm.$t("error.unauthorized"),
                    message: vm.$t("error.verifyFailed")
                })
                .onDismiss(() => {
                    vm.$router.push("/login");
                });
        } else if (e.errcode === 403) {
            vm.$q.dialog({
                title: vm.$t("error.forbidden"),
                message: vm.$t("user.noPower")
            });
        } else if (e.errcode >= 500) {
            vm.$q.dialog({
                title: vm.$t("error.unavailable"),
                message: vm.$t("error.unavailableInfo ") + e.errcode
            });
        } else {
            vm.$q.dialog({
                title: vm.$t("common.unknownErr"),
                message: vm.$t("common.unknownErrTip ") + ", " + e.errcode
            });
        }
        return;
    }

    //自定义错误码处理
    let message = "";
    let title = vm.$t("common.err");
    let func = null;

    switch (e.errcode) {
        case 1:
            {
                message = e.msg || e.message;
                break;
            }
        case 10100:
        case 10103:
        case 10104:
            {
                message = vm.$t("login.accountWrong");
                break;
            }
        case 10101:
            {
                message = vm.$t("login.accountExisted");
                break;
            }
        case 10102:
        case 10105:
            {
                message = vm.$t("login.passwordWrong");
                break;
            }
        case 20100:
            {
                message = vm.$t("subject.addErr");
                cancel = $vm.$t("common.cancel");
                break;
            }
        case 20101:
            {
                message = vm.$t("subject.removeErr");
                break;
            }
        case 20102:
            {
                message = vm.$t("subject.editErr");
                break;
            }
        case 30100:
            {
                message = vm.$t("assignment.addErr");
                func = null; //跳转
                break;
            }
        case 30101:
            {
                message = vm.$t("assignment.removeErr");
                break;
            }
        case 30102:
            {
                message = vm.$t("assignment.editErr");
                break;
            }
        case 30104:
            {
                message = vm.$t("assignment.queryAllErr");
                break;
            }
        default:
            {
                title = vm.$t("common.unknownErr");
                message = vm.$t("common.unknownErrTip") + ", " + e.errcode;
            }
    }

    //是否跳转查看该日作业
    if (func) {
        vm.$q
            .dialog({
                title: title,
                message: message,
                cancel: vm.$t("common.cancel")
            })
            .onOk(func());
    } else {
        vm.$q.dialog({
            title: title,
            message: message
        });
    }
    return e;
};

const day = 1000 * 60 * 60 * 24;
Vue.prototype.$formatTimeStamp = formatTimeStamp;
Vue.prototype.$timeStampFloor = timeStampFloor;
Vue.prototype.$day = day;
Vue.prototype.$dealWithError = dealWithError;
Vue.prototype.$dealWithSuccess = dealWithSuccess;
