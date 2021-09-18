export const state = () => ({
  showHeader: true,
  showFooter: true,
  showUserInfo: true
})

export const mutations = {
  setLogin(state, login) {
    state.login = login
  },
  setShowFooter(state, boolean){
    state.showFooter = boolean
  },
  setShowHeader(state, boolean){
    state.showHeader = boolean
  },
  setShowUserInfo(state, boolean){
    state.showUserInfo = boolean
  },

}
