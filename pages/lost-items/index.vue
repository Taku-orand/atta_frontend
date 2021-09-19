<template>
  <v-container>
    <v-card>
      <v-card-subtitle>落とし物詳細情報</v-card-subtitle>
      <v-card>
        持ち主: {{userName}}
      </v-card>
    </v-card>
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
            placeholder="〇〇の交番、現在地に同じ..."
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data(){
    return {
      userName: ""
    }
  },
  mounted() {
    this.$store.commit('setShowUserInfo', false)
  },
  // destroyed () {
  //   window.removeEventListener("beforeunload", this.confirmSave);
  // },
  // methods: {
  //   confirmSave (event) {
  //     event.returnValue = "編集中のものは保存されませんが、よろしいですか？";
  //   },
  // }
}
</script>
