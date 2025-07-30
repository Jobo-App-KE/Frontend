<!-- components/AppBar.vue -->
<template>
  <v-app-bar app color="white" flat>
    <v-container class="d-flex align-center py-0">
      <!-- Hamburger menu icon - clicking this will toggle the navigation drawer -->
      <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>

      <!-- Logo and tagline -->
      <v-toolbar-title class="d-flex align-center ml-2">
        <span class="text-h5 font-weight-bold text-success">jobO</span>
        <span class="text-subtitle-2 ml-1 text-secondary">takes a village...</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Placeholder for potential right-side elements (e.g., user avatar, notifications) -->
    </v-container>
  </v-app-bar>
</template>

<script setup>
// Emits an event to toggle the navigation drawer in the parent component (App.vue)
defineEmits(['toggle-drawer']);
</script>

<style scoped>
/* Scoped styles for AppBar if needed */
</style>
