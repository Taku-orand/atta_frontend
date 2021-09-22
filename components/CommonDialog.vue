<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="200">
      <v-card justify="center">
        <v-card-title class="headline">確認</v-card-title>
          <v-card-text>{{ msg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="no()">No</v-btn>
          <v-btn color="green darken-1" text @click="yes()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['msg', 'isOpen', 'doYes', 'doNo', 'mode'],
  data() {
    return {
      dialog: false,
    }
  },
  watch: {
    isOpen(val) {
      this.dialog = val
    },
  },
  methods: {
    yes() {
      this.doYes()
      this.dialog = false
    },
    no() {
      this.doNo()
      this.dialog = false
    },
  },
}
</script>
