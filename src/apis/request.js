import axios from 'axios';
import store from '../store';
import router from '../router';

// axios 配置
axios.defaults.timeout = 5000;
// 此处配置生成环境的 api 基础路径
axios.defaults.baseURL = "/";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.auth.currentUser ? store.state.auth.currentUser.token : '';
    console.log('axios request config: ', config)
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);


// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('changeLogin');

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' && router.replace({ path: 'login', query: { redirect: router.currentRoute.path } });
          break;
        default:
          break;
      }
    }

    return Promise.reject(err.response.data);
  }
);

export default axios;

