<template>
  <v-container fluid class="pa-0 fill-height d-flex justify-center align-start">
    <v-row no-gutters justify="center" align="start" class="ma-auto" style="max-width: 1400px;">
      <template v-if="!isBookingConfirmed">
        <!-- Filter Navigation Drawer (Mobile) -->
        <v-navigation-drawer v-model="drawer" app temporary class="d-md-none">
          <v-list-item class="py-4 px-4">
            <v-list-item-title class="text-h6 font-weight-bold text-text">Filters</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <div class="pa-4">
            <v-text-field v-model="locationFilter" label="Search Location" variant="outlined" density="compact"
              hide-details class="rounded-xl mb-4" prepend-inner-icon="mdi-map-marker-outline" clearable></v-text-field>
            <v-select v-model="selectedProfession" :items="professionOptions" label="Profession" variant="outlined"
              density="compact" hide-details class="rounded-xl mb-4"></v-select>
          </div>
        </v-navigation-drawer>

        <!-- Left Filter Panel (Desktop) -->
        <v-col cols="12" md="4" lg="3" class="d-none d-md-block bg-grey-lighten-4 pa-4">
          <v-card class="pa-4 rounded-xl">
            <div class="d-flex justify-space-between align-center mb-4">
              <h2 class="text-h6 font-weight-bold">Filters</h2>
              <v-btn variant="text" color="success" class="text-capitalize" @click="resetFilters">Reset</v-btn>
            </div>
            <!-- New Location Search Field -->
            <v-text-field v-model="locationFilter" label="Search Location" variant="outlined" density="compact"
              hide-details class="rounded-xl mb-4" prepend-inner-icon="mdi-map-marker-outline" clearable></v-text-field>

            <v-select v-model="selectedProfession" :items="professionOptions" label="Profession" variant="outlined"
              density="compact" hide-details class="rounded-xl mb-4"></v-select>

            <v-list-item class="px-0 py-2">
              <v-list-item-title class="text-h6 font-weight-bold">Date</v-list-item-title>
            </v-list-item>
            <v-btn-toggle v-model="selectedFilters.date" rounded="xl" mandatory color="success" class="mb-4">
              <v-btn class="text-capitalize rounded-xl" value="today">Today</v-btn>
              <v-btn class="text-capitalize rounded-xl" value="3days">Within 3 Days</v-btn>
              <v-btn class="text-capitalize rounded-xl" value="week">Within a Week</v-btn>
              <v-btn class="text-capitalize rounded-xl" value="choose">Choose Dates</v-btn>
            </v-btn-toggle>

            <v-list-item class="px-0 py-2">
              <v-list-item-title class="text-h6 font-weight-bold">Time of day</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-checkbox v-model="selectedFilters.time" label="Morning (8am - 12pm)" value="morning"
                hide-details></v-checkbox>
              <v-checkbox v-model="selectedFilters.time" label="Afternoon (12pm - 5pm)" value="afternoon"
                hide-details></v-checkbox>
              <v-checkbox v-model="selectedFilters.time" label="Evening (5pm - 9:30pm)" value="evening"
                hide-details></v-checkbox>
            </v-list-item>
            <v-list-item>
              <v-select label="or choose a specific time" density="compact" variant="outlined" hide-details
                class="rounded-xl" v-model="selectedFilters.specificTime"
                :items="['I\'m Flexible', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM']"></v-select>
            </v-list-item>

            <v-divider class="my-4"></v-divider>

            <v-list-item class="px-0 py-2">
              <v-list-item-title class="text-h6 font-weight-bold">Price</v-list-item-title>
            </v-list-item>
            <v-range-slider v-model="selectedFilters.priceRange" :min="10" :max="150" :step="5" color="success"
              thumb-label="always" class="mt-4"></v-range-slider>
            <div class="d-flex justify-space-between text-body-2">
              <span>${{ selectedFilters.priceRange[0] }}</span>
              <span>${{ selectedFilters.priceRange[1] }}+</span>
            </div>
            <div class="text-center text-body-2 mt-2 text-grey-darken-1">The average hourly rate is ${{ averageRate }}
            </div>

            <v-divider class="my-4"></v-divider>

            <v-list-item class="px-0 py-2">
              <v-list-item-title class="text-h6 font-weight-bold">Tasker type</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <v-checkbox v-model="selectedFilters.eliteTasker" label="Elite Tasker" hide-details></v-checkbox>
            </v-list-item>
          </v-card>
        </v-col>

        <!-- Main Content Area for Providers -->
        <v-col cols="12" md="8" lg="9" class="pa-4">
          <v-app-bar flat color="white" class="d-md-none">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h6 font-weight-bold text-text">Providers</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-container class="pa-4">
            <div class="d-flex align-center">
              <h1 class="text-h5 font-weight-bold mb-6 text-text">All Service Providers</h1>
              <v-spacer></v-spacer>
              <v-select label="Sorted by: Recommended" v-model="sortBy" :items="sortOptions" density="compact"
                variant="outlined" hide-details class="rounded-xl" style="max-width: 200px;"></v-select>
            </div>
            <v-row v-if="filteredAndSortedProviders.length > 0" justify="center">
              <v-col v-for="provider in filteredAndSortedProviders" :key="provider.id" cols="12">
                <ServiceProviderCard :id="provider.id" :image-url="provider.imageUrl" :name="provider.name"
                  :profession="provider.profession" :location="provider.location" :rate="provider.rate"
                  :rating="provider.rating" :reviews="provider.reviews" :tasks-completed="provider.tasksCompleted"
                  :about="provider.about" :testimonial="provider.testimonial" style="max-width:1000px;"
                  @view-profile="openDialog(provider)" @select-provider="openBookingDialog(provider)" />
              </v-col>
            </v-row>
            <v-row v-else justify="center">
              <v-col cols="12" class="text-center text-body-1 text-secondary">
                No providers found matching your criteria.
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <!-- Dialog component for provider profile -->
        <v-dialog v-model="dialog" max-width="800">
          <v-card class="rounded-xl">
            <v-card-title class="d-flex justify-space-between align-center">
              <h2 class="text-h5 font-weight-bold">{{ selectedProvider.name }}'s Profile</h2>
              <v-btn icon @click="dialog = false" variant="text">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-img :src="selectedProvider.imageUrl" class="rounded-xl mb-4"></v-img>
                  <h3 class="text-h6 font-weight-bold">{{ selectedProvider.name }}</h3>
                  <div class="d-flex align-center mt-2">
                    <v-icon color="yellow-darken-2" icon="mdi-star" size="small"></v-icon>
                    <span class="font-weight-bold ml-1">{{ selectedProvider.rating }} ({{ selectedProvider.reviews }}
                      reviews)</span>
                  </div>
                  <div class="d-flex align-center mt-1">
                    <v-icon size="small" color="grey-darken-1">mdi-map-marker</v-icon>
                    <span class="text-caption ml-1">{{ selectedProvider.location }}</span>
                  </div>
                  <div class="d-flex align-center mt-1">
                    <v-icon size="small" color="success">mdi-currency-usd</v-icon>
                    <span class="text-caption ml-1">{{ selectedProvider.rate }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <h4 class="text-h6 font-weight-bold">About Me</h4>
                  <p class="text-body-2 mb-4">{{ selectedProvider.about }}</p>

                  <h4 class="text-h6 font-weight-bold">Reviews</h4>
                  <v-list dense>
                    <v-list-item v-for="(review, index) in selectedProvider.allReviews" :key="index">
                      <v-list-item-title class="font-weight-bold">{{ review.name }}</v-list-item-title>
                      <v-list-item-subtitle class="text-caption text-grey-darken-1">{{ review.date
                        }}</v-list-item-subtitle>
                      <p class="text-body-2 mt-1">{{ review.text }}</p>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Dialog component for booking a task -->
        <v-dialog v-model="bookingDialog" max-width="500">
          <v-card class="rounded-xl pa-4">
            <v-card-title class="text-center font-weight-bold">
              <div class="d-flex justify-end">
                <v-btn icon @click="bookingDialog = false" variant="text">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              Choose your task date and start time
            </v-card-title>
            <v-card-text class="d-flex flex-column align-center">
              <div class="d-flex align-center justify-center">
                <v-avatar size="64" class="mr-4">
                  <v-img :src="selectedProviderForBooking.imageUrl"></v-img>
                </v-avatar>
                <div>
                  <span class="text-h6 font-weight-bold">{{ selectedProviderForBooking.name }}'s Availability</span>
                </div>
              </div>
              <v-date-picker v-model="selectedDate" color="success" class="mt-4"></v-date-picker>
              <v-row>
                <v-col cols="12" class="text-center text-caption text-grey-darken-1 mt-2">
                  Select a date to see available times.
                  <v-select label="Select a time" :items="timeOptions" v-model="selectedTime" density="compact"
                    variant="outlined" class="rounded-xl mt-4"></v-select>
                </v-col>
                <div class="mt-4 d-flex align-center">
                  <span class="text-h6 font-weight-bold mr-2">Request for:</span>
                  <span class="font-weight-bold">
                    {{ selectedDate ? new Date(selectedDate).toDateString() : 'Select a date' }}
                  </span>
                  <span>{{ selectedTime || 'Select a time' }}</span>
                </div>
              </v-row>


              <v-btn block color="success" size="large" class="mt-4 rounded-xl text-capitalize"
                @click="startBookingFlow">
                Select & Continue
              </v-btn>
              <div class="mt-4 text-center text-caption text-grey-darken-1">
                Next, confirm your details to get connected with your Tasker.
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
      <template v-else>
        <FinalBooking :booking-details="bookingDetails" @edit-booking="editBooking" />
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ServiceProviderCard from '../components/ServiceProviderCard.vue';
import { useAppStore } from '../stores/app';
import FinalBooking from './finalBooking.vue';

const appStore = useAppStore();
const locationFilter = ref('');
const selectedProfession = ref('All Professions');
const sortBy = ref('Recommended');
const sortOptions = ['Recommended', 'Price (Lowest to Highest)', 'Price (Highest to Lowest)', 'Positive Reviews', '# Of Completed Tasks'];
const dialog = ref(false);
const bookingDialog = ref(false);
const selectedProviderForBooking = ref({});
const selectedDate = ref(null);
const selectedTime = ref('7:00 PM');
const isBookingConfirmed = ref(false);
const bookingDetails = ref(null);
// Generate time options for the select dropdown
const timeOptions = Array.from({ length: 17 }, (_, i) => {
  const hour = 6 + i;
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
});

const selectedProvider = ref({});
// Filter states
const selectedFilters = ref({
  date: 'today',
  time: [],
  specificTime: null,
  priceRange: [10, 150],
  eliteTasker: false,
});

const openDialog = (provider) => {
  selectedProvider.value = provider;
  dialog.value = true;
};

const openBookingDialog = (provider) => {
  selectedProviderForBooking.value = provider;
  bookingDialog.value = true;
};

const startBookingFlow = () => {
  bookingDetails.value = {
    provider: selectedProviderForBooking.value,
    date: selectedDate.value,
    time: selectedTime.value,
    task: "I need to assemble my sofa",
    location: "Lydam 402, Manchester, Connecticut"
  };
  bookingDialog.value = false;
  isBookingConfirmed.value = true;
};

const editBooking = () => {
  isBookingConfirmed.value = false;
};

const professionOptions = computed(() => {
  const professions = new Set(appStore.featuredProviders.map(p => p.profession));
  professions.add('All Professions');
  return Array.from(professions);
});

const averageRate = computed(() => {
  if (appStore.featuredProviders.length === 0) return 0;
  const total = appStore.featuredProviders.reduce((sum, provider) => {
    const rateString = provider.rate;
    const rateNumber = parseFloat(rateString.replace(/[^0-9.]/g, ''));
    return sum + (rateNumber || 0);
  }, 0);
  return (total / appStore.featuredProviders.length).toFixed(2);
});

// Computed property for filtered and sorted providers
const filteredAndSortedProviders = computed(() => {
  let filtered = appStore.featuredProviders.filter(provider => {
    // Location filter (case-insensitive)
    const searchLower = locationFilter.value.toLowerCase();
    const matchesLocation = !searchLower || provider.location.toLowerCase().includes(searchLower);

    // Profession filter
    const matchesProfession = selectedProfession.value === 'All Professions' ||
      provider.profession === selectedProfession.value;

    // Return only if both location and profession filters are matched
    return matchesLocation && matchesProfession;
  });

  // Sorting logic
  switch (sortBy.value) {
    case 'Price (Lowest to Highest)':
      filtered.sort((a, b) => {
        const rateA = parseFloat(a.rate.replace(/[^0-9.]/g, ''));
        const rateB = parseFloat(b.rate.replace(/[^0-9.]/g, ''));
        return rateA - rateB;
      });
      break;
    case 'Price (Highest to Lowest)':
      filtered.sort((a, b) => {
        const rateA = parseFloat(a.rate.replace(/[^0-9.]/g, ''));
        const rateB = parseFloat(b.rate.replace(/[^0-9.]/g, ''));
        return rateB - rateA;
      });
      break;
    case 'Positive Reviews':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case '# Of Completed Tasks':
      filtered.sort((a, b) => b.reviews - a.reviews);
      break;
    default: // Recommended
      break;
  }

  return filtered;
});

// Fetch providers on component mount
onMounted(async () => {
  await appStore.fetchFeaturedProviders();
});
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.v-btn-toggle>.v-btn.v-btn--active {
  background-color: #2e7d32 !important;
  color: white !important;
}
</style>
