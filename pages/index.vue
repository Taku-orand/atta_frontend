<template>
  <section class="container">
    <div>
      <v-row>
        <v-col cols="12">
          <h1>ATTAで落とし物を見つけよう！</h1>
          <h2>みんなで協力して優しい世界を作ろう!</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="content">
          <h2></h2>
          <nuxt-link class="button is-primary" to="/login">
            <span class="icon"><i class="fa fa-sign-in"></i></span>
            <span>ログインする!</span>
          </nuxt-link>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setShowUserInfo', false)
  },
  methods: {
    loggedIn() {
      return this.$auth0.isAuthenticated()
    },
    async ping() {
      const ret = await this.$axios.$get('/api/v1/ping')
      console.log(ret)
    },
    async secured() {
      const ret = await this.$axios.$get('/api/v1/secured', {
        headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
      })
      console.log(ret)
    },
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
