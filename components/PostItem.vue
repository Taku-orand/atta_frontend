<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn
              class="btn btn-lg btn-info shadow p-3 create-question-btn"
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-pencil </v-icon>
              アイテム追加
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">アイテム情報</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="アイテムネーム*"
                      hint="落とし物を見つけた方にのみ表示します"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="content"
                      label="アイテム情報*"
                      hint="特に公開はしません"
                      persistent-hint
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>* いつでも変更可能です。</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                閉じる
              </v-btn>
              <v-btn color="blue darken-1" text @click="postItem"> 追加 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      name: '',
      content: '',
      loadingDialog: false,
    }
  },
  methods: {
    resetItemForm() {
      this.name = ''
      this.content = ''
    },
    async postItem() {
      // this.loadingOnOff()
      const result = await this.$store.dispatch('item/postItem', {
        item: {
          name: this.name,
          content: this.content,
        },
      })
      if (result.created) {
        this.resetItemForm()
        await this.$store.dispatch('item/getItems')
        this.$router.push('/items/' + result.id)
      } else {
        // this.loadingOnOff()
      }
    },
    // loadingOnOff(){
    //   this.loadingDialog = !this.loadingDialog
    // }
  },
}
</script>

<style scoped>
.create-question-btn {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
}
@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 576px) {
  /* 576px以下に適用されるCSS（スマホ用） */
  .create-question-btn {
    width: 50%;
    font-size: 1.2rem;
    right: 1rem;
  }
}
</style>
