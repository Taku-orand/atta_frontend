<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          {{ $route.params.id }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import QRCode from 'qrcode'
export default {
  props: ['item'],
  data() {
    return {
      code: "",
    }
  },
  mounted(){
    this.$store.commit('isLoggedIn')
  },
  methods: {
    createQRCode() {
      QRCode.toDataURL(
        `http://localhost:3333/lost-items/${this.$route.params.id}`,
        { width: 300 }
      )
        .then((qrCode) => {
          // QRcodeをimgタグのsrcに入れる
          this.qrCode = qrCode
        })
        .catch((err) => {
          console.error(err)
        })
    },
  }
}
</script>
