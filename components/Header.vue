<template>
  <v-app-bar fixed app>
    <NuxtLink :to="itemListUrl">
      <v-toolbar-title v-text="title" />
    </NuxtLink>
    <v-spacer />
    <Settings v-if="showUserInfo"></Settings>
    <v-spacer />
    <NuxtLink v-if="showUserInfo" to="/logout">
      <v-btn class="warning">ログアウト</v-btn>
    </NuxtLink>
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
  },
}
</script>
