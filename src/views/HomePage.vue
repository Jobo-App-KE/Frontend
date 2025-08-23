<template>
  <v-container class="pa-4">
    <v-row class="text-center my-8">
      <v-col cols="12">
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
          <v-btn v-for="tag in serviceTags" :key="tag" class="ma-2 rounded-lg" variant="outlined" color="grey-darken-1"
            size="large">
            {{ tag }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

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

    <v-divider class="my-8"></v-divider>

    <v-row class="text-center my-8">
      <v-col cols="12">
        <v-card flat class="py-6 px-4 mb-8" color="light-green-lighten-5">
          <v-card-title class="text-h6 font-weight-bold text-success">
            <v-icon color="success" class="mr-2">mdi-cellphone</v-icon>
            Pay with M-Pesa
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1">
            The fastest, safest way to pay for services in Kenya
          </v-card-subtitle>
          <v-card flat class="my-6 pa-4 rounded-lg" color="white">
            <h3 class="text-h6 font-weight-bold mb-4 text-text">Simple M-Pesa Payments</h3>
            <p class="text-body-1 text-grey-darken-1 mb-4">
              Just enter your phone number, we'll send a payment request to your phone, enter your M-Pesa PIN, and
              you're done!
            </p>
            <v-row v-for="(step, i) in mpesaSteps" :key="i" justify="center" align="center" class="mb-2">
              <v-col cols="auto" class="d-flex align-center justify-start" style="min-width: 250px;">
                <v-avatar color="success" size="28" class="mr-4">
                  <span class="text-caption font-weight-bold text-white">{{ i + 1 }}</span>
                </v-avatar>
                <span class="font-weight-medium text-text">{{ step }}</span>
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="d-flex flex-column align-center">
                <v-icon color="success" size="48">mdi-flash</v-icon>
                <div class="text-subtitle-1 font-weight-bold text-text mt-2">Instant Payment</div>
                <div class="text-body-2 text-grey-darken-1">Pay in seconds with your M-Pesa PIN</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="d-flex flex-column align-center">
                <v-icon color="success" size="48">mdi-shield-check</v-icon>
                <div class="text-subtitle-1 font-weight-bold text-text mt-2">100% Secure</div>
                <div class="text-body-2 text-grey-darken-1">Bank-level security for all transactions</div>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="d-flex flex-column align-center">
                <v-icon color="success" size="48">mdi-account-multiple</v-icon>
                <div class="text-subtitle-1 font-weight-bold text-text mt-2">Trusted by Millions</div>
                <div class="text-body-2 text-grey-darken-1">Kenya's most popular payment method</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card flat class="py-6 px-4" color="light-green-lighten-5">
          <div class="text-h6 font-weight-bold text-success mb-2">24/7 Available</div>
          <div class="text-body-1 text-grey-darken-1">Pay anytime, anywhere in Kenya</div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row class="text-center my-8">
      <v-col cols="12">
        <div class="mb-6">
          <h2 class="text-h5 font-weight-bold text-text">What Our Users Are Saying</h2>
          <p class="text-body-1 text-grey-darken-1">
            Read real stories from clients and service providers who use JobO every day
          </p>
        </div>
        <v-row justify="center">
          <v-col cols="12" md="6" v-for="testimonial in testimonials" :key="testimonial.name">
            <v-card class="pa-4 rounded-lg elevation-2 text-left" height="100%">
              <div class="d-flex align-center mb-3">
                <v-avatar size="56" class="mr-4">
                  <v-img :src="testimonial.avatar"></v-img>
                </v-avatar>
                <div>
                  <div class="font-weight-bold text-text">{{ testimonial.name }}</div>
                  <div class="text-caption text-grey-darken-1">{{ testimonial.role }}</div>
                </div>
                <v-spacer></v-spacer>
                <v-rating :model-value="5" color="yellow-darken-3" half-increments density="compact"
                  readonly></v-rating>
              </div>
              <div class="text-body-2 text-grey-darken-1 mb-2">
                "{{ testimonial.quote }}"
              </div>
              <div class="text-caption text-grey-darken-2" v-if="testimonial.service">
                Used for: <span class="font-weight-bold">{{ testimonial.service }}</span>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row class="text-center my-8">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold mb-6 text-text">Frequently Asked Questions</h2>
        <v-expansion-panels variant="accordion" class="rounded-lg">
          <v-expansion-panel v-for="(faq, i) in faqs" :key="i" :title="faq.question">
            <v-expansion-panel-text>
              {{ faq.answer }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn color="success" variant="text" class="mt-4 text-capitalize">
          View All FAQs
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row class="text-center my-8">
      <v-col cols="12">
        <v-card flat class="py-8 px-4 rounded-lg" color="#53B257">
          <h2 class="text-h5 font-weight-bold text-text mb-2">Get the JobO Mobile App</h2>
          <p class="text-body-1 text-white mb-6">
            Manage bookings, find services, and connect with professionals on the go
          </p>
          <div class="d-flex justify-center flex-wrap">
            <a href="https://www.apple.com/app-store/" target="_blank" class="text-decoration-none mx-2 my-2">
              <v-btn color="black" class="text-capitalize" size="large" prepend-icon="mdi-apple">
                Download on the App Store
              </v-btn>
            </a>
            <a href="https://play.google.com/store" target="_blank" class="text-decoration-none mx-2 my-2">
              <v-btn color="black" class="text-capitalize" size="large" prepend-icon="mdi-google-play">
                Get it on Google Play
              </v-btn>
            </a>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row class="text-center my-8">
      <v-col cols="12">
        <v-card flat class="py-8 px-4 rounded-lg" color="white">
          <h2 class="text-h5 font-weight-bold text-text mb-2">Stay Updated with JobO</h2>
          <p class="text-body-1 text-grey-darken-1 mb-6">
            Subscribe to our newsletter for exclusive updates and special offers
          </p>
          <div class="d-flex justify-center align-center mb-4" style="max-width: 500px; margin: auto;">
            <v-text-field label="Enter your email address" variant="outlined" density="compact" hide-details
              class="rounded-lg mr-2" v-model="email"></v-text-field>
            <v-btn color="success" class="rounded-lg px-6" height="40" @click="subscribe">Subscribe</v-btn>
          </div>
          <p class="text-caption text-grey-darken-1">
            We respect your privacy and will never share your information with third parties.
          </p>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
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

// Data and logic for M-Pesa section
const mpesaSteps = ref([
  'Enter phone number',
  'Check your phone',
  'Enter M-Pesa PIN',
  'Payment complete!',
]);

// Data for Testimonials section
const testimonials = ref([
  {
    name: 'Sarah N.',
    role: 'Client',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    quote: 'I found a great tutor for my daughter through JobO. The process was simple and her grades have improved.',
    service: null,
  },
  {
    name: 'David G.',
    role: 'Client',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    quote: 'I\'ve been using the subscription service for monthly home cleaning. Reliable workers and the discounted rate saves me money!',
    service: 'Home Cleaning',
  },
  {
    name: 'Mary K.',
    role: 'Service Provider',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    quote: 'Since joining JobO as a provider, my customer base has grown tremendously. The platform makes it easy to showcase my skills and get new clients.',
    service: 'Electrical Work',
  },
]);

// Data for FAQ section
const faqs = ref([
  {
    question: 'How do I book a service?',
    answer: 'Browse our service categories, choose a provider based on ratings and reviews, and then book a time and date that works for you.',
  },
  {
    question: 'What are the benefits of a subscription?',
    answer: 'Subscribers get discounted rates on services, priority booking, and exclusive access to special offers.',
  },
  {
    question: 'How do I become a service provider?',
    answer: 'You can sign up as a service provider on our platform. We verify all providers to ensure quality and trust. Once approved, you can showcase your skills and start getting clients.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We primarily accept M-Pesa payments, which are fast, secure, and widely used in Kenya.',
  },
]);

// Data and logic for Newsletter section
const email = ref('');

const subscribe = () => {
  // Logic to handle newsletter subscription
  console.log('Subscribing with email:', email.value);
  alert(`Thanks for subscribing with ${email.value}!`);
  email.value = '';
};
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
