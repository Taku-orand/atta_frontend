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
        this.$config.VUE_APP_ATTA_BACKEND + '/api/v1/lost_item_infomations',
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
        this.$config.VUE_APP_ATTA_BACKEND +
          '/api/v1/lost_item_infomations/' +
          itemId,
        {
          withCredentials: true,
        }
      )
      commit(
        'setlostItemInfomations',
        LostItemInfomations.lost_item_infomations
      )
    } catch (e) {
      console.log(e)
    }
  },
  deleteLostItemInfomation({ commit }, lostItemInfomationId) {
    try {
      return this.$axios.$delete(
        this.$config.VUE_APP_ATTA_BACKEND +
          '/api/v1/lost_item_infomations/' +
          lostItemInfomationId,
        {
          withCredentials: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
}
