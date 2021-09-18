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
  computed: {
    items(){
      return this.$store.state.item.items
    }
  },
  mounted() {
    this.$store.commit('setShowUserInfo',true)
    this.isLoggedIn()
    this.$store.dispatch('item/getItems')
  },
  methods: {
    isLoggedIn() {
      if (!this.$auth0.isAuthenticated()) {
        this.$router.replace('/')
      }
    },
  },
}
</script>
