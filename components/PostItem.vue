<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
      qr_code: '',
    }
  },
  methods: {
    postItem() {
      this.$store.dispatch('item/postItem',
      {
        item:{
          name: this.name,
          content: this.content,
          qr_code: "aaaaa"
        }
      }
      )
      //   const ret = await this.$axios
      //   .$post(
      //       'http://localhost:3000/api/v1/items',
      //       {
      //         item: {
      //           name: this.name,
      //           content: this.content,
      //           qr_code: "aaaaa"
      //         },
      //       },
      //       {},
      //       {
      //         headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
      //         withCredentials: true,
      //       }
      //     )
      //     .then((response) => {
      //       if (response.data.created) {
      //         console.log('成功')
      //         this.dialog = false
      //       } else {
      //         console.log('失敗')
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e)
      //     })
      //     console.log(ret)
      // },
    },
  },
}
</script>
