<template>
  <div id="show-auth"/>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setShowHeader',false)
    this.$store.commit('setShowFooter',false)
    this.$auth0.showLock("show-auth");
  },
};
</script>