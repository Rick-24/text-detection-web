import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

import app from './modules/app'
import menu from "./modules/menu";
import tab from "./modules/tab";
import user from "./modules/user";
import iframe from "./modules/iframe"

export default new vuex.Store({
  modules: {
    app: app,
    menu: menu,
    tab: tab,
    user: user,
    iframe: iframe
  }
})

