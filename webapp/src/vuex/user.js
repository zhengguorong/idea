import api from '@/api/user'

export default {
  namespaced: true,
  state: {
    users: []
  },
  actions: {
    register ({ commit }, userInfo) {
      return api.register(userInfo).then(res => {
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('nickName', userInfo.nickName)
      })
    },
    login ({ commit }, userInfo) {
      return api.login(userInfo).then(res => {
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('nickName', res.nickName)
      })
    },
    getUsers ({commit}) {
      return api.getUsers().then(res => {
        commit('setUsers', res)
      })
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getUsers (state) {
      return state.users
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setUsers (state, users) {
      state.users = users
    }
  }
}
