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
        if (response.data.code === 401) {
            window.localStorage.setItem('token', null);
            window.location.pathname = '/login';
            return;
        }
        return response;
    }
);

// instance.interceptors.push(() => {
//     if (window.localStorage.getItem('token')) {
//         instance.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
//     }
// });
export default instance;
