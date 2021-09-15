<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <Settings></Settings>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Settings from "../components/Settings.vue"
export default {
  components: {
    Settings,
  },
  data () {
    return {
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AttA'
    }
  }
}
</script>