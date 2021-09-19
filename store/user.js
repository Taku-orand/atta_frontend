import axios from 'axios'

export const state = () => ({
  user: {},
})

export const getters = {
  userGetter(state){
    return state.user
  }
}

export const mutations = {
  setUser(state, user){
    state.user = user
  }
}

export const actions = {
  async getUser({ commit }) {
    await axios
      .get(`http://localhost:3000/api/v1/users`, {
        headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.found) {
          console.log('見つかりました。')
          commit('setUser', response.data.user)
        } else {
          console.log('見つかりませんでした。')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
