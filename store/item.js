import axios from 'axios'

export const state = () => ({
  items: [],
})

export const getters = {}

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
}

export const actions = {
  async getItems({ commit }) {
    await axios
      .get(
        `http://localhost:3000/api/v1/items`,

        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.found) {
          console.log(response.data.items)
          console.log('見つかりました。')
          commit('setItems', response.data.items)
        } else {
          console.log('見つかりませんでした。')
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        // 特になし
      })
  },
  async postItem({ commit }, item) {
    await this.$axios.$post(
      'http://localhost:3000/api/v1/items',
      item,
      {
        headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
        withCredentials: true,
      }
    )
  },
}
