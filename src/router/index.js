import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Home2 from "../views/Home2";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home2',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
  ]
})
