import axios from "axios";
import {
    Message
} from "element-ui";
import router from "@/router";


// 设置post默认请求头
const instance = axios.create({
    baseURL: window.config.baseUrl,
    timeout: 500000,
    withCredentials: true,
});

function success(resp) {
    if (resp.status === 200) {
        if (resp.data.code === '0') {
            return Promise.resolve(resp.data);
        } else {
            Message({
                message: resp.data.msg || "发生未知错误",
                type: "error"
            });
        }
    }
}
// 非2XX状态处理
const errorHandle = (status) => {
    switch (status) {
        case 500:
            Message({
                message: "服务器异常",
                type: "error",
            });
            break;
        default:
            Message({
                message: "发生未知错误",
                type: "error",
            });
    }
};

function error(err) {
    const {
        response
    } = err;
    if (response) {
        // 请求已发出，但不在2xx得范围
        errorHandle(response.status);
        return Promise.reject(response);
    } else {
        Message({
            message: "请求超时,请检查网络状态",
            type: "error",
        });
        return Promise.reject(err);
    }
}

instance.interceptors.response.use(success, error);

export default instance;