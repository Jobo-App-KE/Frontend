<!-- components/Footer.vue -->
<template>
  <v-footer class="bg-grey-darken-4 py-8 text-white">
    <v-container>
      <v-row justify="center" class="mb-6">
        <v-col cols="12" class="text-center">
          <span class="text-h5 font-weight-bold text-success">jobO</span>
          <span class="text-subtitle-1 ml-1 text-secondary">takes a village...</span>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-6">
        <!-- Main Links Section -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">Main Links</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/careers" class="text-white text-decoration-none">Careers</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/press" class="text-white text-decoration-none">Press</router-link>
            </li>
          </ul>
        </v-col>

        <!-- Support Section -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">Support</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/contact" class="text-white text-decoration-none">Contact Us</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/help" class="text-white text-decoration-none">Help Center</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/safety" class="text-white text-decoration-none">Safety</router-link>
            </li>
          </ul>
        </v-col>

        <!-- Legal Links Section -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">Legal</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/terms-of-service" class="text-white text-decoration-none">Terms of Service</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/privacy-policy" class="text-white text-decoration-none">Privacy Policy</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/cookie-policy" class="text-white text-decoration-none">Cookie Policy</router-link>
            </li>
          </ul>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <div class="text-caption text-grey-lighten-1">
            © {{ new Date().getFullYear() }} jobO. All rights reserved.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// No script logic needed for this simple footer component
</script>

<style scoped>
/* Scoped styles for Footer.vue if needed */
.list-unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
