<!-- views/Home.vue -->
<template>
  <v-container class="pa-4">
    <!-- Hero Section -->
    <v-row class="text-center my-8">
      <v-col cols="12">
        <!-- Big Logo as per image -->
        <div class="mb-4">
          <span class="text-h2 font-weight-bold text-success" style="font-family: 'Inter', sans-serif;">jobO</span>
          <div class="text-h6 text-secondary" style="font-family: 'Inter', sans-serif;">takes a village...</div>
        </div>

        <h1 class="text-h5 font-weight-bold mb-4 text-text">
          Connect with verified professionals for essential services in Kenya. Simple, reliable, and affordable.
        </h1>
        <div class="d-flex justify-center align-center mb-6" style="max-width: 60%; margin: auto;">
          <v-text-field label="What service do you need?" variant="outlined" density="compact" hide-details
            class="rounded-lg mr-2" prepend-inner-icon="mdi-magnify"></v-text-field>
          <v-btn color="success" class="rounded-lg px-6" height="40">Search</v-btn>
        </div>
        <div class="d-flex flex-wrap justify-center">
          <!-- Changed ServiceTags to v-btn for rounded buttons -->
          <v-btn v-for="tag in serviceTags" :key="tag" class="ma-2 rounded-lg" variant="outlined" color="grey-darken-1"
            size="large">
            {{ tag }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <!-- Find the service you need section -->
    <v-row class="text-center my-8">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold mb-6 text-text">Find the service you need</h2>
        <v-row justify="center" style="max-width: 80%; margin: auto;">
          <v-col cols="6" sm="4" md="2" v-for="(category, i) in appStore.serviceCategories" :key="i">
            <ServiceCategoryCard :icon="category.icon" :category="category.name" :highlight="category.highlight"
              @select-category="handleCategorySelect" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <!-- Featured Service Providers section -->
    <v-row class="my-8">
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div class="flex-grow-1 text-center ">
            <h2 class="text-h5 font-weight-bold text-text" style="padding-left: 90px;">Featured Service Providers</h2>
          </div>
          <div>
            <v-btn icon flat size="small" class="mr-2" @click="scrollProviders('left')">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn icon flat size="small" @click="scrollProviders('right')">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>


          </div>
        </div>
        <div class="d-flex overflow-x-auto py-2" ref="providersScrollContainer">
          <ServiceProviderCard v-for="provider in appStore.featuredProviders" :key="provider.id" :id="provider.id"
            :image-url="provider.imageUrl" :name="provider.name" :profession="provider.profession"
            :location="provider.location" :rate="provider.rate" class="flex-shrink-0 mr-4" />
        </div>
        <div class="d-flex justify-center align-center mb-6 mt-6">
          <v-btn color="primary" variant="outlined" class="text-capitalize" to="/providers">
            Find More
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <!-- How it works section -->
    <v-row class="text-center my-8">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold mb-6 text-text">How it works</h2>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4" v-for="(step, i) in howItWorksSteps" :key="i">
            <HowItWorksStep :icon="step.icon" :title="step.title" :description="step.description" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <!-- Footer Component -->
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
// Removed ServiceTag as it's no longer directly used in Home.vue for these buttons
import ServiceCategoryCard from '../components/ServiceCategoryCard.vue';
import ServiceProviderCard from '../components/ServiceProviderCard.vue';
import HowItWorksStep from '../components/HowItWorksStep.vue';
import Footer from '../components/FooterComponent.vue';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();

// Data for the new rounded buttons
const serviceTags = ref([
  'House Cleaning',
  'Plumbing',
  'Electrician',
  'Childcare',
]);

const howItWorksSteps = ref([
  {
    icon: 'mdi-magnify',
    title: 'Find a service',
    description: 'Browse categories or search for providers near you',
  },
  {
    icon: 'mdi-account-group-outline',
    title: 'Choose a provider',
    description: 'Compare ratings, reviews, and prices',
  },
  {
    icon: 'mdi-calendar-check',
    title: 'Schedule',
    description: 'Book your service at a time that works for you',
  },
]);

const providersScrollContainer = ref(null);

const scrollProviders = (direction) => {
  if (providersScrollContainer.value) {
    const scrollAmount = 320;
    if (direction === 'left') {
      providersScrollContainer.value.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else {
      providersScrollContainer.value.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }
};

const handleCategorySelect = (category) => {
  console.log('Selected category:', category);
  // Navigate to the providers page and pass the selected category as a query parameter
  router.push({ name: 'ListedProviders', query: { category: category } });
};

onMounted(() => {
  // Update serviceCategories with icons based on the image
  appStore.serviceCategories = [
    { icon: 'mdi-leaf', name: 'House Cleaning', highlight: false }, // Changed icon to mdi-leaf as per image
    { icon: 'mdi-water-outline', name: 'Plumbing', highlight: false }, // Changed icon to mdi-water-outline
    { icon: 'mdi-lightning-bolt', name: 'Electrician', highlight: false },
    { icon: 'mdi-recycle-variant', name: 'Childcare', highlight: false }, // Changed icon to mdi-recycle-variant
    { icon: 'mdi-account-outline', name: 'Others', highlight: false }, // Changed icon to mdi-account-outline
    { icon: 'mdi-stethoscope', name: 'Medical', highlight: false },
  ];
  appStore.fetchServiceCategories(); // This will now use the updated data
  appStore.fetchFeaturedProviders();
});
</script>

<style scoped>
/* Scoped styles for Home.vue if needed */
.overflow-x-auto {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
