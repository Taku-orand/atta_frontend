<template>
  <v-container>
    <v-row>
      <v-col>
        <Item v-for="item in items" :key="item.id" :item="item"></Item>
      </v-col>
    </v-row>

    <PostItem></PostItem>
  </v-container>
</template>

<script>
import Item from '../../components/Item.vue'
import PostItem from '../../components/PostItem.vue'

export default {
  components: {
    Item,
    PostItem,
  },
  async fetch({ store }) {
    await store.dispatch('user/getUser')
    await store.dispatch('item/getItems')
  },
  computed: {
    items() {
      return this.$store.getters['item/itemsGetter']
    },
  },
  created() {
    this.$store.commit('isLoggedIn')
  },
  mounted() {
    this.$store.commit('setShowUserInfo', true)
  },
  updated() {
    this.isFirstLogin()
  },
  methods: {
    isFirstLogin() {
      if (this.$store.state.user.user.initial) {
        const userInfo = document.getElementById('userInfo')
        userInfo.click()
      }
    },
  },
}
</script>
