<template>
  <v-app dark>
    <Header v-if="showHeader"></Header>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <Footer v-if="showFooter"></Footer>
  </v-app>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      title: 'AttA',
    }
  },
  computed: {
    showHeader() {
      return this.$store.state.showHeader
    },
    showFooter(){
      return this.$store.state.showFooter
    }
  },
}
</script>
