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
        window.localStorage.setItem('userId', userInfo.userId)
        window.localStorage.setItem('role', res.role || 'USER')
      })
    },
    login ({ commit }, userInfo) {
      return api.login(userInfo).then(res => {
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('nickName', res.nickName)
        window.localStorage.setItem('userId', userInfo.userId)
        window.localStorage.setItem('role', res.role)
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
