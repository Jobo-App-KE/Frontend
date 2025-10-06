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

            <v-card class="p-6 rounded-2xl border border-gray-100">
              <!-- 1. Primary Profession Selection -->
              <v-select v-model="selectedProfession" :items="professionOptions" label="Select Profession"
                variant="outlined" density="compact" hide-details class="mb-4"
                prepend-inner-icon="mdi-account-tie-outline"></v-select>

              <!-- 2. Conditional Subcategory Selection -->
              <v-slide-y-transition>
                <v-select v-if="selectedProfession && subcategoryOptions[selectedProfession]"
                  v-model="selectedSubcategory" :items="subcategoryOptions[selectedProfession]"
                  label="Select Subcategory" variant="outlined" density="compact" hide-details class="mt-4"
                  prepend-inner-icon="mdi-briefcase-outline" clearable
                  @update:model-value="handleSubcategoryChange"></v-select>
              </v-slide-y-transition>
            </v-card>

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
                  :profession="provider.category_name" :location="provider.location" :rate="provider.service_rate"
                  :rating="provider.rating" :reviews="provider.reviews" :tasks-completed="provider.tasksCompleted"
                  :about="provider.description" :testimonial="provider.testimonial" style="max-width:1000px;"
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
                    <span class="text-caption ml-1">{{ selectedProvider.service_rate }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <h4 class="text-h6 font-weight-bold">About Me</h4>
                  <p class="text-body-2 mb-4">{{ selectedProvider.description }}</p>

                  <h4 class="text-h6 font-weight-bold">Reviews</h4>
                  <v-list dense>
                    <v-list-item v-for="(review, index) in selectedProvider.providerReviews" :key="index">
                      <v-list-item-title class="font-weight-bold">{{ review.rev_name }}</v-list-item-title>
                      <!-- <v-list-item-subtitle class="text-caption text-grey-darken-1">{{ review.rec
                        }}</v-list-item-subtitle> -->
                      <p class="text-body-2 mt-1">{{ review.cont }}</p>
                    </v-list-item>
                  </v-list>
                  <h4 class="text-h6 font-weight-bold mb-4">Leave a Review</h4>

                  <v-alert v-if="reviewSubmittedSuccess" type="success" variant="tonal" class="mb-4">
                    Thank you! Your review has been submitted successfully and is awaiting approval.
                  </v-alert>

                  <div v-else class="pa-4 border rounded-lg bg-grey-lighten-4">
                    <div class="d-flex align-center mb-4">
                      <span class="font-weight-medium mr-3">Your Rating:</span>
                      <v-rating v-model="newReviewRating" hover color="yellow-darken-2" density="compact"></v-rating>
                      <span class="ml-3 text-body-2 text-grey-darken-1">({{ newReviewRating }} / 5)</span>
                    </div>

                    <v-textarea v-model="newReviewText" label="Share your experience (Max 300 characters)" variant="outlined" rows="3"
                      maxlength="300" counter hint="Tell us about the quality of service, punctuality, and professionalism."
                      persistent-hint></v-textarea>

                    <v-btn color="success" class="mt-4 rounded-lg" :disabled="!newReviewRating || !newReviewText" @click="submitReview" block>
                      Submit Review
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Dialog component for booking a task -->
        <v-dialog v-model="bookingDialog" max-width="700">
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
              <v-container class="pa-0">
                <v-card class="mx-auto rounded-xl " >
                  <v-card-title class="text-h5 font-weight-bold text-indigo-darken-2 mb-4">
                    <v-icon icon="mdi-calendar-clock-outline" class="mr-3"></v-icon>
                    Book Your Appointment
                  </v-card-title>
                  <v-card-text>
                    <!-- UPDATED: Text to reflect that all dates are selectable, but only available ones are highlighted. -->
                    <p class="mb-4 text-gray-600">Dates with <span class="font-bold text-indigo-600">available slots</span> are shown in bold blue. You can select any date, but slots will only appear for available dates.</p>

                    <!-- 1. Date Picker Component -->
                    <v-date-picker v-model="selectedDate" v-model:picker-date="pickerDate" color="indigo-darken-2"
                      header="Choose Date" title="Date Picker" elevation="5" class="rounded-lg w-full"
                      :allowed-dates="isDateAllowed" :day-color="dateColor"></v-date-picker>

                    <v-divider class="my-6"></v-divider>

                    <!-- 2. Time Slot Selection (Conditionally rendered) -->
                    <v-slide-y-transition>
                      <div v-if="selectedDate"
                        class="p-4 bg-indigo-50 rounded-xl shadow-inner border border-indigo-200">
                        <h3 class="text-lg font-bold text-indigo-900 mb-4 text-center">
                          <v-icon icon="mdi-clock-time-three-outline" class="mr-2"></v-icon>
                          Available Times on {{ displayDateOnly }}
                        </h3>
                        <!-- UPDATED: Replaced gap-2 justify-center with gap-x-4 gap-y-3 justify-around for even spacing -->
                         <div v-if="dynamicAvailableTimes.length > 0" class="flex flex-wrap gap-x-4 gap-y-3 justify-around">
                          <v-chip v-for="time in dynamicAvailableTimes" :key="time" @click="selectTime(time)"
                            :color="time === selectedTime ? 'indigo-darken-2' : 'indigo'"
                            :variant="time === selectedTime ? 'flat' : 'tonal'"
                            size="large" label rounded="pill"
                            class="cursor-pointer transition hover:shadow-md hover:scale-[1.02] font-semibold">
                            {{ time }}
                          </v-chip>
                        </div>
                        <v-alert v-else type="info" variant="tonal" class="text-center" density="compact">
                          No slots available for this date.
                        </v-alert>
                      </div>
                    </v-slide-y-transition>

                    <v-divider class="my-6"></v-divider>

                    <!-- 3. Final Display -->
                    <v-text-field :model-value="displayDateTime" label="Selected Date & Time" readonly
                      variant="solo-filled" density="comfortable"
                      :append-inner-icon="selectedTime ? 'mdi-calendar-check' : 'mdi-alert-circle-outline'"
                      :color="selectedTime ? 'green' : 'grey'" class="mt-4 rounded-lg"></v-text-field>

                  </v-card-text>
                </v-card>
              </v-container>


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

<script>
import ServiceProviderCard from '../components/ServiceProviderCard.vue';
import { useAppStore } from '../stores/app';
import { useServiceStore } from '@/stores/services';
import FinalBooking from './finalBooking.vue';

// const appStore = useAppStore();
// const serviceStore = useServiceStore();

export default {
  name: 'ProvidersPage',
  components: {
    ServiceProviderCard,
    FinalBooking,
  },
  data() {
    return {
      drawer: false,
      locationFilter: '',
      sortBy: 'Recommended',
      sortOptions: ['Recommended', 'Price (Lowest to Highest)', 'Price (Highest to Lowest)', 'Positive Reviews', '# Of Completed Tasks'],
      dialog: false,
      bookingDialog: false,
      selectedProviderForBooking: {},
      selectedDate: null,
      selectedTime: '7:00 PM',
      pickerDate: null,
      //timeData: [],
      isBookingConfirmed: false,
      bookingDetails: null,
      selectedProvider: {},
      selectedFilters: {
        date: 'today',
        time: [],
        specificTime: null,
        priceRange: [10, 150],
        eliteTasker: false,
      },
      selectedProfession: null,
      selectedSubcategory: null,
      searchQuery: '',
      newReviewRating: 0,
      newReviewText: '',
      reviewSubmittedSuccess: false,
    };
  },
  watch: {
    async selectedProfession(newVal, oldVal) {
      console.log(newVal, oldVal);
      await this.serviceStore.fetchCategorySubCategoriesBySearch(newVal, "");
      // Check if the profession actually changed
      if (newVal !== oldVal) {
        // Reset the subcategory selection using 'this.'
        this.selectedSubcategory = null;
      }
    },
    selectedSubcategory(newVal) {
      if (newVal === null) {
        // Optional: can trigger filtering here if needed
      }
    },
    selectedDate(newValue, oldValue) {
      // Only reset time if the normalized date string has changed
      if (this.normalizeDate(newValue) !== this.normalizeDate(oldValue)) {
        this.selectedTime = null;
      }
    },
    dialog(newVal) {
      if (!newVal) {
        // Reset review state when the dialog closes
        this.newReviewRating = 0;
        this.newReviewText = '';
        this.reviewSubmittedSuccess = false;
      }
    }
  },
  computed: {
    appStore() {
      return useAppStore();
    },
    serviceStore() {
      return useServiceStore();
    },
    timeOptions() {
      return Array.from({ length: 17 }, (_, i) => {
        const hour = 6 + i;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour}:00 ${period}`;
      });
    },

    professionOptions()  {
      console.log(this.serviceStore.providers);
      const professions = new Set(this.serviceStore.categories.map(p => ({
        title: p.name,
        value: p.code
      })));
      professions.add({ title: 'All Professions', value: 'all' });
      return Array.from(professions);
    },
    subcategoryOptions() {
      const grouped = {};

      this.serviceStore.subCategories.forEach(sub => {
        // Use the parent category code as the key, ensuring it's a string
        // to match the key access in the template (subcategoryOptions[selectedProfession])
        const parentCode = sub.cat_code.toString();

        if (!grouped[parentCode]) {
          grouped[parentCode] = [];
        }

        // Push the subcategory in the {title, value} format
        grouped[parentCode].push({
          title: sub.name,
          value: sub.code
        });
      });

      return grouped;
    },

    selectedCategoryName() {
      if (this.selectedProfession === 'all' || !this.selectedProfession) return null;
      // Find the category object using the selected code
      const cat = this.serviceStore.categories.find(c => c.code == this.selectedProfession);
      return cat ? cat.name : null;
    },

    selectedSubcategoryName() {
      if (!this.selectedSubcategory || !this.selectedProfession) return null;
      // Find the subcategory object using its code (value)
      const sub = this.serviceStore.subCategories.find(s => s.code == this.selectedSubcategory);
      return sub ? sub.name : null;
    },

    filteredAndSortedProviders() {
      // Start with all simulated providers
      let filtered = this.serviceStore.providers.filter(provider => {
        // Location Filter
        const searchLower = this.locationFilter.toLowerCase();
        const matchesLocation = !searchLower || provider.location.toLowerCase().includes(searchLower);

        // Profession/Subcategory Filter Logic (Fixed)
        let matchesProfession = false;

        if (this.selectedProfession === 'all' || !this.selectedProfession) {
          // Case 1: No profession filter selected
          matchesProfession = true;
        } else if (this.selectedSubcategoryName) {
          // Case 2: Subcategory is selected (highest priority filter)
          // Filter by the provider's subcategory name (string to string comparison)
          matchesProfession = provider.sub_category_name === this.selectedSubcategoryName;
        } else if (this.selectedCategoryName) {
          // Case 3: Only main profession is selected
          // Filter by the provider's main category name (string to string comparison)
          matchesProfession = provider.category_name === this.selectedCategoryName;
        }

        // Apply other filters if they were implemented (e.g., price range, etc.)
        // For this example, we only check location and profession/subcategory
        return matchesLocation && matchesProfession;
      });

      // Simplified/Simulated sorting logic (using providers 'rate' for this example)
      switch (this.sortBy) {
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
        default:
          break;
      }

      return filtered;
    },

    averageRate() {
      if (this.serviceStore.featuredProviders.length === 0) return 0;
      const total = this.serviceStore.featuredProviders.reduce((sum, provider) => {
        const rateString = provider.rate;
        const rateNumber = parseFloat(rateString.replace(/[^0-9.]/g, ''));
        return sum + (rateNumber || 0);
      }, 0);
      return (total / this.serviceStore.featuredProviders.length).toFixed(2);
    },

    availableDateStrings() {

      const dates = this.serviceStore.timeData.map(block => this.normalizeDate(block.date));
      // Use a Set to ensure uniqueness and filter out any null/undefined entries
      const uniqueDates = [...new Set(dates)].filter(Boolean);

      // --- DEBUG LOG: Available Dates ---
      console.log("--- DEBUG: Available Dates ---");
      console.log("timeData:", this.timeData);
      console.log("Normalized Available Date Strings:", uniqueDates);
      console.log("-------------------------------");
      // --- DEBUG LOG END ---

      return uniqueDates;
    },

    // Function to change the color of the day numbers based on availability
    dateColor() {
      // Returns a function that the v-date-picker internally calls for each day
      return (dateString) => {
        // Since isDateAllowed now returns true for all dates, all dates will be styled
        // as 'indigo-darken-2' (bold blue).
        return this.availableDateStrings.includes(dateString) ? 'indigo-darken-2' : undefined;
      }
    },

    // Dynamically generates time slots based on the selected date and timeData
    dynamicAvailableTimes() {
      const normalizedSelectedDate = this.normalizeDate(this.selectedDate);
      if (!normalizedSelectedDate) return [];

      const allSlots = [];

      // 1. Filter timeData to find blocks matching the selected date
      const relevantBlocks = this.serviceStore.timeData.filter(block =>
        this.normalizeDate(block.date) === normalizedSelectedDate
      );

      if (relevantBlocks.length === 0) {
        return [];
      }

      // 2. Generate discrete slots for each relevant block
      relevantBlocks.forEach(block => {
        const slots = this.generateSlots(block.str_time, block.end_time, 30); // 30-minute interval
        allSlots.push(...slots);
      });

      // Remove duplicates and return
      return [...new Set(allSlots)];
    },

    // Computed property for displaying ONLY the date (used in the time slot header)
    displayDateOnly() {
      return this.formatDateLong(this.selectedDate) || 'No date selected';
    },

    // Computed property for displaying the final formatted Date and Time
    displayDateTime() {
      const datePart = this.formatDateLong(this.selectedDate);
      const timePart = this.selectedTime;

      if (!datePart && !timePart) {
        return 'Select a Date and Time';
      }

      if (datePart && timePart) {
        return `${datePart} at ${timePart}`;
      } else if (datePart) {
        return `${datePart} (Time not selected)`;
      }

      return '';
    }
  },
  mounted() {
    this.fetchProviders();
    this.fetchCategories();
  },
  methods: {

    async openDialog(provider) {
      this.selectedProvider = provider;
      const reviews = await this.serviceStore.fetchProviderReviews({ providerCode: provider.code});
      this.selectedProvider.reviews = reviews.reviews.length;
      this.selectedProvider.providerReviews = reviews.reviews;

      this.dialog = true;
    },
    async openBookingDialog(provider) {
      this.selectedProviderForBooking = provider;
      await this.serviceStore.postProviderSchedule(this.selectedProviderForBooking.code, "");
      this.initializeSelectedDate();
      this.bookingDialog = true;
    },
    startBookingFlow() {
      this.bookingDetails = {
        provider: this.selectedProviderForBooking,
        date: this.selectedDate,
        time: this.selectedTime,
        task: "I need to assemble my sofa",
        location: "Lydam 402, Manchester, Connecticut"
      };
      this.bookingDialog = false;
      this.isBookingConfirmed = true;
    },
    editBooking() {
      this.isBookingConfirmed = false;
    },
    resetFilters() {
      this.locationFilter = '';
      this.selectedProfession = 'All Professions';
      this.selectedFilters.date = 'today';
      this.selectedFilters.time = [];
      this.selectedFilters.specificTime = null;
      this.selectedFilters.priceRange = [10, 150];
      this.selectedFilters.eliteTasker = false;
    },
    async fetchProviders() {
      const prov = await this.serviceStore.fetchProvidersBySearch('');
      console.log('Fetched providers:', prov);
    },
    async fetchCategories() {
      const categories = await this.serviceStore.fetchCategoriesBySearch('');
      console.log('Fetched categories:', categories);
    },
    normalizeDate (value){
        if (!value) return null;
        let dateObj;

        if (value instanceof Date) {
            // Use ISO string to get YYYY-MM-DD format, compensating for timezone to get local date
            dateObj = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
            return dateObj.toISOString().substring(0, 10);
        }
        // If it's already a string like 'YYYY-MM-DD' or 'YYYY-MM-DDT...', extract YYYY-MM-DD
        return String(value).substring(0, 10);
    },
    formatDateLong (value){
        const normalized = this.normalizeDate(value);
        if (!normalized) return null;

        // Re-create a date object from the normalized string to ensure correct locale formatting
        const parts = normalized.split('-').map(Number);
        const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        if (dateObj && !isNaN(dateObj)) {
            return dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return null;
    },
    generateSlots (startTimeStr, endTimeStr, intervalMinutes = 30) {
        const slots = [];
        // Use an arbitrary, fixed date for reliable time calculations
        const baseDate = '2000-01-01';

        // Combine base date with time strings to create valid Date objects for calculation
        const startDateTime = new Date(`${baseDate}T${startTimeStr}`);
        const endDateTime = new Date(`${baseDate}T${endTimeStr}`);

        if (isNaN(startDateTime) || isNaN(endDateTime) || startDateTime >= endDateTime) {
            console.error("Invalid time data for slot generation.");
            return [];
        }

        let currentTime = new Date(startDateTime);

        while (currentTime.getTime() < endDateTime.getTime()) {
            // Format the time for display (e.g., 1:30 PM)
            const displayTime = currentTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            slots.push(displayTime);

            // Advance time by the interval
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }
        return slots;
    },
    initializeSelectedDate() {
      const availableDates = this.availableDateStrings;
      const todayNormalized = this.normalizeDate(new Date());
      let dateToSelect = null;

      if (availableDates.length === 0) {
        dateToSelect = null;
      } else if (availableDates.includes(todayNormalized)) {
        dateToSelect = new Date();
      } else if (availableDates.length > 0) {
        // Default to the first available date
        const firstAvailableDateStr = availableDates[0];
        const [year, month, day] = firstAvailableDateStr.split('-').map(Number);
        // Use UTC date logic to prevent timezone offset from shifting the date back a day
        dateToSelect = new Date(Date.UTC(year, month - 1, day));
      }

      this.selectedDate = dateToSelect;

      // Set the pickerDate (visible month) to the month of the first selected date
      if (dateToSelect) {
        this.pickerDate = this.normalizeDate(dateToSelect).substring(0, 7); // YYYY-MM
      }

      // --- DEBUG LOG: Initial Selected Date ---
      console.log("--- DEBUG: Initial Selected Date ---");
      console.log("Selected date after initialization:", this.normalizeDate(this.selectedDate));
      console.log("Picker date set to:", this.pickerDate);
      console.log("-------------------------------");
      // --- DEBUG LOG END ---
    },
    selectTime(time) {
      this.selectedTime = time;
    },
    isDateAllowed(dateString) {
      // Return true to allow selection of ALL dates on the calendar.
      return true;
    },
    async submitReview() {
      console.log(`Submitting review for ${this.selectedProvider.name}:`);
      console.log(`Rating: ${this.newReviewRating}`);
      console.log(`Comment: ${this.newReviewText}`);

      const result = await this.serviceStore.addReview({
        providerCode: this.selectedProvider.code,
        rating: this.newReviewRating,
        comment: this.newReviewText,
      });

      if (!result.success) {
        console.error('Error submitting review:', result.message);
        return;
      } else {
        console.log('Review submitted successfully.');
      }

      this.reviewSubmittedSuccess = true;
    }
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.v-btn-toggle.v-btn.v-btn--active {
  background-color: #2e7d32 !important;
  color: white !important;
}
</style>
