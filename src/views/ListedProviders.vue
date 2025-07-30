<!-- views/ListedProviders.vue -->
<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Filter Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app permanent width="280" class="bg-grey-lighten-4"
        v-if="$vuetify.display.mdAndUp">
        <v-list-item class="py-4 px-4">
          <v-list-item-title class="text-h6 font-weight-bold text-text">Filters</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-subheader class="text-uppercase text-caption mt-4 text-grey-darken-1">Profession</v-list-subheader>
          <v-list-item v-for="category in appStore.serviceCategories" :key="category.name" link
            @click="toggleFilter('profession', category.name)"
            :class="{ 'bg-success-lighten-4': selectedFilters.profession.includes(category.name) }">
            <v-list-item-title
              :class="{ 'text-success font-weight-bold': selectedFilters.profession.includes(category.name) }">
              {{ category.name }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="toggleFilter('profession', 'All')"
            :class="{ 'bg-success-lighten-4': selectedFilters.profession.length === 0 || selectedFilters.profession.includes('All') }">
            <v-list-item-title
              :class="{ 'text-success font-weight-bold': selectedFilters.profession.length === 0 || selectedFilters.profession.includes('All') }">
              All Professions
            </v-list-item-title>
          </v-list-item>

          <v-list-subheader class="text-uppercase text-caption mt-4 text-grey-darken-1">Location</v-list-subheader>
          <v-list-item link>
            <v-text-field v-model="locationFilter" label="Search Location" variant="outlined" density="compact"
              hide-details class="rounded-lg" prepend-inner-icon="mdi-map-marker" clearable></v-text-field>
          </v-list-item>

          <!-- Add more filter options here (e.g., rating, price range) -->
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content Area for Providers -->
      <v-col>
        <v-app-bar flat color="white" v-if="!$vuetify.display.mdAndUp">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-h6 font-weight-bold text-text">Providers</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </v-app-bar>

        <v-container class="pa-4">
          <h1 class="text-h5 font-weight-bold mb-6 text-text">All Service Providers</h1>

          <v-row v-if="filteredProviders.length > 0">
            <v-col v-for="provider in filteredProviders" :key="provider.id" cols="12" sm="6" md="4" lg="3">
              <ServiceProviderCard :id="provider.id" :image-url="provider.imageUrl" :name="provider.name"
                :profession="provider.profession" :location="provider.location" :rate="provider.rate" />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12" class="text-center text-body-1 text-secondary">
              No providers found matching your criteria.
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'; // Import watch
import { useRoute } from 'vue-router'; // Import useRoute
import { useAppStore } from '../stores/app';
import ServiceProviderCard from '../components/ServiceProviderCard.vue';

const appStore = useAppStore();
const route = useRoute(); // Initialize route
const drawer = ref(true); // Control visibility of the filter drawer (true by default for desktop)

// Filter states
const selectedFilters = ref({
  profession: [],
});
const locationFilter = ref('');

// Function to toggle filters
const toggleFilter = (type, value) => {
  if (type === 'profession') {
    if (value === 'All') {
      selectedFilters.value.profession = []; // Clear all profession filters
    } else {
      const index = selectedFilters.value.profession.indexOf(value);
      if (index === -1) {
        selectedFilters.value.profession.push(value);
      } else {
        selectedFilters.value.profession.splice(index, 1);
      }
    }
  }
  // Add logic for other filter types if needed
};

// Function to apply initial filter from URL query
const applyInitialFilter = () => {
  const categoryQuery = route.query.category;
  if (categoryQuery && typeof categoryQuery === 'string') {
    selectedFilters.value.profession = [categoryQuery];
  } else {
    selectedFilters.value.profession = []; // Clear any existing filter if no query
  }
};

// Computed property for filtered providers
const filteredProviders = computed(() => {
  let providers = appStore.featuredProviders; // Use featuredProviders for now, ideally fetch all providers

  // Filter by profession
  if (selectedFilters.value.profession.length > 0) {
    providers = providers.filter(provider =>
      selectedFilters.value.profession.includes(provider.profession)
    );
  }

  // Filter by location (case-insensitive partial match)
  if (locationFilter.value) {
    const searchLower = locationFilter.value.toLowerCase();
    providers = providers.filter(provider =>
      provider.location.toLowerCase().includes(searchLower)
    );
  }

  return providers;
});

onMounted(() => {
  appStore.fetchServiceCategories();
  appStore.fetchFeaturedProviders();
  applyInitialFilter(); // Apply filter on mount
});

// Watch for changes in route query parameters to update filters
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    selectedFilters.value.profession = [newCategory];
  } else {
    selectedFilters.value.profession = [];
  }
});
</script>

<style scoped>
/* Scoped styles for ListedProviders.vue if needed */
.list-unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
