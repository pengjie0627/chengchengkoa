import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import user_store from './state/login_state.js'//引入某个store对象
import createPersistedState from 'vuex-persistedstate'
export default new vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],  //vuex数据持久化
  modules: {
    user: user_store
  }
})
