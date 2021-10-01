<template>
  <v-app-bar fixed app>
    <div v-if="!showHistory">
      <v-row>
        <v-col cols="2">
          <v-btn x-small depressed disabled class="mt-1 ml-6">
            <NuxtLink :to="itemListUrl">
              <img src="~/assets/logo.png" />
            </NuxtLink>
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <Settings v-if="showUserInfo"></Settings>
        </v-col>
        <v-col cols="4">
          <NuxtLink v-if="showUserInfo" to="/logout">
            <v-btn small class="error">ログアウト</v-btn>
          </NuxtLink>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-btn small color="primary" @click="goBack"
        ><v-icon>mdi-arrow-left-bold</v-icon></v-btn
      >
    </div>
  </v-app-bar>
</template>
<script>
import Settings from './Settings.vue'
export default {
  components: {
    Settings,
  },
  data() {
    return {
      itemListUrl: '/items',
    }
  },
  computed: {
    showUserInfo() {
      return this.$store.state.showUserInfo
    },
    showHistory() {
      if (this.$route.path === `/items/${this.$route.params.id}`) {
        return true
      }
      return false
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style>
img {
  height: 4.5rem;
  width: 5rem;
}
</style>
