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
      .get(`http://localhost:3000/api/v1/lost_items/${lostItemId}`, {
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
    axios
      .post(
        `http://localhost:3000/api/v1/lost_items`,
        {
          lostItemData,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.created) {
          // 通知成功
        } else {
          // 通知失敗
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  isValidQRCode({ commit }, params) {
    return this.$axios.$post(
      `http://localhost:3000/api/v1/lost_items/verificate_qrcode`,
      {item: { id: params.id, verification_id: params.vid }}
    )
  },
}
