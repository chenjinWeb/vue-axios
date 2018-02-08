import axios from 'axios';
import {baseUrl} from './config';
import router from '../router';

import {Indicator, Toast,MessageBox} from 'mint-ui';


axios.defaults.baseURL = baseUrl;

/*axios.defaults.withCredentials=true;*/

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.timeout = 50000;


//保证所有的请求完成之后关闭loading
Indicator.list = [];

let toast = null;

//自定义设置创建一个新的实例
let instance = axios.create({
  baseUrl:baseUrl
});

//axios拦截器interceptors
instance.interceptors.request.use(function (config) {
    Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
    Indicator.list.push(1);
    return config;
}, function (error) {
    Indicator.list.pop();
    Indicator.list.length === 0 && Indicator.close();
    toast && (toast.close());
    toast = Toast('请稍后重试！');
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    Indicator.list.pop();
    Indicator.list.length === 0 && Indicator.close();
    if (response.status == 200 && response.data.success == 200) {
        return response.data;
    }
    //弹幕提示用户
    if (response.data.success == 500) {
        Toast(response.data.message);
    }
    //没有登录 转向登录页面
    if (response.data.success == 401){
        router.replace({name: 'login'});
        return Promise.reject('请重新登录');
    }
    //没有登录 转向登录页面
    if (response.data.success == 301){
      MessageBox.alert(`${response.data.message}`)
      return
    }
    return Promise.reject('没有数据');
}, function (error) {
    Indicator.list.pop();
    Indicator.list.length === 0 && Indicator.close();
    toast && (toast.close());
    toast = Toast('请稍后重试！');
    return Promise.reject(error);
});

const http = instance;

export default http
