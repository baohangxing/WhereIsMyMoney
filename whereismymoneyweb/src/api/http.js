import axios from 'axios';
import CONFIG from './../config/index';

let instance = axios.create({
    baseURL: CONFIG.API,
    timeout: CONFIG.requestTimeout
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// http response 拦截器
instance.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            this.$message.error("服务器异常，请稍后再试");
        }
        if (response.data.code !== '000001') {
            if (response.data.msg) {
                throw (response.data.msg)
            } else {
                throw ("获取数据失败，网络异常");
            }
        } else {
            return response.data.data
        }
    },
    error => {
        console.log(error);
        window.location.pathname = '/login';
    }
);

export default instance;
