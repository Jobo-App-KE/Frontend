<template>
  <v-card class="pa-4 rounded-xl mb-6">
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h6 font-weight-bold text-green-darken-3">{{ title }}</h2>
      <v-icon color="green-darken-3">mdi-chevron-right</v-icon>
    </div>
    <div class="d-flex justify-space-around align-center mt-4">
      <div v-for="(metric, index) in metrics" :key="index" class="text-center">
        <div class="text-h4 font-weight-bold text-grey-darken-4">{{ metric.value }}</div>
        <div class="text-caption text-grey-darken-1 mt-1">{{ metric.label }}</div>
      </div>
    </div>
    <div v-if="note" class="text-center text-caption text-grey-darken-1 mt-4">
      {{ note }}
    </div>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: String,
  metrics: Array,
  note: {
    type: String,
    default: '',
  },
});
</script>
