import axios from "axios";

const login = ({ commit, state }, vm) => {
    vm.loginState = true;
    vm.$q.loadingBar.start();
    axios
        .get("/user", {
            params: {
                id: vm.info.account,
                password: vm.info.password
            }
        })
        .then(res => {
            //登陆成功
            vm.$router.push("/");
        })
        .catch(e => {
            //登陆失败
            if (e.errcode === 2) {
                e.message = vm.$t("login.accountWrong");
            } else if (e.errcode === 3) {
                e.message = vm.$t("login.passwordWrong");
            }
            vm.$q.dialog({
                message: e.message,
                title: vm.$t("common.alert")
            });
        })
        .finally(() => {
            vm.loginState = false;
            vm.$q.loadingBar.stop();
        });
};

const register = ({ commit, state }, vm) => {
    vm.registerState = true;
    vm.$q.loadingBar.start();
    axios
        .post("/user", {
            id: vm.info.account,
            password: vm.info.password,
            name: vm.info.name
        })
        .then(res => {
            //注册成功
            vm.$router.push("/");
        })
        .catch(e => {
            //注册失败
            if (e.errcode === 2) {
                e.message = vm.$t("login.accountExisted");
            }
            vm.$q.dialog({
                message: e.message,
                title: vm.$t("common.alert")
            });
        });
};
export { login, register };