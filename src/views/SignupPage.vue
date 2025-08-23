<!-- views/Signup.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6 rounded-xl" width="100%" max-w="450" flat>
      <div class="text-center mb-6">
        <h1 class="text-h5 font-weight-bold text-text mb-2">Create Account</h1>
        <p class="text-body-2 text-secondary">Fill in your details to get started</p>
      </div>

      <!-- Added a ref to the form for validation -->
      <v-form ref="signupForm" @submit.prevent="handleSignup">
        <!-- Role Selection -->
        <v-radio-group v-model="role" inline class="mb-4">
          <v-radio label="Client" value="client" color="success"></v-radio>
          <v-radio label="Provider" value="provider" color="success"></v-radio>
        </v-radio-group>

        <v-text-field v-model="fname" label="First Name" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required]"></v-text-field>

        <v-text-field v-model="lname" label="Last Name" variant="outlined" density="comfortable" class="mb-4 rounded-lg"
          :rules="[rules.required]"></v-text-field>

        <v-text-field v-model="phone" label="Phone Number" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required, rules.phone]"></v-text-field>

        <v-text-field v-model="email" label="Email" type="email" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required, rules.email]"></v-text-field>

        <v-text-field v-model="password" label="Password" type="password" variant="outlined" density="comfortable"
          class="mb-4 rounded-lg" :rules="[rules.required, rules.minPassword]"></v-text-field>

        <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" variant="outlined"
          density="comfortable" class="mb-6 rounded-lg" :rules="[rules.required, rules.passwordMatch]"></v-text-field>

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

        <v-btn type="submit" color="success" block class="rounded-lg py-3" :loading="loading" :disabled="!lon || !lat">
          Sign up
        </v-btn>
      </v-form>

      <div class="text-center mt-6">
        <span class="text-body-2 text-secondary">Already have an account? </span>
        <a href="#" class="text-success text-decoration-none font-weight-medium">Sign in</a>
      </div>
    </v-card>
  </v-container>

  <!-- Replaced alert() with a Vuetify Snackbar for a better user experience -->
  <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
    {{ snackbarText }}
  </v-snackbar>
</template>

<script>
import { ref, onMounted } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';

export default {
  name: 'SignupPage',
  components: {
    GoogleMap,
    Marker,
  },
  setup() {
    const role = ref('client');
    const fname = ref('');
    const lname = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const lon = ref(null);
    const lat = ref(null);
    const loading = ref(false);
    const mapIsLoading = ref(true);
    const snackbar = ref(false);
    const snackbarText = ref('');
    const snackbarColor = ref('');
    const signupForm = ref(null);
    const searchQuery = ref('');
    const mapId = ref(null);
    const markerKey = ref(0);

    const defaultCoords = { lat: -1.2921, lng: 36.8219 };
    const mapCenter = ref(defaultCoords);
    const markerPosition = ref(defaultCoords);

    const rules = {
      required: value => !!value || 'This field is required.',
      phone: value => /^\+?254\d{9}$/.test(value) || 'Phone number must be in the format +254XXXXXXXXX.',
      email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      minPassword: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || 'Password must be at least 8 characters with a mix of uppercase, lowercase, numbers, and symbols.',
      passwordMatch: value => value === password.value || 'Passwords do not match.',
    };

    const showSnackbar = (text, color) => {
      snackbarText.value = text;
      snackbarColor.value = color;
      snackbar.value = true;
    };

    const handleSignup = async () => {
      const { valid } = await signupForm.value.validate();
      if (!valid) {
        showSnackbar('Please fill in all fields correctly.', 'error');
        return;
      }

      if (!lon.value || !lat.value) {
        showSnackbar('Please select your location on the map.', 'error');
        return;
      }

      loading.value = true;

      const payload = {
        "tsp": "250314111358",
        "ver": 1,
        "act": 10,
        "content": {
          "fname": fname.value,
          "lname": lname.value,
          "phone": phone.value,
          "email": email.value,
          "pwd": password.value,
          "lon": lon.value.toString(),
          "lat": lat.value.toString()
        }
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      loading.value = false;
      console.log('Attempting to sign up with payload:', payload);

      showSnackbar('Signup successful! (Simulated)', 'success');
    };

    const handleMapClick = (event) => {
      lat.value = event.latLng.lat();
      lon.value = event.latLng.lng();
      markerPosition.value = { lat: lat.value, lng: lon.value };
      markerKey.value += 1;
    };

    const initPlacesAutocomplete = () => {
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

          lon.value = newLng;
          lat.value = newLat;
          markerPosition.value = { lat: newLat, lng: newLng };
          mapCenter.value = { lat: newLat, lng: newLng };
          markerKey.value += 1;
        } else {
          showSnackbar('Could not find the location. Please try again.', 'warning');
        }
      });
    };

    onMounted(() => {
      const checkGoogleMapsReady = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogleMapsReady);
          initPlacesAutocomplete();
          mapIsLoading.value = false;
        }
      }, 100);
    });

    return {
      role,
      fname,
      lname,
      phone,
      email,
      password,
      confirmPassword,
      lon,
      lat,
      loading,
      snackbar,
      snackbarText,
      snackbarColor,
      signupForm,
      mapIsLoading,
      searchQuery,
      mapCenter,
      markerPosition,
      rules,
      handleSignup,
      handleMapClick,
      mapId,
      markerKey
    };
  },
};
</script>

<style scoped>
/* Scoped styles for Signup.vue if needed */
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
