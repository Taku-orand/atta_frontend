import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'my-key',
      paths:[
        "lost_item.lostItemData.item.id"
      ]
    })(store)
  })
}
