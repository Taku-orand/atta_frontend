export const state = () => ({
  items: [],
  item: {},
})

export const getters = {
  itemGetter(state) {
    return state.item
  },
  itemsGetter(state){
    return state.items
  }
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
  async getItems({ commit }) {
    try {
      const Items = await this.$axios.$get(
        `http://localhost:3000/api/v1/items`,

        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
      commit('setItems', Items.items)
    } catch (e) {
      console.log(e)
    }
  },
  async postItem({ commit }, item) {
    try {
      return await this.$axios.$post(
        'http://localhost:3000/api/v1/items',
        item,
        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
  async getItem({ commit }, itemId) {
    try {
      const Item = await this.$axios.$get(
        `http://localhost:3000/api/v1/items/${itemId}`,

        {
          headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
          withCredentials: true,
        }
      )
      commit('setItem', Item.item)
    } catch (e) {
      console.log(e)
    }
  },
}
