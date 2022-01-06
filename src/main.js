// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import mock from './mock'
import global from "./utils/global";
import store from "./store";
import api from './http'
import i18n from "./i18n";

// Vue.config.productionTip = false

Vue.use(ElementUI) //注册使用Element
Vue.use(api) //注册使用API模块
Vue.prototype.global = global
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h=>h(App)
})
