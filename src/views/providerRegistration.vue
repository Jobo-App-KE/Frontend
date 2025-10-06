<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-card class="pa-4 mx-auto my-12" max-width="900" rounded="xl">
          <div class="d-flex align-center justify-center">
            <v-img
              src="https://assets-global.website-files.com/5f7203b5f3a7465691f4b825/5fa45330e255375d81b498b3_taskrabbit-logo.svg"
              max-height="40" class="mr-4"></v-img>
            <h1 class="text-h4 font-weight-bold">Provider Registration</h1>
          </div>
          <v-divider class="my-4"></v-divider>

          <v-stepper v-model="step" flat rounded="xl" class="transparent-bg">
            <v-stepper-header>
              <v-stepper-item :value="1" title="Profile Details" editable></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item :value="2" title="Services & Schedule"></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item :value="3" title="Payments & Verification"></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item :value="4" title="Confirm Details"></v-stepper-item>
            </v-stepper-header>

            <v-stepper-window>
              <v-stepper-window-item :value="1">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Update Profile</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" class="d-flex justify-center flex-column align-center">
                        <v-avatar
                        color="grey-darken-3"
                        size="150"
                        class="align-center"
                        :image=profilePic
                      ></v-avatar>

                      <div style="width: 100%; max-width: 350px;">
                      <v-file-input
                        :rules="avatarrules"
                        v-model="newAvatar"
                        accept="image/png, image/jpeg, image/bmp"
                        label="Upload new avatar"
                        variant="solo-filled"
                        class="pt-3"
                        density="compact"
                        show-size
                        prepend-icon="mdi-camera"
                        @change="onAvatarChange"
                      ></v-file-input>
                      </div>

                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="userDetails.name" label="Full Name" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="userBio" label="User Bio Description" variant="outlined" rows="4"
                          rounded="lg" auto-grow></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <!-- Location Details - Replaced with map and search -->
                        <h2 class="text-subtitle-1 font-weight-bold mt-4 mb-2">Choose Your Location</h2>
                        <v-text-field id="search-box" label="Search for a location" variant="outlined" density="comfortable"
                          class="mb-4 rounded-lg" prepend-inner-icon="mdi-magnify" v-model="searchQuery"></v-text-field>

                        <!-- The `libraries` prop is now an array -->
                        <div class="relative min-h-[300px] mb-4">
                          <GoogleMap api-key="" style="width: 100%; height: 100%" :center="mapCenter" :zoom="13" @click="handleMapClick"
                            :libraries="['places']">
                            <!-- AdvancedMarkerElement with the PinElement removed -->
                            <Marker :position="markerPosition" :map-id="mapId" :key="markerKey" />
                          </GoogleMap>

                          <!-- Loading overlay for the map -->
                          <div v-if="mapIsLoading"
                            class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 rounded-lg z-10">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                          </div>
                        </div>

                        <p class="text-body-2 text-secondary text-center mb-2">Click on the map or use the search bar.</p>
                        <div v-if="lon && lat" class="text-center mb-4">
                          <v-chip color="success" class="font-weight-medium">
                            Selected: Lon: {{ parseFloat(lon).toFixed(6) }}, Lat: {{ parseFloat(lat).toFixed(6) }}
                          </v-chip>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end mt-4">
                  <v-btn color="green-darken-2" class="text-capitalize px-8 py-6 rounded-lg" @click="step = 2">
                    <span class="font-weight-bold">Continue</span>
                  </v-btn>
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="2">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Services & Schedule</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-combobox v-model="servicesOffered" :items="availableServices" label="Services Offered"
                          multiple chips variant="outlined" rounded="lg"></v-combobox>
                      </v-col>
                      <v-col cols="12">
                      <v-text-field v-model="charge" label="Set Charges" variant="outlined" rounded="lg"></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-select v-model="rateType" :items="['Per hour', 'Per day', 'Per week', 'Per month']"
                          label="Set Rates" variant="outlined" rounded="lg"></v-select>
                      </v-col>
                      <v-col cols="12">
                        <div class="text-subtitle-1 font-weight-bold mb-2">Set Schedule</div>
                        <div class="schedule-container border rounded-lg overflow-y-auto max-h-[400px]">
                        <v-list density="compact">
                            <v-list-item
                                v-for="(day, index) in schedule"
                                :key="day.day"
                                class="py-2 px-4 border-b hover:bg-indigo-50 transition"
                            >
                                <div class="d-flex align-center justify-space-between w-full">

                                    <!-- Checkbox and Day Label -->
                                    <v-checkbox
                                        v-model="day.checked"
                                        :label="day.label"
                                        hide-details
                                        density="compact"
                                        class="flex-shrink-0 mr-4"
                                        color="indigo"
                                    ></v-checkbox>

                                    <div class="d-flex align-center space-x-2">
                                        <!-- Start Time Input -->
                                        <v-text-field
                                            v-model="day.str_time"
                                            label="Start"
                                            type="time"
                                            :disabled="!day.checked"
                                            density="compact"
                                            variant="outlined"
                                            hide-details
                                            class="text-sm"
                                            style="width: 150px;"
                                        ></v-text-field>

                                        <span class="text-gray-500 font-bold">-</span>

                                        <!-- End Time Input -->
                                        <v-text-field
                                            v-model="day.end_time"
                                            label="End"
                                            type="time"
                                            :disabled="!day.checked"
                                            density="compact"
                                            variant="outlined"
                                            hide-details
                                            class="text-sm"
                                            style="width: 150px;"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </v-list-item>
                        </v-list>
                    </div>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="providerCode" label="Provider Code" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between mt-4">
                  <v-btn color="grey" @click="step = 1">Back</v-btn>
                  <v-btn color="green-darken-2" @click="step = 3">Continue</v-btn>
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="3">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Payments & Verification</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="paymentDetails.mpesaNumber" label="Mpesa Phone Number" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input label="Upload ID" variant="outlined" rounded="lg" show-size></v-file-input>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input label="Upload Payment Verification" variant="outlined" rounded="lg"
                          show-size></v-file-input>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input label="Additional Certifications" variant="outlined" rounded="lg" show-size
                          multiple></v-file-input>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between mt-4">
                  <v-btn color="grey" @click="step = 2">Back</v-btn>
                  <v-btn color="green-darken-2" @click="step = 4">Continue</v-btn>
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="4">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Confirm Details</v-card-title>
                  <v-card-text>
                    <div class="d-flex align-center mb-4">
                      <v-avatar size="64">
                        <v-img :src="profilePic" alt="Profile Picture"></v-img>
                      </v-avatar>
                      <div class="ml-4">
                        <div class="text-h6 font-weight-bold">{{ userDetails.name }}</div>
                        <div class="text-subtitle-1 text-grey-darken-1">{{ userBio }}</div>
                        <div class="text-body-2 text-grey-darken-1">{{ locationDetails }}</div>
                      </div>
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="text-subtitle-1 font-weight-bold">Services Offered</div>
                    <v-chip-group class="mb-4">
                      <v-chip v-for="service in servicesOffered" :key="service">{{ service }}</v-chip>
                    </v-chip-group>

                    <div class="text-subtitle-1 font-weight-bold">Charge</div>
                    <div class="text-body-1">{{ charge }}</div>
                    <div class="text-subtitle-1 font-weight-bold">Rate Type</div>
                    <div class="text-body-1">{{ rateType }}</div>
                    <div class="text-subtitle-1 font-weight-bold">Schedule</div>
                    <div class="text-body-1">
                      <div v-if="computedPayload.length > 0">
                        <!-- Display the selected schedule in a clean list format -->
                        <v-list density="compact" class="bg-transparent rounded-lg">
                            <v-list-item
                                v-for="(day, index) in computedPayload"
                                :key="day.day"
                                class="py-1 px-2 border-b last:border-b-0"
                            >
                                <div class="d-flex justify-space-between w-full">
                                    <span class="font-weight-medium text-indigo-700">{{ getDayLabel(day.day) }}</span>
                                    <span class="text-gray-700">{{ day.time.str_time }} - {{ day.time.end_time }}</span>
                                </div>
                            </v-list-item>
                          </v-list>

                    </div>
                  </div>
                    <div class="text-body-1">
                      <span class="font-weight-bold">Provider Code:</span>
                      {{ providerCode }}
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="text-subtitle-1 font-weight-bold">Payment Details</div>
                    <div class="text-body-1">
                      <span class="font-weight-bold">Mpesa Number:</span>
                      {{ paymentDetails.mpesaNumber }}
                    </div>

                  </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between mt-4">
                  <v-btn color="grey" @click="step = 3">Back</v-btn>
                  <v-btn color="green-darken-2" class="text-capitalize px-8 py-6 rounded-lg" @click="handleProviderRegistration">
                    <span class="font-weight-bold">Submit</span>
                  </v-btn>
                </div>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map';
import { useAppStore } from '@/stores/app';


 const initialScheduleData = [
        { "day": 1, "label": "Sunday", "checked": false, "str_time": "09:00", "end_time": "17:00" },
        // Corrected schedule for Monday to Friday to be uniform (12:00 to 18:00)
        { "day": 2, "label": "Monday", "checked": true, "str_time": "12:00", "end_time": "18:00" },
        { "day": 3, "label": "Tuesday", "checked": true, "str_time": "12:00", "end_time": "18:00" },
        { "day": 4, "label": "Wednesday", "checked": true, "str_time": "12:00", "end_time": "18:00" },
        { "day": 5, "label": "Thursday", "checked": true, "str_time": "12:00", "end_time": "18:00" },
        { "day": 6, "label": "Friday", "checked": true, "str_time": "12:00", "end_time": "18:00" },
        { "day": 7, "label": "Saturday", "checked": false, "str_time": "10:00", "end_time": "14:00" },
    ];

export default {
  components: {
    GoogleMap,
    Marker,
  },
  data() {
    return {
      step: 1,
      profilePic: null,
      userDetails: {
        name: 'John Doe',
        email: 'I4DyS@example.com',
        phone: '+254712345678',
        longitude: 36.8219,
        latitude: -1.2921
      },
      userBio: 'Experienced provider specializing in furniture assembly and general home repair.',
      locationDetails: 'Nairobi, Kenya',
      availableServices: ['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Gardening'],
      servicesOffered: ['Plumbing'],
      rateType: 'Per hour',
      schedule : JSON.parse(JSON.stringify(initialScheduleData)),
      paymentDetails: {
        mpesaNumber: '0712345678'
      },
      providerCode: null,
      mapIsLoading: true,
      lon: null,
      lat: null,
      searchQuery: '',
      mapId: null,
      markerKey: 0,
      defaultCoords: { lat: -1.2921, lng: 36.8219 },
      mapCenter: { lat: -1.2921, lng: 36.8219 },
      markerPosition: { lat: -1.2921, lng: 36.8219 },
      avatar: null,
      newAvatar: [],
      avatarrules: [
        value => {
          return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
        },
      ],
      charge: null,
      appStore: useAppStore(),
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  name: 'ProviderRegistration',
  computed: {
    computedPayload() {
      // Access data using 'this.schedule'
      return this.schedule
          .filter(day => day.checked)
          .map(day => ({
            day: day.day,
            time: {
              str_time: day.str_time,
              end_time: day.end_time
            }
          }));
        }
  },
  methods: {
    getDayLabel(dayNum) {
                const day = this.schedule.find(d => d.day === dayNum);
                return day ? day.label : `Day ${dayNum}`;
            },
    async handleProviderRegistration() {
      // Validate the form using the ref
      // const { valid } = await this.$refs.loginForm.validate();
      // if (!valid) {
      //   this.showSnackbar('Please fill in all fields correctly.', 'error');
      //   return;
      // }

      // In a real application, you would send these credentials and the role to your backend
      this.loading = true;
      if (this.rateType === 'Per hour') {
        this.rateType = 1;
      } else if (this.rateType === 'Per day') {
        this.rateType = 10;
      } else if (this.rateType === 'Per week') {
        this.rateType = 100;
      } else if (this.rateType === 'Per month') {
        this.rateType = 1000;
      }
      let payload = {
        providerCode: this.providerCode,
        userBio: this.userBio,
        longitude: this.userDetails.longitude,
        latitude: this.userDetails.latitude,
        charge: parseInt(this.charge),
        profilePic: this.profilePic,
        rateType: this.rateType,
        serviceCategory: this.servicesOffered,
        serviceType: 'General',

        userDetails: this.userDetails,
        locationDetails: this.locationDetails,
        servicesOffered: this.servicesOffered,
        schedule: this.schedule,
        paymentDetails: this.paymentDetails,
      };
      const response = await this.appStore.providerRegistration(payload);

      // Handle the login response
      if (response.success === false) {
        this.loading = false;
        this.showSnackbar(response.error, 'error');
        return;
      }

      const scheduleResponse = await this.appStore.providerSchedule({
        providerCode: this.providerCode,
        schedule: this.computedPayload,
      });

      if (scheduleResponse.success === false) {
        this.loading = false;
        this.showSnackbar(scheduleResponse.error, 'error');
        return;
      } else {
        this.loading = false;
        // Use the snackbar for feedback instead of alert()
        this.showSnackbar('Registration successful!', 'success');
        this.$router.push('/');
      }

    },
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    handleMapClick(event) {
      this.lat = event.latLng.lat();
      this.lon = event.latLng.lng();
      this.markerPosition = { lat: this.lat, lng: this.lon };
      this.markerKey += 1;
    },
    initPlacesAutocomplete() {
      const input = document.getElementById('search-box');
      if (!input || !window.google || !window.google.maps || !window.google.maps.places) {
        console.error('Google Maps API or search box not ready.');
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const newLat = place.geometry.location.lat();
          const newLng = place.geometry.location.lng();

          this.lon = newLng;
          this.lat = newLat;
          this.markerPosition = { lat: newLat, lng: newLng };
          this.mapCenter = { lat: newLat, lng: newLng };
          this.markerKey += 1;
        } else {
          this.showSnackbar('Could not find the location. Please try again.', 'warning');
        }
      });
    },
     onAvatarChange(event) {
      this.newAvatar = event.target.files[0];

      if (this.newAvatar) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePic = e.target.result;
        };
        reader.readAsDataURL(this.newAvatar);
      }
    },
  },
  mounted() {
    const checkGoogleMapsReady = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(checkGoogleMapsReady);
        this.initPlacesAutocomplete();
        this.mapIsLoading = false;
      }
    }, 100);
  }
};
</script>

<style scoped>
.transparent-bg {
  background-color: transparent !important;
}
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.min-h-\[300px\] {
  min-height: 300px;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.bg-opacity-75 {
  background-color: rgba(229, 231, 235, 0.75);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.z-10 {
  z-index: 10;
}
</style>
