<!-- components/ServiceCategoryCard.vue -->
<template>
  <v-card class="mx-auto rounded-xl d-flex flex-column align-center justify-center pa-4" flat height="150" width="150"
    :color="highlight ? 'success-lighten-4' : 'grey-lighten-3'" @click="$emit('select-category', category)"
    style="cursor: pointer;">
    <v-icon :color="highlight ? 'success' : 'grey-darken-1'" size="48">{{ icon }}</v-icon>
    <div :class="['text-caption mt-2 text-center', highlight ? 'text-success' : 'text-text']">{{ category }}</div>
  </v-card>
</template>

<script setup>
// Define props for the component
defineProps({
  icon: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  highlight: {
    type: Boolean,
    default: false,
  },
});

// Define emits for the component
defineEmits(['select-category']);
</script>

<style scoped>
/* Scoped styles for ServiceCategoryCard if needed */
</style>
