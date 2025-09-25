<!-- components/ServiceProviderCard.vue -->
<template>
  <v-card class="d-flex pa-4 rounded-xl" elevation="2">
    <!-- Provider Image and Action Buttons -->
    <div class="d-flex flex-column align-center" style="width: 200px;">
      <v-avatar size="100" class="mb-2">
        <v-img :src="imageUrl" alt="Provider Image"></v-img>
      </v-avatar>
      <v-btn color="success" variant="tonal" class="text-capitalize font-weight-bold rounded-xl mb-2" block
        @click="$emit('view-profile', id)">
        View Profile & Reviews
      </v-btn >
      <v-btn v-if="about" color="success" variant="flat" class="text-capitalize font-weight-bold rounded-xl mb-2" block
        @click="$emit('select-provider', id)">
        Select & Continue
      </v-btn>
      <span class="text-caption text-secondary text-center">
        You can chat with your Tasker, adjust task details, or change task time after booking.
      </span>
    </div>

    <!-- Provider Details and Testimonial -->
    <div class="flex-grow-1 ml-4 d-flex flex-column justify-center">
      <div class="d-flex justify-space-between align-center mb-2">
        <h3 class="text-h6 font-weight-bold">{{ name }}</h3>
        <span class="text-h6 font-weight-bold text-success">{{ rate }}</span>
      </div>
      <div class="d-flex align-center text-body-2 mb-2">
        <v-icon color="yellow-darken-2" icon="mdi-star" size="small"></v-icon>
        <span class="font-weight-bold ml-1">{{ rating }} ({{ reviews }} reviews)</span>
        <v-divider vertical class="mx-2"></v-divider>
        <span>{{ tasksCompleted }} {{ profession }} tasks</span>
      </div>

      <!-- How I can help section (now optional) -->
      <v-card v-if="about" variant="outlined" class="pa-3 mb-4 rounded-xl">
        <div class="text-body-2 text-grey-darken-1 mb-1">How I can help:</div>
        <p class="text-body-2">{{ about }}</p>
        <v-btn variant="text" color="success" class="text-capitalize pa-0" size="small" @click="showMore = !showMore">
          Read More
        </v-btn>
      </v-card>

      <!-- Testimonial section (now optional) -->
      <v-card v-if="testimonial && testimonial.text" variant="outlined" class="pa-3 rounded-xl">
        <v-row no-gutters>
          <v-col cols="2" class="d-flex justify-center">
            <v-avatar size="40">
              <v-img :src="testimonial.imageUrl" alt="Client Image"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10">
            <span class="text-body-2 font-weight-bold">{{ testimonial.name }}</span>
            <span class="text-caption text-grey-darken-1 ml-2">on {{ testimonial.date }}</span>
            <p class="text-caption text-grey-darken-2 mt-1">{{ testimonial.text }}</p>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
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
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    default: '',
  },
  testimonial: {
    type: Object,
    default: () => ({ name: '', date: '', imageUrl: '', text: '' }),
  },
});

defineEmits(['view-profile', 'select-provider']);

const showMore = ref(false);
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>
