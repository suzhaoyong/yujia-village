// state
const state = {
  info: {
    cart: [],
    cash: [],
    collect: [],
    coupon: [],
    user: {
      name: ''
    }
  }
}
const app = {
  state,
  mutations: {
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
    INFO({
      commit,
      state
    }, info) {
      commit('UPDATE_INFO', info)
    }
  }
}
export default app
