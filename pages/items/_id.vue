<template>
  <v-container>
    <!-- アイテム情報 -->
    <v-row class="justify-center">
      <v-col>
        <v-card>
          名前：{{ item.name }}<br />
          内容：{{ item.content }}
        </v-card>
      </v-col>
    </v-row>

    <!-- QRコード生成ボタン -->
    <v-row class="justify-end">
      <v-col cols="8">
        <v-text-field v-model="wid"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn class="mr-5" @click="createQRCode(wid)">QRCodeを作成</v-btn>
      </v-col>
    </v-row>

    <!-- QRCODE -->
    <v-row class="justify-center">
      <div v-if="item.qr_code">
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
    createQRCode(wid) {
      QRCode.toDataURL(
        `http://localhost:3333/lost-items/${this.$route.params.id}/${this._uid}`,
        { width: wid }
      )
        .then(async (qrCode) => {
          // QRcodeをimgタグのsrcに入れる
          this.qrCode = qrCode
          await this.$store.dispatch('item/updateItem', {
            itemId: this.$route.params.id,
            item: { qr_code: this.qrCode, isValid: true, verification_id: this._uid },
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
