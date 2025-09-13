<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold text-green-darken-3 mb-6">Profile</h1>

    <!-- Profile Header -->
    <v-card class="pa-4 rounded-xl mb-6">
      <div class="d-flex align-center">
        <v-avatar size="80" class="mr-4">
          <v-img src="https://placehold.co/100x100/A3BE8C/fff?text=R.R."></v-img>
        </v-avatar>
        <div class="flex-grow-1">
          <h2 class="text-h5 font-weight-bold text-green-darken-3">Randy R.</h2>
          <v-btn variant="text" color="green-darken-3" class="text-capitalize pa-0">View Account Details</v-btn>
        </div>
      </div>
    </v-card>

    <!-- Profile Sections -->
    <v-card class="pa-4 rounded-xl">
      <v-list-item class="my-2" prepend-icon="mdi-account-circle">
        <v-list-item-title class="font-weight-bold">About Me</v-list-item-title>
        <v-list-item-subtitle>This is what your Clients see about you</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="my-2" prepend-icon="mdi-map-marker">
        <v-list-item-title class="font-weight-bold">Work Area</v-list-item-title>
        <v-list-item-subtitle>View or edit your Work Area</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="my-2" prepend-icon="mdi-car">
        <v-list-item-title class="font-weight-bold">Vehicles</v-list-item-title>
        <v-list-item-subtitle>View or edit your Vehicles</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="my-2" prepend-icon="mdi-message-text">
        <v-list-item-title class="font-weight-bold">Closing Messages</v-list-item-title>
        <v-list-item-subtitle>Edit your default closing statements to Clients</v-list-item-subtitle>
      </v-list-item>
    </v-card>

    <!-- Support and Settings -->
    <h2 class="text-h6 font-weight-bold text-grey-darken-1 mt-8 mb-4">Support & Settings</h2>
    <v-card class="pa-4 rounded-xl">
      <v-list-item class="my-2" prepend-icon="mdi-lifebuoy">
        <v-list-item-title class="font-weight-bold">Support</v-list-item-title>
        <v-list-item-subtitle>Options</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="my-2" prepend-icon="mdi-cog">
        <v-list-item-title class="font-weight-bold">Settings</v-list-item-title>
        <v-list-item-subtitle>Manage password, logout</v-list-item-subtitle>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script setup>
// No data or logic needed for this static page
</script>
