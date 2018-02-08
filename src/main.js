// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

//mint-ui
import MintUI from "mint-ui";
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

/*加载样式*/


Vue.config.productionTip = false;

//全局使用组件和过滤器
import filter from './filter';
import component from './component';
filter(Vue);
component(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
