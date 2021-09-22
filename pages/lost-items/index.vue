<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-subtitle>落とし物詳細情報</v-card-subtitle>
          <v-card-text> 持ち主: {{ lost_item.user.name }} </v-card-text>
          <v-card-text> 落とし物: {{ lost_item.item.name }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-form>
      <v-row row justify-center align-center>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="foundLocation"
            label="見つけた場所"
            class="centered-input"
            :hide-details="true"
            placeholder="渋谷のマクドナルド..."
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="itemDestination"
            label="落とし物の現在地"
            class="centered-input"
            :hide-details="true"
            placeholder="〇〇の交番、見つけた場所にある"
          />
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn @click="postNotification"
          ><v-icon left>mdi-account-arrow-left</v-icon>持ち主に知らせる!</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      foundLocation: '',
      itemDestination: '',
    }
  },
  async fetch({ store }) {
    const Key = localStorage.getItem('my-key')
    const Item = await JSON.parse(Key)
    await store.dispatch(
      'lost_item/getLostItem',
      Item.lost_item.lostItemData.item.id
    )
  },
  computed: {
    lost_item() {
      return this.$store.getters['lost_item/lostItemDataGetter']
    },
  },
  mounted() {
    this.$store.commit('setShowUserInfo', false)
  },
  methods: {
    postNotification() {
      this.$store.dispatch('lost_item/postNotification', {
        lostItemData: {
          foundLocation: this.foundLocation,
          itemDestination: this.itemDestination,
          email: this.lost_item.user.email,
          user_name: this.lost_item.user.name,
          item_name: this.lost_item.item.name,
        },
      })
    },
  },
}
</script>
