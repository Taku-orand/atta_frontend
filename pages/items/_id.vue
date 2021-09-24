<template>
  <v-container>
    <!-- アイテム情報 -->
    <v-row class="justify-center">
      <v-col>
        <v-card>
          <div v-if="!edit">
            名前：{{ item.name }}<br />
            内容：{{ item.content }}<br />
          </div>
          <div v-if="edit">
            <v-row dense>
              <v-col cols="3"> 名前： </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="tempName"
                  dense
                  height="17"
                ></v-text-field>
              </v-col>
            </v-row>
            内容：
            <v-textarea
              v-model="tempContent"
              class="centered-input"
              :hide-details="true"
              auto-grow
              rows="1"
              outlined
            />
          </div>
          <div v-if="!edit">
            <v-btn small @click="editItem">編集</v-btn>
            <v-btn small class="error" @click="deleteItem">削除</v-btn>
          </div>
          <div v-if="edit">
            <v-row row justify-end align-end>
              <v-col class="justify-center">
                <v-row>
                  <v-col>
                    <v-btn small @click="updateItem">保存</v-btn>
                    <v-btn small @click="doneEdit">キャンセル</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- QRコード生成ボタン -->
    <v-row class="justify-end">
      <v-col cols="8">
        <v-text-field v-model="wid" label="サイズ" height="17"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn class="mr-5" @click="createQRCode(wid)">
          QRCodeを<span v-if="item.qr_code == 'null'">作成</span><span v-else>アップデート</span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- QRCODE -->
    <v-row class="justify-center">
      <div v-if="item.qr_code !== 'null'">
        <img :src="item.qr_code" />
      </div>
    </v-row>
  </v-container>
</template>
<script>
import QRCode from 'qrcode'

export default {
  data() {
    return {
      qrCode: '',
      isCreated: false,
      wid: 100,
      edit: false,
      tempName: '',
      tempContent: '',
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('user/getUser')
    await store.dispatch('item/getItem', params.id)
  },
  computed: {
    item() {
      return this.$store.getters['item/itemGetter']
    },
  },

  mounted() {
    this.$store.commit('isLoggedIn')
  },

  methods: {
    deleteItem(){
      this.$store.dispatch('item/deleteItem', this.$route.params.id)
      this.$router.push('/items')
    },
    async updateItem() {
      await this.$store.dispatch('item/updateItem', {
        itemId: this.$route.params.id,
        item: { name: this.tempName, content: this.tempContent },
      })
      this.doneEdit()
    },
    editItem() {
      this.tempName = this.item.name
      this.tempContent = this.item.content
      this.edit = true
    },
    doneEdit() {
      this.tempName = ''
      this.tempContent = ''
      this.edit = false
    },
    createQRCode(wid) {
      QRCode.toDataURL(
        process.env.VUE_APP_ATTA_FRONTEND,+`/lost-items/${this.$route.params.id}/${this._uid}`,
        { width: wid }
      )
        .then(async (qrCode) => {
          // QRcodeをimgタグのsrcに入れる
          this.qrCode = qrCode
          await this.$store.dispatch('item/updateItem', {
            itemId: this.$route.params.id,
            item: {
              qr_code: this.qrCode,
              isValid: true,
              verification_id: this._uid,
            },
          })
          await this.$store.dispatch('item/getItem', this.$route.params.id)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
