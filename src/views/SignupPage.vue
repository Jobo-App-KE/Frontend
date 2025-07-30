<!-- views/Signup.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6 rounded-xl" width="100%" max-width="450" flat>
      <div class="text-center mb-6">
        <h1 class="text-h5 font-weight-bold text-text mb-2">Create Account</h1>
        <p class="text-body-2 text-secondary">Fill in your details to get started</p>
      </div>

      <v-form @submit.prevent="handleSignup">
        <v-text-field v-model="username" label="Username" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required, rules.minUsername]"></v-text-field>

        <v-text-field v-model="email" label="Email" type="email" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required, rules.email]"></v-text-field>

        <v-text-field v-model="password" label="Password" type="password" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required, rules.minPassword]"></v-text-field>

        <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" variant="outlined"
          density="comfortable" class="mb-6 rounded-lg" :rules="[rules.required, rules.passwordMatch]"></v-text-field>

        <v-btn type="submit" color="success" block class="rounded-lg py-3" :loading="loading">
          Sign up
        </v-btn>
      </v-form>

      <div class="text-center mt-6">
        <span class="text-body-2 text-secondary">Already have an account? </span>
        <router-link to="/login" class="text-success text-decoration-none font-weight-medium">Sign in</router-link>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
// import { useAuthStore } from '../stores/auth'; // Example if you create an auth store

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

// Basic validation rules
const rules = {
  required: value => !!value || 'This field is required.',
  minUsername: value => (value && value.length >= 3) || 'Username must be at least 3 characters.',
  email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  minPassword: value => (value && value.length >= 6) || 'Password must be at least 6 characters.',
  passwordMatch: value => value === password.value || 'Passwords do not match.',
};

const handleSignup = async () => {
  // In a real application, you would send these registration details to your backend
  // const authStore = useAuthStore();
  // loading.value = true;
  // try {
  //   await authStore.signup({ username: username.value, email: email.value, password: password.value });
  //   // Redirect to login or a confirmation page
  //   router.push('/login');
  // } catch (error) {
  //   // Display error message
  //   console.error('Signup failed:', error);
  // } finally {
  //   loading.value = false;
  // }

  // Simulate signup success for demonstration
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  loading.value = false;
  console.log('Attempting to sign up with:', { username: username.value, email: email.value, password: password.value });
  alert('Signup successful! (Simulated)'); // Replace with a proper Vuetify dialog
  // Redirect to login
  // router.push('/login');
};
</script>

<style scoped>
/* Scoped styles for Signup.vue if needed */
</style>
