<template>
  <v-row>
    <v-col>
      <v-card>
        {{ $route.params.id }}
        {{ $store.state.item.item.name}}
      </v-card>
    </v-col>
  </v-row>
</template>