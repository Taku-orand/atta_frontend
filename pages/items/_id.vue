<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          {{ $route.params.id }}
        </v-card>
      </v-col>
    </v-row>
    <v-btn @click="make"> QRコード生成 </v-btn>
    <img v-if="code ? true : false" :src=code>
  </v-container>
</template>
<script>
import QRCode from 'qrcode'
export default {
  props: ['item'],
  data() {
    return {
      code: "",
      isMade: false
    }
  },
  computed: {
    qrcode(){
      return this.code
    }
  },
  mounted(){
    this.$store.commit('isLoggedIn')
  },
  methods: {
    make() {
      QRCode.toDataURL('http://localhost:3333/lost-items/'+this.$route.params.id, { width: 100 })
        .then((code) => {
          // コード(URLスキーム)が生成されるので、imgタグのsrc=の中に値を入れましょう
          console.log(code)
          this.code = code
          this.isMade = true
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
