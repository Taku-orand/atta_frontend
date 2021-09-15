import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
      key: "my-key",
      paths: ["list"]
    })(store)
}
