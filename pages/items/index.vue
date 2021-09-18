<template>
  <v-row>
    <v-col>
      <Item v-for="item in items" :key="item.id" :item="item"></Item>
    </v-col>
  </v-row>
</template>

<script>
import Item from '../../components/Item.vue'
export default {
  components: {
    Item,
  },
  computed: {
    items() {
      return this.$store.state.item.items
    },
  },
  mounted() {
    this.isLoggedIn()
    this.$store.dispatch('item/getItems')
  },
  methods: {
    isLoggedIn(){
      if(!this.$auth0.isAuthenticated()){
        this.$router.replace('/') 
      }
    }
  }
}
</script>
