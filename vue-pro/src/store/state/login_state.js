export default {
  state:{
    user: ''
  },
  getters:{
    getUser(state){//这里的state对应着上面这个state
      return state.user;
    }
  },
  mutations:{
    mutationUser(state, user){//这里的state对应着上面这个state
      state.user = user;
      //你还可以在这里执行其他的操作改变state
    }
  },
  actions:{
    actionUser(context, user){//这里的context和我们使用的$store拥有相同的对象和方法
      context.commit('mutationUser', user);
      //你还可以在这里触发其他的mutations方法
    },
  }
}
