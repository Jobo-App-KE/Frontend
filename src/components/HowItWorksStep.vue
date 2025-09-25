<!-- components/HowItWorksStep.vue -->
<template>
  <v-card flat class="d-flex rounded-xl flex-column align-center text-center pa-4">
    <v-avatar size="80" :color="iconBgColor" class="mb-4">
      <v-icon :color="iconColor" size="48">{{ icon }}</v-icon>
    </v-avatar>
    <div class="text-h6 font-weight-bold text-text">{{ title }}</div>
    <div class="text-body-2 text-secondary mt-2">{{ description }}</div>
  </v-card>
</template>

<script setup>
// Define props for the component
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  iconBgColor: {
    type: String,
    default: 'success-lighten-4',
  },
  iconColor: {
    type: String,
    default: 'success',
  },
});
</script>

<style scoped>
/* Scoped styles for HowItWorksStep if needed */
</style>
