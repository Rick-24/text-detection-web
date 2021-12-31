import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

import app from './modules/app'

export default new vuex.Store({
  modules:{
    app:app
  }
})

