import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Home from '../views/Home'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/Login.vue'],resolve)
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../views/Home.vue'],resolve)
    },
  ]
})
