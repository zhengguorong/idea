import api from '@/api/project'

export default {
  namespaced: true,
  state: {
    list: [],
    myList: [],
    finishList: [],
    activeList: [],
    examineList: [],
    detail: {}
  },
  actions: {
    create ({commit}, data) {
      api.create(data)
    },
    getList ({commit}) {
      return api.getList().then(res => {
        commit('setList', res)
      })
    },
    getMyList ({commit}) {
      return api.getMyList().then(res => {
        commit('setList', res)
      })
    },
    getFinishList ({commit}) {
      return api.getFinish().then(res => {
        commit('setList', res)
      })
    },
    getActiveList ({commit}) {
      return api.getActive().then(res => {
        commit('setList', res)
      })
    },
    getExamineList ({commit}) {
      return api.getExamine().then(res => {
        commit('setList', res)
      })
    },
    getDetial ({commit}, id) {
      return api.getDetail(id).then(res => {
        commit('setDetail', res)
      })
    },
    update ({commit}, data) {
      commit('update', data)
      return api.update(data)
    },
    del ({commit}, id) {
      return api.del(id)
    },
    changeState ({commit}, data) {
      return api.changeState(data).then(res => {
        commit('changeState', data)
      })
    }
  },
  getters: {
    list (state) {
      return state.list
    },
    getDetail (state) {
      return state.detail
    },
    isFetching (state) {
      return state.isFetching
    }
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    setDetail (state, detail) {
      detail.startDate = new Date(detail.startDate)
      detail.endDate = new Date(detail.endDate)
      state.detail = detail
    },
    changeState (state, data) {
      const index = state.list.findIndex((item, index) => {
        if (item._id === data.id) {
          return true
        }
      })
      state.list[index].state = data.state
    },
    update (state, data) {
      state.list.find((item, index) => {
        if (item._id === data._id) {
          for (let key in data) {
            if (key !== '_id') {
              item[key] = data[key]
              return
            }
          }
        }
      })
    }
  }
}
