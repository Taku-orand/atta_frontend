<template>
  <v-app-bar fixed app>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <Settings v-if="showUserInfo"></Settings>
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
    }
  },
  computed: {
    showUserInfo() {
      return this.$store.state.showUserInfo
    },
  },
}
</script>
