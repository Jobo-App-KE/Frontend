<template>
  <v-card class="pa-4 rounded-xl text-center">
    <div class="d-flex justify-center align-center mb-2">
      <v-icon :color="color" class="mr-2">mdi-chart-line</v-icon>
      <div class="text-h4 font-weight-bold" :class="`text-${color}`">{{ value }}</div>
    </div>
    <div class="text-body-1 font-weight-bold">{{ title }}</div>
    <div v-if="subtitle" class="text-caption text-grey-darken-1 mt-1">{{ subtitle }}</div>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  value: [String, Number],
  color: {
    type: String,
    default: 'black',
  },
  subtitle: {
    type: String,
    default: null,
  },
});
</script>
