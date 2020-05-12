import Vue from "vue";
import axios from "axios";
require("promise.prototype.finally").shim();
if (process.env.DEV) {
    axios.defaults.baseURL = "/api";
} else {
    axios.defaults.baseURL = "https://api.hokori.online/schedule";
}
axios.interceptors.request.use(
    req => {
        //从localStorage中取出JWT并带到请求头中
        let token = localStorage.getItem("Authorization");
        if (token) {
            //取出token
            req.headers.authorization = token;
        }

        return req;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    res => {
        // 将从响应头拿到的JWT存在本地浏览器缓存
        let token = res.headers.authorization;
        if (token && token != 0) {
            // 拿到token
            localStorage.setItem("Authorization", token);
        } else {
            // 如果没有则清除缓存
            localStorage.removeItem("Authorization");
        }

        // 判断错误
        let errcode = res.data.errcode;
        let data = res.data.data;
        if (
            errcode === 1 ||
            !(
                (errcode >= 10000 && errcode <= 10006) ||
                (errcode >= 20000 && errcode <= 20004) ||
                (errcode >= 30000 && errcode <= 30004)
            )
        ) {
            // 操作失败
            let err = {
                errcode: errcode,
                message: res.data.msg || "",
                data: data || null
            };
            return Promise.reject(err);
        }

        return res;
    },
    error => {
        if (error.response) {
            if (error.response.status >= 400) {
                error.errcode = error.response.status;
            }

            if (error.response.status === 401) {
                localStorage.removeItem("Authorization");
            }

            let msg = error.response.data.msg;
            if (msg) {
                error.message = msg;
            }
        }
        return Promise.reject(error);
    }
);

Vue.prototype.$axios = axios;
