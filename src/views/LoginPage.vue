<!-- views/Login.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6 rounded-xl" width="100%" max-width="450" flat>
      <div class="text-center mb-6">
        <h1 class="text-h5 font-weight-bold text-text mb-2">Sign in</h1>
        <p class="text-body-2 text-secondary">Enter your credentials to access your account</p>
      </div>

      <v-form @submit.prevent="handleLogin" ref="loginForm">
        <!-- Role Selection -->
        <v-radio-group v-model="role" inline class="mb-4">
          <v-radio label="Client" value="client" color="success"></v-radio>
          <v-radio label="Provider" value="provider" color="success"></v-radio>
        </v-radio-group>

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
        <!-- Changed to a standard anchor tag for a self-contained example -->
        <a href="#" class="text-success text-decoration-none font-weight-medium">Sign up</a>
      </div>
    </v-card>
  </v-container>

  <!-- Snackbar for user feedback -->
  <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
    {{ snackbarText }}
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue';

const role = ref('client');
const username = ref('');
const password = ref('');
const loading = ref(false);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('');
const loginForm = ref(null);

// Basic validation rules
const rules = {
  required: value => !!value || 'This field is required.',
};

// Helper method to show the snackbar
const showSnackbar = (text, color) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
};

const handleLogin = async () => {
  // Validate the form before attempting login
  const { valid } = await loginForm.value.validate();
  if (!valid) {
    showSnackbar('Please fill in all fields correctly.', 'error');
    return;
  }

  // In a real application, you would send these credentials and the role to your backend
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  loading.value = false;
  console.log('Attempting to sign in with:', { role: role.value, username: username.value, password: password.value });

  // Use the snackbar for feedback instead of alert()
  showSnackbar('Login successful! (Simulated)', 'success');
};
</script>

<style scoped>
/* Scoped styles for Login.vue if needed */
</style>
