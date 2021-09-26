export const state = () => ({
  lostItemInfomations: [],
})

export const getters = {
  lostItemInfomationsGetter(state) {
    return state.lostItemInfomations
  },
}

export const mutations = {
  setlostItemInfomations(state, lostItemInfomations) {
    state.lostItemInfomations = lostItemInfomations
  },
}

export const actions = {
  postLostItemInfomation({ commit }, lostItemInfomation) {
    try {
      return this.$axios.$post(
        process.env.ATTA_BACKEND + '/api/v1/lost_item_infomations',
        lostItemInfomation,
        {
          withCredentials: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
  async getLostItemInfomations({ commit }, itemId) {
    try {
      const LostItemInfomations = await this.$axios.$get(
        process.env.ATTA_BACKEND + '/api/v1/lost_item_infomations/' + itemId,
        {
          withCredentials: true,
        }
      )
      commit('setlostItemInfomations', LostItemInfomations.lost_item_infomations)
    } catch (e) {
      console.log(e)
    }
  },
  deleteLostItemInfomation({ commit }, itemId) {
    try {
      return this.$axios.$delete(
        process.env.ATTA_BACKEND + '/api/v1/lost_item_infomations/' + itemId,
        {
          withCredentials: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
}
