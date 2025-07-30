<!-- components/ServiceProviderCard.vue -->
<template>
  <v-card class="mx-auto rounded-xl" flat width="300">
    <v-img :src="imageUrl" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
      <v-card-title class="text-white">{{ name }}</v-card-title>
    </v-img>

    <v-card-text class="py-3">
      <div class="font-weight-bold text-subtitle-1">{{ name }}</div>
      <div class="text-caption text-secondary">{{ profession }}</div>

      <div class="d-flex align-center mt-2">
        <v-icon size="small" color="grey-darken-1">mdi-map-marker</v-icon>
        <span class="text-caption ml-1 text-text">{{ location }}</span>
      </div>

      <div class="d-flex align-center mt-1">
        <v-icon size="small" color="success">mdi-currency-usd</v-icon>
        <span class="text-caption ml-1 text-text">{{ rate }}</span>
      </div>
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <v-btn color="success" variant="flat" block class="rounded-lg" @click="$router.push(`/provider-details/${id}`)">
        Book Now
      </v-btn>
      <!-- <v-btn
        color="secondary"
        variant="outlined"
        block
        class="rounded-lg ml-2"
        @click="$emit('contact', id)"
      >
        Contact
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script setup>
// Define props for the component
defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/600x400/E0E0E0/424242?text=Service+Provider',
  },
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
});

// Define emits for the component
// defineEmits(['contact']);
</script>

<style scoped>
/* Scoped styles for ServiceProviderCard if needed */
</style>
