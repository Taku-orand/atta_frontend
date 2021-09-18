<template>
  <v-row>
    <v-col>
      <v-card>
        {{ $route.params.id }}
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default{
    props: ['item'],
    data(){
      return {
      }
    }
  }
</script>