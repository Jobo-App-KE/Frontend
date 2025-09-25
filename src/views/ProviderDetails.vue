<template>
  <v-container class="pa-4">
    <!-- Back button -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn icon flat @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Loading state -->
    <v-row v-if="appStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="text-body-1 mt-2">Loading provider details...</p>
      </v-col>
    </v-row>

    <!-- Error state -->
    <v-row v-else-if="appStore.error">
      <v-col cols="12" class="text-center">
        <v-alert type="error" prominent>{{ appStore.error }}</v-alert>
      </v-col>
    </v-row>

    <!-- Provider details content -->
    <v-row v-else-if="provider">
      <v-col cols="12">
        <!-- Provider Header Section -->
        <div class="text-center mb-6">
          <v-avatar size="120" class="mb-4">
            <v-img :src="provider.imageUrl" alt="Provider Avatar"></v-img>
          </v-avatar>
          <div class="d-flex justify-center align-center mb-1">
            <h1 class="text-h5 font-weight-bold mr-2 text-text">{{ provider.name }}</h1>
            <v-chip color="success" size="small" label>
              <v-icon start icon="mdi-check-circle"></v-icon>
              Verified
            </v-chip>
          </div>
          <div class="text-subtitle-1 text-secondary">{{ provider.profession }}</div>
          <v-rating :model-value="provider.rating" color="amber" density="compact" half-increments readonly size="small"
            class="my-2"></v-rating>
          <span class="text-caption text-secondary ml-1">({{ provider.reviews }} reviews)</span>

          <div class="d-flex align-center justify-center mt-2">
            <v-icon size="small" color="grey-darken-1">mdi-map-marker</v-icon>
            <span class="text-body-2 ml-1 text-text">{{ provider.location }}</span>
          </div>
          <div class="d-flex align-center justify-center mt-1">
            <v-icon size="small" color="success">mdi-currency-usd</v-icon>
            <span class="text-body-2 ml-1 text-text">{{ provider.rate }}</span>
          </div>
          <div class="d-flex align-center justify-center mt-1">
            <v-icon size="small" color="grey-darken-1">mdi-briefcase</v-icon>
            <span class="text-body-2 ml-1 text-text">{{ provider.experience }} years Experience</span>
          </div>
          <div class="d-flex align-center justify-center mt-1">
            <v-icon size="small" color="grey-darken-1">mdi-clock-outline</v-icon>
            <span class="text-body-2 ml-1 text-text">Working Hours: {{ provider.workingHours }}</span>
          </div>
        </div>

        <!-- Tabs for Overview, Reviews, Contact -->
        <v-tabs v-model="tab" align-tabs="center" color="success" class="mb-6">
          <v-tab value="overview">Overview</v-tab>
          <v-tab value="reviews">Reviews</v-tab>
          <v-tab value="contact">Contact</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="overview">
            <v-card flat class="pa-4 mb-6 rounded-lg">
              <h2 class="text-h6 font-weight-bold mb-3 text-text">About</h2>
              <p class="text-body-2 text-secondary">{{ provider.about }}</p>
            </v-card>

            <v-card flat class="pa-4 mb-6 rounded-lg">
              <h2 class="text-h6 font-weight-bold mb-3 text-text">Services Offered</h2>
              <v-list density="compact">
                <v-list-item v-for="(service, i) in provider.servicesOffered" :key="i" class="py-0">
                  <template v-slot:prepend>
                    <v-icon size="small" color="success">mdi-check</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2 text-text">{{ service }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>

            <!-- Book Service Section -->
            <v-card flat class="pa-4 mb-6 rounded-lg">
              <h2 class="text-h6 font-weight-bold mb-4 text-text">Book {{ provider.name }}</h2>
              <p class="text-body-2 text-secondary mb-4">Schedule a {{ provider.profession }} service</p>

              <v-card flat class="pa-3 mb-4 rounded-lg bg-grey-lighten-4">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="info" class="mr-2">mdi-information</v-icon>
                  <span class="text-subtitle-2 text-text">Service Rate</span>
                </div>
                <p class="text-body-2 text-secondary">This provider charges {{ provider.rate }} per hour</p>
              </v-card>

              <v-form ref="bookingForm" @submit.prevent="bookService">
                <v-text-field v-model="booking.date" label="Date" type="date" variant="outlined" density="compact"
                  class="mb-2 rounded-lg" :rules="[rules.required]"></v-text-field>
                <p class="text-caption text-secondary mb-4">Choose a date for the service</p>

                <v-text-field v-model="booking.time" label="Time" type="time" variant="outlined" density="compact"
                  class="mb-2 rounded-lg" :rules="[rules.required]"></v-text-field>
                <p class="text-caption text-secondary mb-4">Provider is available from {{ provider.workingHours }}</p>

                <h3 class="text-subtitle-1 font-weight-bold mb-2 text-text">Service Details</h3>
                <v-textarea v-model="booking.details" label="Describe what you need help with..." variant="outlined"
                  rows="4" class="mb-2 rounded-lg" :rules="[rules.required, rules.minDetails]"></v-textarea>
                <p class="text-caption text-secondary mb-4">Provide as much detail as possible about the service you
                  need</p>

                <v-btn color="success" block class="rounded-lg py-3" type="submit" :loading="bookingLoading">
                  Book Service
                </v-btn>
              </v-form>
            </v-card>
          </v-window-item>

          <v-window-item value="reviews">
            <v-card flat class="pa-4 rounded-lg">
              <h2 class="text-h6 font-weight-bold mb-3 text-text">Reviews</h2>
              <p class="text-body-2 text-secondary">No reviews yet. Be the first to review!</p>
              <!-- TODO: Add actual review components here -->
            </v-card>
          </v-window-item>

          <v-window-item value="contact">
            <v-card flat class="pa-4 rounded-lg">
              <h2 class="text-h6 font-weight-bold mb-3 text-text">Contact</h2>
              <p class="text-body-2 text-secondary">Contact details will be available after booking.</p>
              <!-- TODO: Add actual contact form or details here -->
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>

    <!-- Booking Confirmation Dialog -->
    <v-dialog v-model="showBookingDialog" max-width="400">
      <v-card rounded="lg">
        <v-card-title class="text-h5 text-center pt-5">
          <v-icon color="success" size="48" class="mb-2">mdi-check-circle-outline</v-icon>
          <div class="text-success font-weight-bold">Booking Confirmed!</div>
        </v-card-title>
        <v-card-text class="text-center text-body-1 text-text">
          Your service with {{ provider?.name }} has been successfully booked for {{ booking.date }} at {{ booking.time
          }}.
        </v-card-text>
        <v-card-actions class="justify-center pb-5">
          <v-btn color="success" variant="flat" class="rounded-lg px-6" @click="showBookingDialog = false">
            Great!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Booking Error Dialog -->
    <v-dialog v-model="showErrorDialog" max-width="400">
      <v-card rounded="lg">
        <v-card-title class="text-h5 text-center pt-5">
          <v-icon color="error" size="48" class="mb-2">mdi-alert-circle-outline</v-icon>
          <div class="text-error font-weight-bold">Booking Failed!</div>
        </v-card-title>
        <v-card-text class="text-center text-body-1 text-text">
          {{ bookingErrorMessage }}
        </v-card-text>
        <v-card-actions class="justify-center pb-5">
          <v-btn color="error" variant="flat" class="rounded-lg px-6" @click="showErrorDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useAppStore } from '../stores/app';

export default {
  name: 'ProviderDetails',
  data() {
    return {
      tab: 'overview',
      provider: null,
      bookingForm: null,
      showBookingDialog: false,
      showErrorDialog: false,
      bookingErrorMessage: '',
      bookingLoading: false,
      booking: {
        date: '',
        time: '08:00',
        details: '',
      },
      rules: {
        required: value => !!value || 'This field is required.',
        minDetails: value => (value && value.length >= 10) || 'Please provide at least 10 characters for service details.',
      },
    };
  },
  computed: {
    appStore() {
      return useAppStore();
    }
  },
  methods: {
    async bookService() {
      const { valid } = await this.$refs.bookingForm.validate();

      if (valid) {
        this.bookingLoading = true;
        const result = await this.appStore.submitBooking({
          providerId: this.provider.id,
          ...this.booking,
        });
        this.bookingLoading = false;

        if (result.success) {
          this.showBookingDialog = true;
          this.booking.date = '';
          this.booking.time = '08:00';
          this.booking.details = '';
          this.$refs.bookingForm.resetValidation();
        } else {
          this.bookingErrorMessage = result.message || 'An unexpected error occurred during booking.';
          this.showErrorDialog = true;
        }
      } else {
        console.log('Form validation failed.');
      }
    },
    async fetchProviderDetails(id) {
      this.provider = await this.appStore.fetchProviderById(id);
      if (!this.provider) {
        this.appStore.error = `Provider with ID ${id} not found.`;
      }
    },
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        if (newId) {
          this.fetchProviderDetails(newId);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
/* Scoped styles for ProviderDetails.vue if needed */
</style>
