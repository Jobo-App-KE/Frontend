<template>
  <v-card class="pa-4 rounded-xl">
    <div class="d-flex align-center">
      <div class="flex-grow-1">
        <div class="font-weight-bold text-h6">{{ task.name }}</div>
        <div class="text-caption text-grey-darken-1 d-flex align-center mt-2">
          <v-icon size="small" class="mr-1">mdi-calendar</v-icon>{{ task.date }}
        </div>
        <div class="text-caption text-grey-darken-1 d-flex align-center mt-1">
          <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>{{ task.location }}
        </div>
        <div class="text-caption text-grey-darken-1 d-flex align-center mt-1">
          <v-icon size="small" class="mr-1">mdi-cash</v-icon>Total Invoiced: ${{ task.invoiced.toFixed(2) }}
        </div>
      </div>
      <v-avatar size="64">
        <v-img :src="task.clientImage"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>
