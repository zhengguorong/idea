import api from '@/api/project'

export default {
  namespaced: true,
  state: {
    activeList: []
  },
  actions: {
    create ({commit}, data) {
      data.startDate = data.startDate.getTime()
      data.endDate = data.endDate.getTime()
      api.create(data)
    },
    getActiveList ({commit}) {
      return api.getList().then(res => {
        commit('setActiveList', res)
      })
    },
    getFinishList ({commit}) {
      return api.getList().then(res => {
        commit('setFinishList', res)
      })
    },
    getMyList ({commit}) {
      return api.getMyList().then(res => {
        commit('setMyList', res)
      })
    }
  },
  getters: {
    getActiveList (state) {
      return state.activeList
    },
    getFinishList (state) {
      return state.finishList
    },
    getMyList (state) {
      return state.myList
    }
  },
  mutations: {
    setActiveList (state, list) {
      state.activeList = list
    },
    setFinishList (state, list) {
      state.finishList = list
    },
    setMyList (state, list) {
      state.myList = list
    }
  }
}
