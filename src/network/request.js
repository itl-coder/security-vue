// request.js
import axios from "axios";
import login from "@/components/Login.vue";
import Vue from "vue";

const baseURL = process.env.VUE_APP_BASE_URL;

export function request(config) {
    // 1. 创建axios的实例
    const instance = axios.create({
        baseURL,
        timeout: 5000,
        withCredentials: false,
    });

    // 2. axios的拦截器
    // 2.1. 请求拦截的作用
    instance.interceptors.request.use(
        (config) => {
            console.log("config.url: ", config.url)
            if (config.url === "/login" || config.url === "/common/captcha") {
                return config;
            }

            if (config.url !== "/login") {
                const token = JSON.parse(localStorage.getItem("userinfo")).jwtToken
                if (token) {
                    config.headers.Authorization = `bearer ${token}`;
                    return config;
                }
            }

        },
        (err) => {
            // 对请求错误做些什么
            return Promise.reject(err);
        }
    );

    // 2.2.响应拦截
    instance.interceptors.response.use(
        (res) => {
            // 未设置状态码则默认成功状态
            const code = res.data.code;
            // 获取错误信息
            const msg = res.data.msg
            if (res.data.code === 0) {
                // 返回登录页面
                localStorage.removeItem('userinfo')
                window.top.location.href = '/login'
            } else {
                return res.data
            }
        },
        (error) => {
            console.log('err' + error)
            let {message} = error;
            if (message == "Network Error") {
                message = "后端接口连接异常";
            } else if (message.includes("timeout")) {
                message = "系统接口请求超时";
            } else if (message.includes("Request failed with status code")) {
                message = "系统接口" + message.substr(message.length - 3) + "异常";
            }
            Vue.prototype.$message({
                type: 'error',
                message: `${message}`
            })
            return Promise.reject(error)
        }
    );

    // 3.发送真正的网络请求
    return instance(config);
}
