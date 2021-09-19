<template>
  <v-container>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          情報を取得しています。
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-subtitle>落とし物詳細情報</v-card-subtitle>
          <v-card-text> 持ち主: {{ userName }} </v-card-text>
          <v-card-text> 落とし物: {{ itemName }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-form>
      <v-row row justify-center align-center>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            label="見つけた場所"
            class="centered-input"
            :hide-details="true"
            placeholder="渋谷のマクドナルド..."
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            label="落とし物の現在地"
            class="centered-input"
            :hide-details="true"
            placeholder="〇〇の交番、見つけた場所にある"
          />
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn @click="postNotification"><v-icon left>mdi-account-arrow-left</v-icon>持ち主に知らせる!</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      itemName: '',
      dialog: true,
    }
  },
  computed: {},
  // watch: {
  //   dialog(val) {
  //     if (!val) return

  //     setTimeout(() => this.showUserInfo(), 4000)
  //   },
  // },
  mounted() {
    this.$store.commit('setShowUserInfo', false)
    this.reload()
    setTimeout(() => this.showUserInfo(), 1000)
  },
  methods: {
    showUserInfo() {
      const LostItemData = this.$store.getters['lost_item/lostItemDataGetter']
      this.userName = LostItemData.user.name
      this.itemName = LostItemData.item.name
      this.dialog = false
    },
    async reload() {
      const key = localStorage.getItem('my-key')
      const obj = await JSON.parse(key)
      await this.$store.dispatch(
        'lost_item/getLostItem',
        obj.lost_item.lostItemData.item.id
      )
    },
    postNotification(){

    }
  },
}
</script>
