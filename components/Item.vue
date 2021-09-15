<template>
  <v-row>
    <v-col>
      <v-card elevation="2" outlined shaped @click="itemDetails()">
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-text>{{ item.content }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      users: 10
    };
  },
  computed: {},
  methods: {
    itemDetails() {
      this.$router.push(`/items/${this.item.id}`);
    }
  }
}
</script>