<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog v-model="dialog" max-width="600">
        <v-alert
          v-if="switchMode == 'success'"
          dense
          type="success"
          border="left"
          elevation="2"
        >
          {{ msg }}
        </v-alert>
        <v-alert
          v-else-if="switchMode == 'error'"
          dense
          type="error"
          border="left"
          elevation="2"
        >
          {{ msg }}
        </v-alert>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
    },
    mode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    switchMode() {
      return this.mode
    },
  },
  watch: {
    isOpen(val) {
      this.dialog = val
    },
  },
}
</script>
