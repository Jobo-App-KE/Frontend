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

        <v-text-field
          v-model="username"
          label="Username"
          variant="outlined"
          density="comfortable"
          class="mb-4 rounded-lg"
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          density="comfortable"
          class="mb-6 rounded-lg"
          :rules="[rules.required]"
        ></v-text-field>

        <v-btn
          type="submit"
          color="success"
          block
          class="rounded-lg py-3"
          :loading="loading"
        >
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

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      role: 'client',
      username: '',
      password: '',
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      // Basic validation rules moved to data
      rules: {
        required: value => !!value || 'This field is required.',
      },
    };
  },
  methods: {
    // Helper method to show the snackbar
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    // Handler for the login form submission
    async handleLogin() {
      // Validate the form using the ref
      const { valid } = await this.$refs.loginForm.validate();
      if (!valid) {
        this.showSnackbar('Please fill in all fields correctly.', 'error');
        return;
      }

      // In a real application, you would send these credentials and the role to your backend
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.loading = false;
      console.log('Attempting to sign in with:', { role: this.role, username: this.username, password: this.password });

      // Use the snackbar for feedback instead of alert()
      this.showSnackbar('Login successful! (Simulated)', 'success');
    },
  },
};
</script>

<style scoped>
/* Scoped styles for Login.vue if needed */
</style>
