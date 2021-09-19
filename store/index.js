export const state = () => ({
  showHeader: true,
  showFooter: true,
  showUserInfo: true,
  settings_dialog: false
})

export const getters = {
  settingsDialogGetter(state) {
    return state.settings_dialog
  },
}

export const mutations = {
  setLogin(state, login) {
    state.login = login
  },
  setShowFooter(state, boolean) {
    state.showFooter = boolean
  },
  setShowHeader(state, boolean) {
    state.showHeader = boolean
  },
  setShowUserInfo(state, boolean) {
    state.showUserInfo = boolean
  },
  isLoggedIn(state) {
    if (!this.$auth0.isAuthenticated()) {
      this.$router.replace('/')
    }
  },
  setSettingsDialog(state, boolean){
    state.settings_dialog = boolean
  }
}
