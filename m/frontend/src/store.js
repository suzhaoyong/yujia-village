import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    buyGoods: [],
    info: {
      cart: [],
      cash: [],
      collect: [],
      coupon: [],
      user: {
        name: ''
      }
    }
  },
  getters: {
    info: state => state.info
  },
  mutations: {
    loadStatus(state, flag) {
      state.loading = flag
    },
    addGoods(state, goods) {
      state.buyGoods.push(goods);
    },
    removeGoods(state, goods) {
      const cur_index = state.buyGoods.findIndex(item => item.id === goods);
      state.buyGoods.splice(cur_index, 1)
    },
    UPDATE_INFO(state, info) {
      if (info.user.name) {
        state.info = {
          ...state.info,
          ...info
        }
      } else {
        state.info = {
          user: {}
        }
      }
    }
  },

  actions: {
    // 修改个人信息
    INFO({
      commit,
      state
    }, info) {
      console.log(info)
      commit('UPDATE_INFO', info)
    },
    ADD_GOODS({
      commit,
      state
    }, goods) {
      commit('addGoods', goods)
    },
    REMOVE_GOODS({
      commit,
      state
    }, goods) {
      commit('removeGoods', goods)
    },
  }
})
