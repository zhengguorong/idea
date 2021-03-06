import api from '@/api/project'

export default {
  namespaced: true,
  state: {
    list: [],
    myList: [],
    finishList: [],
    activeList: [],
    examineList: [],
    detail: {},
    total: {},
    join: [], // 参与的项目
    searchSuggest: [] // 搜索建议
  },
  actions: {
    create ({commit, dispatch}, data) {
      api.create(data).then(res => {
        dispatch('getTotal')
      })
    },
    getList ({commit}, {page, limit}) {
      return api.getList({page, limit}).then(res => {
        if (page <= 1) {
          commit('setList', res.list)
        } else {
          commit('setListMore', res.list)
        }
        return res
      })
    },
    getMyList ({commit}) {
      return api.getMyList().then(res => {
        commit('setList', res)
      })
    },
    getMyJoinList ({commit}) {
      return api.getMyJoinList().then(res => {
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
    patch ({commit}, data) {
      commit('update', data)
      return api.patch(data)
    },
    del ({commit, dispatch}, id) {
      return api.del(id).then(res => {
        dispatch('getTotal')
      })
    },
    changeState ({commit, dispatch}, data) {
      return api.changeState(data).then(res => {
        commit('changeState', data)
        dispatch('getTotal')
      })
    },
    getTotal ({commit}) {
      return api.getTotal().then(res => {
        commit('setTotal', res)
      })
    },
    getSearchSuggest ({commit}) {
      return api.getSearchSuggest().then(res => {
        commit('setSearchSuggest', res)
      })
    },
    search ({commit}, keyword) {
      return api.search(keyword).then(res => {
        commit('setList', res)
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
    },
    total (state) {
      return state.total
    },
    searchSuggest (state) {
      return state.searchSuggest
    }
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    setListMore (state, list) {
      state.list = state.list.concat(list)
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
    },
    setTotal (state, data) {
      state.total = data
    },
    setSearchSuggest (state, data) {
      state.searchSuggest = data
    }
  }
}
