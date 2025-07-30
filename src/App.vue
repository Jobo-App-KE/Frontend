<!-- App.vue -->
<template>
  <v-app>
    <!-- App Bar Component -->
    <AppBar @toggle-drawer="drawer = !drawer" />

    <!-- Navigation Drawer Component -->
    <NavigationDrawer v-model="drawer" />

    <!-- Main Content Area -->
    <v-main class="bg-background">
      <v-container fluid class="pa-0">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import AppBar from './components/AppBar.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';

// Reactive variable to control the visibility of the navigation drawer
const drawer = ref(false);
</script>

<style>
/* Global styles or overrides can go here if needed */
body {
  font-family: 'Inter', sans-serif;
  /* Assuming Inter font is desired */
}
</style>
