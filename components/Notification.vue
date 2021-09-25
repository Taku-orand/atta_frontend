<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog v-model="dialog" max-width="600px">
        <v-alert
          dense
          :type="type"
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
    type: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    switchType() {
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
