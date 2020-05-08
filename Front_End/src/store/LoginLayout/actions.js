import axios from "axios";

const login = ({ commit, state }, vm) => {
    return new Promise((resolve, reject) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        vm.cancelTokenArr.push(source);

        vm.loginState = true;
        vm.$q.loadingBar.start();
        axios
            .get("/user", {
                cancelToken: source.token,
                params: {
                    id: vm.info.account,
                    password: vm.info.password
                }
            })
            .then(res => {
                //登陆成功
                resolve(res);
            })
            .catch(e => {
                //登陆失败
                reject(e);
            })
            .finally(() => {
                vm.loginState = false;
                vm.$q.loadingBar.stop();
                const index = vm.cancelTokenArr.indexOf(source);
                if (index !== -1) {
                    vm.cancelTokenArr.splice(index, 1);
                }
            });
    });
};

const register = ({ commit, state }, vm) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    vm.cancelTokenArr.push(source);

    vm.registerState = true;
    vm.$q.loadingBar.start();
    axios
        .post("/user", {
            cancelToken: source.token,
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
        })
        .finally(() => {
            const index = vm.cancelTokenArr.indexOf(source);
            if (index !== -1) {
                vm.cancelTokenArr.splice(index, 1);
            }
        });
};
export { login, register };