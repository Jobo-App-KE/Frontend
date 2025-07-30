<!-- views/Login.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6 rounded-xl" width="100%" max-width="450" flat>
      <div class="text-center mb-6">
        <h1 class="text-h5 font-weight-bold text-text mb-2">Sign in</h1>
        <p class="text-body-2 text-secondary">Enter your credentials to access your account</p>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field v-model="username" label="Username" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required]"></v-text-field>

        <v-text-field v-model="password" label="Password" type="password" variant="outlined" density="comfortable"
          class="mb-6 rounded-lg" :rules="[rules.required]"></v-text-field>

        <v-btn type="submit" color="success" block class="rounded-lg py-3" :loading="loading">
          Sign in
        </v-btn>
      </v-form>

      <div class="text-center mt-6">
        <span class="text-body-2 text-secondary">Don't have an account? </span>
        <router-link to="/signup" class="text-success text-decoration-none font-weight-medium">Sign up</router-link>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
// You would typically use a store or API service for actual authentication
// import { useAuthStore } from '../stores/auth'; // Example if you create an auth store

const username = ref('');
const password = ref('');
const loading = ref(false);

// Basic validation rules
const rules = {
  required: value => !!value || 'This field is required.',
};

const handleLogin = async () => {
  // In a real application, you would send these credentials to your backend
  // const authStore = useAuthStore();
  // loading.value = true;
  // try {
  //   await authStore.login({ username: username.value, password: password.value });
  //   // Redirect to dashboard or home on success
  //   router.push('/');
  // } catch (error) {
  //   // Display error message
  //   console.error('Login failed:', error);
  // } finally {
  //   loading.value = false;
  // }

  // Simulate login success for demonstration
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  loading.value = false;
  console.log('Attempting to sign in with:', { username: username.value, password: password.value });
  alert('Login successful! (Simulated)'); // Replace with a proper Vuetify dialog
  // Redirect to home or dashboard
  // router.push('/');
};
</script>

<style scoped>
/* Scoped styles for Login.vue if needed */
</style>
