// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mock from './mock'
import global from "./utils/global";
import api from './http'

Vue.config.productionTip = false

Vue.use(ElementUI) //注册使用Element
Vue.use(api) //注册使用API模块
Vue.prototype.global = global
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
