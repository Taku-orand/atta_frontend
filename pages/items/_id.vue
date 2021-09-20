<template>
  <v-container>
    <!-- アイテム情報 -->
    <v-row class="justify-center">
      <v-col>
        <v-card>
          名前：{{itemName}}<br/>
          内容：{{itemContent}}
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
      <div v-if="isCreated"><img :src="qrCode" /></div>
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
      itemName: '',
      itemContent: ''
    }
  },
  mounted() {
    this.$store.commit('isLoggedIn')
    this.$store.dispatch('item/getItem',this.$route.params.id)
    this.getItemFromStore()
  },
  methods: {
    getItemFromStore(){
      const Item = this.$store.getters['item/itemGetter']
      this.itemName = Item.name
      this.itemContent = Item.content
    },
    createQRCode(wid) {
      QRCode.toDataURL(
        `http://localhost:3333/lost-items/${this.$route.params.id}`,
        { width: wid }
      )
        .then((qrCode) => {
          // QRcodeをimgタグのsrcに入れる
          this.qrCode = qrCode
          this.isCreated = true
          console.log(this.qrCode)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
