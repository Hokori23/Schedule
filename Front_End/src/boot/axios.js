import Vue from "vue";
import axios from "axios";

require("promise.prototype.finally").shim();
if (process.env.DEV) {
    axios.defaults.baseURL = "/api";
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
        if (token) {
            // 拿到token
            localStorage.setItem("Authorization", token);
        } else {
            // 如果没有则清除缓存
            localStorage.removeItem("Authorization");
        }

        // 判断错误
        let errcode = res.data.errcode;
        let data = res.data.data;
        if (errcode) {
            // 操作失败
            let err = {
                errcode: errcode,
                message: res.data.msg || "",
                data: data || null
            };
            if (errcode === 1062) {
                err.message = "主键重复";
            }
            return Promise.reject(err);
        }

        return res;
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("Authorization");
                // Unauthorized
                // 登陆失效
                error.errcode = 401;
            } else if (error.response.status === 403) {
                // Forbidden
                // 无权限
                error.errcode = 403;
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