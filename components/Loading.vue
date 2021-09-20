<template>
  <v-dialog v-bind="loadingDialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        情報を取得しています。
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    loadingDialog: Boolean
  },
}
</script>
