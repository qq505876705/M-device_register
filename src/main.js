import Vue from "vue";
import router from "./router";
import Axios from "axios";
// 引入 ElementUI
import { Message, Button, Select } from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
// 引入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// app文件需要放在elementUI文件样式后面，不然无法重置其中的默认样式

import App from "./App.vue";
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Select);
// Vue.use(Message);
Vue.prototype.$axios = Axios;
Vue.prototype.$message = Message;

// 请求进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});
// 设置axios超时时间 单位为毫秒
Axios.defaults.timeout = 30000;
// 设置接口地址，本地测试则为代理的/api，发布环境则需要填为发布后的服务器地址
Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
console.log(process.env.VUE_APP_BASE_URL, "");

// Axios请求拦截
Axios.interceptors.request.use(
  (config) => {
    const now = new Date().getTime();
    // 请求开始，蓝色过渡滚动条开始出现
    NProgress.start();
    if (config.url.indexOf("?") < 0) {
      config.url += `?t=${now}`;
    } else {
      config.url += `&t=${now}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    // Vue.prototype.$message.error("出错了!");
    return Promise.reject(error);
  }
);

// 全局的AXios返回出错请求处理
Axios.interceptors.response.use(
  (response) => {
    // todo 后端返回错误码处理错误状态
    // 如果是登陆失效了
    if (response.data.code === "10034") {
      router.push("/");
      // location.replace(Vue.prototype.$config.systemUrl)
      NProgress.done();

      // 清空用户信息
      // window.localStorage.clear();
      // Vue.prototype.$message.error("用户登录信息失效");
      return Promise.reject(new Error("用户登录信息失效"));
    }
    NProgress.done();
    return response.data;
  },
  (error) => {
    // todo 后端返回错误码处理错误状态
    console.log("error", error);
    NProgress.done();
    return Promise.reject(error);
  }
);
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
