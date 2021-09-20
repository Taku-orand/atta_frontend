import axios from 'axios'

export const state = () => ({
  items: [],
  item: {},
})

export const getters = {
  itemGetter(state) {
    return state.item
  },
}

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
  setItem(state, item) {
    state.item = item
  },
}

export const actions = {
  getItems({ commit }) {
    axios
      .get(
        `http://localhost:3000/api/v1/items`,

        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.found) {
          console.log('見つかりました。')
          commit('setItems', response.data.items)
        } else {
          console.log('見つかりませんでした。')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  async postItem({ commit }, item) {
    return await this.$axios.$post('http://localhost:3000/api/v1/items', item, {
      headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
      withCredentials: true,
    })
  },
  getItem({ commit }, itemId) {
    axios
      .get(
        `http://localhost:3000/api/v1/items/${itemId}`,

        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.found) {
          console.log('見つかりました。')
          commit('setItem', response.data.item)
        } else {
          console.log('見つかりませんでした。')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
}
