<!-- components/ServiceTag.vue -->
<template>
  <v-chip class="ma-2 px-4 py-2 rounded-lg" color="grey-lighten-3" label size="large">
    <span class="font-weight-medium text-text">{{ text }}</span>
  </v-chip>
</template>

<script setup>
// Define props for the component
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Scoped styles for ServiceTag if needed */
</style>
