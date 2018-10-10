import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import user_store from './state/login_state.js'//引入某个store对象

export default new vuex.Store({
  modules: {
    user: user_store
  }
})
