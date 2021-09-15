export const state = () => ({
  login: false,
})

export const mutations = {
  setLogin(state, login) {
    state.login = login
  },
}
