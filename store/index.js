import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    isLogin: 0,
    sessid: null,
    nickname: null,
    email: null,
    isAdmin: false
  },
  mutations: {
    insert (state, sessid, nickname, email, isAdmin) {
      state.isLogin = 1
      state.sessid = sessid,
      state.nickname = nickname
      state.email = email
      state.isAdmin = isAdmin
    }
  }
})

export default store