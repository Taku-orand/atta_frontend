<template>
  <v-app-bar fixed app>
    <div v-if="!showHistory">
      <v-row justify="center">
        <v-col>
          <NuxtLink :to="itemListUrl">
            <v-toolbar-title v-text="title" />
          </NuxtLink>
        </v-col>
        <v-spacer />
        <v-col>
          <Settings v-if="showUserInfo"></Settings>
        </v-col>
        <v-spacer />
        <v-col>
          <NuxtLink v-if="showUserInfo" to="/logout">
            <v-btn class="error">ログアウト</v-btn>
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
      title: 'AttA',
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
