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
      data.startDate = data.startDate.getTime()
      data.endDate = data.endDate.getTime()
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
    // myList (state) {
    //   return state.myList
    // },
    // finishList (state) {
    //   return state.finishList
    // },
    // activeList (state) {
    //   return state.activeList
    // },
    // examineList (state) {
    //   return state.examineList
    // },
    getDetail (state) {
      return state.detail
    }
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    // setMyList (state, list) {
    //   state.myList = list
    // },
    // setFinishList (state, list) {
    //   state.finishList = list
    // },
    // setActiveList (state, list) {
    //   state.activeList = list
    // },
    // setExamineList (state, list) {
    //   state.examineList = list
    // },
    setDetail (state, detail) {
      state.detail = detail
    },
    changeState (state, data) {
      const index = state.list.findIndex((item, index) => {
        if (item._id === data.id) {
          return true
        }
      })
      state.list[index]['state'] = data['state']
    }
  }
}
