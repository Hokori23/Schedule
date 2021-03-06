import axios from "axios";

const login = ({ commit, state }, vm) => {
    return new Promise((resolve, reject) => {
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
                vm.$store.commit("MainLayout/login", true)
                vm.$store.commit("MainLayout/user", res.data.data[0])
                resolve(res);
            })
            .catch(e => {
                //登陆失败
                vm.$store.commit("MainLayout/login", false)
                vm.$store.commit("MainLayout/user", null)
                reject(e);
            })
            .finally(() => {
                vm.loginState = false;
                vm.$q.loadingBar.stop();
            });
    });
};

const register = ({ commit, state }, vm) => {
    return new Promise((resolve, reject) => {
        vm.registerState = true;
        vm.$q.loadingBar.start();
        axios
            .post("/user", {
                id: vm.info.account,
                password: vm.info.password,
                name: vm.info.name
            })
            .then(async res => {
                //注册成功
                resolve(res);
            })
            .catch(e => {
                //注册失败
                reject(e);
            })
            .finally(() => {
                vm.loginState = false;
                vm.$q.loadingBar.stop();
            });
    });
};
export { login, register };
