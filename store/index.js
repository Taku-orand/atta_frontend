export const state = () => ({
  showHeader: true,
  showFooter: true,
  showUserInfo: true,
  settings_dialog: false,
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
  setSettingsDialog(state, boolean) {
    state.settings_dialog = boolean
  },
}

export const actions = {
  saveUserInfo({ commit }, user) {
    try {
      return this.$axios.$patch(
        process.env.ATTA_BACKEND + '/api/v1/users',
        user,
        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
}
