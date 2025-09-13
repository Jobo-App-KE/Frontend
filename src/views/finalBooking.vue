<template>
  <v-container class="mt-8">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6" class="pa-4">
        <v-card class="pa-6 rounded-xl">
          <v-card-title class="text-h5 font-weight-bold">
            Confirm details
          </v-card-title>
          <p class="text-body-2 mb-4 text-grey-darken-1">
            You're almost done! We just need a few more details to connect you with your Tasker.
          </p>
          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold">Payment method</h3>
            <p class="text-body-2 text-grey-darken-1">
              You may see a temporary hold on your payment method in the amount of your Tasker's hourly rate. Don't
              worry - you're only billed when your task is complete!
            </p>
          </div>
          <v-card class="pa-4 rounded-lg border-success border-sm">
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-cellphone-link" color="success" class="mr-2"></v-icon>
              <span class="font-weight-bold">M-Pesa</span>
            </div>
            <v-text-field label="M-Pesa Number" variant="outlined" density="compact" hide-details
              class="rounded-xl"></v-text-field>
            <p class="text-caption text-grey-darken-1 mt-2">
              You will receive a prompt on your phone to enter your M-Pesa PIN to complete the payment.
            </p>
          </v-card>
          <v-checkbox v-model="agreeTerms" class="mt-4" hide-details>
            <template v-slot:label>
              <div class="text-caption">
                By providing your payment information, you allow Taskrabbit, Inc. to charge your account for future
                payments in accordance with their terms.
              </div>
            </template>
          </v-checkbox>
          <v-btn block color="success" size="large" class="mt-4 rounded-xl text-capitalize">
            Confirm and chat
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pa-4">
        <v-card class="pa-6 rounded-xl">
          <v-card-title class="text-h5 font-weight-bold">
            Furniture Assembly
          </v-card-title>
          <v-divider class="my-4"></v-divider>
          <div class="d-flex align-center mb-4">
            <v-avatar size="64" class="mr-4">
              <v-img :src="bookingDetails.provider.imageUrl"></v-img>
            </v-avatar>
            <span class="text-h6 font-weight-bold">{{ bookingDetails.provider.name }}</span>
          </div>
          <div class="text-body-2 d-flex align-center">
            <v-icon icon="mdi-calendar" class="mr-2"></v-icon>
            <span>{{ new Date(bookingDetails.date).toDateString() }} at {{ bookingDetails.time }}</span>
          </div>
          <div class="text-body-2 d-flex align-center mt-2">
            <v-icon icon="mdi-map-marker" class="mr-2"></v-icon>
            <span>{{ bookingDetails.location }}</span>
          </div>
          <div class="text-body-2 d-flex align-center mt-2">
            <v-icon icon="mdi-tools" class="mr-2"></v-icon>
            <span>Medium - Est. 2-3 hrs</span>
          </div>
          <v-btn variant="text" color="success" class="text-capitalize mt-4" @click="$emit('edit-booking')">
            Edit Task
          </v-btn>
          <v-divider class="my-4"></v-divider>
          <h4 class="text-h6 font-weight-bold">Your task details</h4>
          <p class="text-body-2 text-grey-darken-1">{{ bookingDetails.task }}</p>
          <v-divider class="my-4"></v-divider>
          <h4 class="text-h6 font-weight-bold">Price Details</h4>
          <div class="d-flex justify-space-between text-body-2 mt-2">
            <span class="text-grey-darken-1">Hourly Rate</span>
            <span class="font-weight-bold">{{ bookingDetails.provider.rate }}</span>
          </div>
          <div class="d-flex justify-space-between text-body-2">
            <span class="text-grey-darken-1">Trust and Support Fee</span>
            <span class="font-weight-bold">{{ 'KSh 11.40/hr' }}</span>
          </div>
          <div class="d-flex justify-space-between text-h6 mt-2">
            <span>Total Rate</span>
            <span class="font-weight-bold">{{ 'KSh ' + (parseFloat(bookingDetails.provider.rate.replace(/[^0-9.]/g, ''))
              +
              11.40).toFixed(2) + '/hr' }}</span>
          </div>
          <p class="text-caption mt-2 text-grey-darken-1">
            You may see a temporary hold on your payment method in the amount of your Tasker's hourly rate of
            <span class="font-weight-bold">{{ bookingDetails.provider.rate }}</span> plus a Taskrabbit service fee.
            Tasks cancelled less than 24 hours before the start time may be billed a <span
              class="text-success">cancellation
              fee</span> of one hour. Tasks have a one-hour minimum.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  bookingDetails: Object
});

const emits = defineEmits(['edit-booking']);

const agreeTerms = ref(false);

</script>
