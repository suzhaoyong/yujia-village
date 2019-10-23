const getters = {
  info: state => state.app.info,
  isUserNeedLogin: state => {
    const user = sessionStorage.getItem('user data')
    if (typeof user == 'string' && user !== 'undefined') {
      store.dispatch('INFO', JSON.parse(user))
    }
    return !state.app.info.user.name
  }
}
export default getters
