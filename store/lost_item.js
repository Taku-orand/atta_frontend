import axios from 'axios'

export const state = () => ({
  lostItemData: {},
})

export const getters = {
  lostItemDataGetter(state) {
    return state.lostItemData
  },
}

export const mutations = {
  setLostItem(state, lostItemData) {
    state.lostItemData = lostItemData
  },
}

export const actions = {
  async getLostItem({ commit }, lostItemId) {
    await axios
      .get(process.env.ATTA_BACKEND + `/api/v1/lost_items/${lostItemId}`, {
        headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.found) {
          // 見つかりました。
          commit('setLostItem', response.data.lostItemData)
        } else {
          // 見つかりませんでした。
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  postNotification({ commit }, lostItemData) {
    // indexjsに移動
    return this.$axios.$post(
      process.env.ATTA_BACKEND + `/api/v1/lost_items`,
      {
        lostItemData,
      },
      { withCredentials: true }
    )
  },
  isValidQRCode({ commit }, params) {
    return this.$axios.$post(
      process.env.ATTA_BACKEND + `/api/v1/lost_items/verificate_qrcode`,
      { item: { id: params.id, verification_id: params.vid } }
    )
  },
  async updateItem({ commit }, { itemId, item }) {
    try {
      const Item = await this.$axios.$patch(
        process.env.ATTA_BACKEND + `/api/v1/lost_items/${itemId}`,
        { item },
        {
          withCredentials: true,
        }
      )
      if (Item.updated) {
        // 成功
      }
    } catch (e) {
      console.log(e)
    }
  },
}
