<!-- components/NavigationDrawer.vue -->
<template>
  <v-navigation-drawer v-model="drawer" app temporary width="280" class="bg-grey-darken-4">
    <v-list nav>
      <!-- Logo at the top of the drawer -->
      <v-list-item class="py-4 px-4">
        <v-toolbar-title class="d-flex align-center">
          <span class="text-h5 font-weight-bold text-success">jobO</span>
          <span class="text-subtitle-2 ml-1 text-secondary">takes a village...</span>
        </v-toolbar-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Main navigation links (these are your routes) -->
      <v-list-item v-for="item in mainLinks" :key="item.title" :to="item.to" link class="text-white">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Footer with copyright and policy links -->
    <template v-slot:append>
      <div class="pa-4 text-center text-caption text-grey-lighten-1">
        © {{ new Date().getFullYear() }} jobO. All rights reserved.
        <div class="mt-2">
          <router-link to="/privacy-policy" class="text-grey-lighten-1 text-decoration-none mr-2">Privacy
            Policy</router-link>
          <router-link to="/terms-of-service" class="text-grey-lighten-1 text-decoration-none mr-2">Terms of
            Service</router-link>
          <router-link to="/cookie-policy" class="text-grey-lighten-1 text-decoration-none">Cookie Policy</router-link>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';

// Define props for the component, specifically 'modelValue' for v-model functionality
const props = defineProps({
  modelValue: Boolean,
});

// Define emits for the component, specifically 'update:modelValue' for v-model functionality
const emit = defineEmits(['update:modelValue']);

// Computed property to handle v-model for the drawer
const drawer = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

// Main navigation links - these correspond to your routes
const mainLinks = [
  { title: 'Home', to: '/' },
  { title: 'Providers', to: '/providers' },
];

// // Support navigation links - these also correspond to your routes
// const supportLinks = [
//   { title: 'Contact Us', to: '/contact' },
//   { title: 'Help Center', to: '/help' },
//   { title: 'Safety', to: '/safety' },
//   { title: 'Terms of Service', to: '/terms-of-service' },
//   { title: 'Privacy Policy', to: '/privacy-policy' },
// ];
</script>

<style scoped>
/* Scoped styles for NavigationDrawer if needed */
</style>
