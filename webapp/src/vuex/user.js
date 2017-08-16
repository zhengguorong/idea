import api from '@/api/user'

export default {
  namespaced: true,
  state: {
    users: [],
    user: {}
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
    },
    getUser ({commit}) {
      return api.getUser().then(res => {
        commit('setUser', res)
      })
    },
    update ({commit}, userInfo) {
      return api.update(userInfo).then(res => {
        window.localStorage.setItem('nickName', res.nickName)
      })
    },
    changePassword ({commit}, password) {
      return api.changePassword(password)
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getUsers (state) {
      const users = []
      // 过滤管理者和自己
      state.users.forEach((item, index) => {
        if (item.role === 'USER' && item.userId !== window.localStorage.getItem('userId')) {
          users.push(item)
        }
      })
      return users
    },
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setUsers (state, users) {
      state.users = users
    },
    setUser (state, user) {
      state.user = user
    }
  }
}
