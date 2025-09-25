<template>
  <v-container class="pa-4">
    <v-row class="text-center ">
      <v-container fluid class="pa-0">
        <v-row no-gutters class="hero-section text-center text-md-left">
          <canvas ref="canvasRef" class="boids-canvas"></canvas>
          <v-col cols="12" md="6" class="hero-content d-flex align-center justify-center pa-8 pa-md-16">
            <div>
              <div class="mb-4">
                <span class="text-h2 font-weight-bold text-success"
                  style="font-family: 'Inter', sans-serif;">jobO</span>
                <!-- <div class="text-h6 font-weight-bold text-white" style="font-family: 'Inter', sans-serif;">takes a
              village...</div> -->
              </div>
              <h1 class="text-h4 text-md-h2 font-weight-bold mb-4 text-black">
                Connect with verified <br> professionals for essential<br> services in Kenya.
              </h1>
              <p class="text-subtitle-1 mb-6 text-green" style="max-width: 400px;">
                Simple, reliable, and affordable.
              </p>
              <v-btn color="primary" class="rounded-lg px-6 py-2" height="48">WHAT WE OFFER</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="image-grid pa-4 pa-md-8">
            <div class="image-wrapper d-flex justify-content-center align-items-center h-100 position-relative">
              <div v-for="(img, i) in images" :key="i" :class="`image-container-${i + 1} rounded-lg elevation-4`">
                <v-img :src="img.src" :alt="img.alt" class="rounded-lg" cover height="100%"></v-img>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-8" style="border-top: 1px solid #ccc;"></v-divider>

        <v-row class="text-center my-8">
          <v-col cols="12">
            <h2 class="text-h5 font-weight-bold mb-6 text-text">Find the service you need</h2>
            <div class="d-flex justify-center align-center mb-6" style="max-width: 60%; margin: auto;">
              <v-text-field label="What service do you need?" variant="outlined" density="compact" hide-details
                class="rounded-lg mr-2" prepend-inner-icon="mdi-magnify"></v-text-field>
              <v-btn color="success" class="rounded-lg px-6" height="40">Search</v-btn>
            </div>
            <v-row justify="center" style="max-width: 80%; margin: auto;">
              <v-col cols="6" sm="4" md="2" v-for="(category, i) in serviceStore.serviceCategories" :key="i">
                <ServiceCategoryCard :icon="category.icon" :category="category.name" :highlight="category.highlight"
                  @select-category="handleCategorySelect" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

      </v-container>
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
          <ServiceProviderCard v-for="provider in serviceStore.featuredProviders" :key="provider.id" :id="provider.id"
            :image-url="provider.imageUrl" :name="provider.name" :profession="provider.profession"
            :location="provider.location" :rate="provider.rate" :rating="provider.rating" :reviews="provider.reviews"
            :tasks-completed="provider.tasksCompleted" class="flex-shrink-0 mr-4"
            style="max-width: 500px; max-height: 300px;" @view-profile="openDialog(provider)" />

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
                  <v-list-item-subtitle class="text-caption text-grey-darken-1">{{ review.date }}</v-list-item-subtitle>
                  <p class="text-body-2 mt-1">{{ review.text }}</p>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAppStore } from '../stores/app';
import { useServiceStore } from '@/stores/services';
// Removed ServiceTag as it's no longer directly used in Home.vue for these buttons
import ServiceCategoryCard from '../components/ServiceCategoryCard.vue';
import ServiceProviderCard from '../components/ServiceProviderCard.vue';
import HowItWorksStep from '../components/HowItWorksStep.vue';
import Footer from '../components/FooterComponent.vue';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const serviceStore = useServiceStore();
const router = useRouter();

const dialog = ref(false);
const selectedProvider = ref({});

// Data for the new rounded buttons
const serviceTags = ref([
  'House Cleaning',
  'Plumbing',
  'Electrician',
  'Childcare',
]);

const canvasRef = ref(null);

const openDialog = (provider) => {
  selectedProvider.value = provider;
  dialog.value = true;
};

const images = ref([
  { src: 'https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 1' },
  { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 2' },
  { src: 'https://plus.unsplash.com/premium_photo-1726826430992-f153d9b5ffd6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 3' },
  { src: 'https://plus.unsplash.com/premium_photo-1661871030291-6bc07f86e073?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 4' },
  { src: 'https://images.unsplash.com/photo-1742483359033-13315b247c74?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 5' },
  { src: 'https://plus.unsplash.com/premium_photo-1664304045336-a2c5bcbd67ed?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 6' },
  { src: 'https://images.unsplash.com/photo-1613405790252-9dda0cbd58f3?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 7' },
]);

const buttons = ref(['Checklist', 'Insurance', 'Movers', 'Internet/TV', 'Security', 'Handyman']);

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
  if (!canvasRef.value) {
    return;
  }

  // Load THREE.js first
  const threeScript = document.createElement('script');
  threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  document.body.appendChild(threeScript);

  threeScript.onload = () => {
    // Load GPUComputationRenderer after THREE.js is available
    const gpuComputeScript = document.createElement('script');
    gpuComputeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/misc/GPUComputationRenderer.js';
    document.body.appendChild(gpuComputeScript);

    gpuComputeScript.onload = () => {
      // The old version of the script automatically attaches to the THREE global object.
      // So no need to destructure.
      const GPUComputationRenderer = THREE.GPUComputationRenderer;

      const o = {
        color1: "paleturquoise",
        color2: "royalblue",
        colorMode: "lerpGradient",
        alphaBackground: true,
        separation: 21,
        alignment: 20,
        cohesion: 20,
        freedom: 0.75,
        speedLimit: 10,
        birdSize: 2,
        wingSpan: 20,
        numRatio: 0.1
      };
      o.color1 = o.color1 || "red";
      o.color2 = o.color2 || "#aaaaaa";
      o.colorMode = o.colorMode || "varianceGradient";
      o.alphaBackground = o.alphaBackground || false;
      o.bgColor = o.bgColor || "white";
      o.separation = o.separation || 20;
      o.alignment = o.alignment || 20;
      o.cohesion = o.cohesion || 20;
      o.freedom = o.freedom || 0.75;
      o.speedLimit = o.speedLimit || 10;
      o.birdSize = o.birdSize || 1;
      o.wingSpan = o.wingSpan || 20;
      o.numRatio = o.numRatio || 1;
      const textureSize = 32,
        numBirds = Math.round(textureSize * textureSize * o.numRatio),
        fragmentShaderPosition =
          "uniform float time;\nuniform float delta;\n\nvoid main() {\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec4 tmpPos = texture2D( texturePosition, uv );\n  vec3 position = tmpPos.xyz;\n  vec3 velocity = texture2D( textureVelocity, uv ).xyz;\n\n  float phase = tmpPos.w;\n\n  phase = mod( ( phase + delta +\n  length( velocity.xz ) * delta * 3. +\n  max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );\n\n  gl_FragColor = vec4( position + velocity * delta * 15. , phase );\n\n}",
        fragmentShaderVelocity =
          "uniform float time;\nuniform float testing;\nuniform float delta; // about 0.016\nuniform float separationDistance; // 20\nuniform float alignmentDistance; // 40\nuniform float cohesionDistance;\nuniform float speedLimit;\nuniform float freedomFactor;\nuniform vec3 predator;\n\nconst float width = resolution.x;\nconst float height = resolution.y;\n\nconst float PI = 3.141592653589793;\nconst float PI_2 = PI * 2.0;\n// const float VISION = PI * 0.55;\n\nfloat zoneRadius = 40.0;\nfloat zoneRadiusSquared = 1600.0;\n\nfloat separationThresh = 0.45;\nfloat alignmentThresh = 0.65;\n\nconst float UPPER_BOUNDS = BOUNDS;\nconst float LOWER_BOUNDS = -UPPER_BOUNDS;\n\nfloat rand(vec2 co){\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n\n  zoneRadius = separationDistance + alignmentDistance + cohesionDistance;\n  separationThresh = separationDistance / zoneRadius;\n  alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;\n  zoneRadiusSquared = zoneRadius * zoneRadius;\n\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec3 birdPosition, birdVelocity;\n\n  vec3 selfPosition = texture2D( texturePosition, uv ).xyz;\n  vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;\n\n  float dist;\n  vec3 dir; // direction\n  float distSquared;\n\n  float separationSquared = separationDistance * separationDistance;\n  float cohesionSquared = cohesionDistance * cohesionDistance;\n\n  float f;\n  float percent;\n\n  vec3 velocity = selfVelocity;\n\n  float limit = speedLimit;\n  \n  dir = predator * UPPER_BOUNDS - selfPosition;\n  dir.z = 0.;\n  // dir.z *= 0.6;\n  dist = length( dir );\n  distSquared = dist * dist;\n\n  float preyRadius = 150.0;\n  float preyRadiusSq = preyRadius * preyRadius;\n\n  // move birds away from predator\n  if (dist < preyRadius) {\n\n    f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;\n    velocity += normalize( dir ) * f;\n    limit += 5.0;\n  }\n\n  // if (testing == 0.0) {}\n  // if ( rand( uv + time ) < freedomFactor ) {}\n\n  // Attract flocks to the center\n  vec3 central = vec3( 0., 0., 0. );\n  dir = selfPosition - central;\n  dist = length( dir );\n\n  dir.y *= 2.5;\n  velocity -= normalize( dir ) * delta * 5.;\n\n  for (float y=0.0;y<height;y++) {\n  for (float x=0.0;x<width;x++) {\n\n    vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;\n    birdPosition = texture2D( texturePosition, ref ).xyz;\n\n    dir = birdPosition - selfPosition;\n    dist = length(dir);\n\n    if (dist < 0.0001) continue;\n\n    distSquared = dist * dist;\n\n    if (distSquared > zoneRadiusSquared ) continue;\n\n    percent = distSquared / zoneRadiusSquared;\n\n    if ( percent < separationThresh ) { // low\n\n      // Separation - Move apart for comfort\n      f = (separationThresh / percent - 1.0) * delta;\n      velocity -= normalize(dir) * f;\n\n    } else if ( percent < alignmentThresh ) { // high\n\n      // Alignment - fly the same direction\n      float threshDelta = alignmentThresh - separationThresh;\n      float adjustedPercent = ( percent - separationThresh ) / threshDelta;\n\n      birdVelocity = texture2D( textureVelocity, ref ).xyz;\n\n      f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;\n      velocity += normalize(birdVelocity) * f;\n\n    } else {\n\n      // Attraction / Cohesion - move closer\n      float threshDelta = 1.0 - alignmentThresh;\n      float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;\n\n      f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;\n\n      velocity += normalize(dir) * f;\n\n    }\n  }\n  }\n\n  // this make tends to fly around than down or up\n  // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);\n\n  // Speed Limits\n  if ( length( velocity ) > limit ) {\n    velocity = normalize( velocity ) * limit;\n  }\n\n  gl_FragColor = vec4( velocity, 1.0 );\n\n}",
        vertexShader =
          "attribute vec2 reference;\nattribute float birdVertex;\n\nattribute vec3 birdColor;\n\nuniform sampler2D texturePosition;\nuniform sampler2D textureVelocity;\n\nvarying vec4 vColor;\nvarying float z;\n\nuniform float time;\nuniform float birdSize;\n\nvoid main() {\n\n  vec4 tmpPos = texture2D( texturePosition, reference );\n  vec3 pos = tmpPos.xyz;\n  vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);\n\n  vec3 newPosition = position;\n\n  if ( birdVertex == 4.0 || birdVertex == 7.0 ) {\n    // flap wings\n    newPosition.y = sin( tmpPos.w ) * 5. * birdSize;\n  }\n\n  newPosition = mat3( modelMatrix ) * newPosition;\n\n  velocity.z *= -1.;\n  float xz = length( velocity.xz );\n  float xyz = 1.;\n  float x = sqrt( 1. - velocity.y * velocity.y );\n\n  float cosry = velocity.x / xz;\n  float sinry = velocity.z / xz;\n\n  float cosrz = x / xyz;\n  float sinrz = velocity.y / xyz;\n\n  mat3 maty =  mat3(\n    cosry, 0, -sinry,\n    0   , 1, 0     ,\n    sinry, 0, cosry\n  );\n\n  mat3 matz =  mat3(\n    cosrz , sinrz, 0,\n    -sinrz, cosrz, 0,\n    0     , 0    , 1\n  );\n  newPosition =  maty * matz * newPosition;\n  newPosition += pos;\n  z = newPosition.z;\n\n  vColor = vec4( birdColor, 1.0 );\n  gl_Position = projectionMatrix * viewMatrix  * vec4( newPosition, 1.0 );\n}",
        fragmentShader =
          "varying vec4 vColor;\nvarying float z;\nuniform vec3 color;\nvoid main() {\n/* // 距離に応じて色変更\n  // Fake colors for now\n  float rr = 0.2 + ( 1000. - z ) / 1000. * vColor.x;\n  float gg = 0.2 + ( 1000. - z ) / 1000. * vColor.y;\n  float bb = 0.2 + ( 1000. - z ) / 1000. * vColor.z;\n  gl_FragColor = vec4( rr, gg, bb, 1. );\n  */\n  \n  gl_FragColor = vec4( vColor.rgb, 1. );\n}";

      class BirdGeometry extends THREE.BufferGeometry {
        constructor() {
          function addVertex() {
            for (let e = 0; e < arguments.length; e++) l.array[u++] = arguments[e];
          }
          function getRandomColor(e) {
            const n = o;
            n.colorMode = n.colorMode || "variance";
            const t = new THREE.Color(n.color1),
              i = new THREE.Color(n.color2);
            let r;
            const a = -1 != n.colorMode.indexOf("Gradient") ? Math.random() : e;
            return (r = 0 == n.colorMode.indexOf("variance") ? new THREE.Color(THREE.MathUtils.clamp(0, t.r + Math.random() * i.r, 1), THREE.MathUtils.clamp(0, t.g + Math.random() * i.g, 1), THREE.MathUtils.clamp(0, t.b + Math.random() * i.b, 1)) : 0 == n.colorMode.indexOf("mix") ? new THREE.Color(t + a * i) : t.lerp(i, a)),
              r;
          }
          super();
          const t = 3 * numBirds,
            a = 3 * t,
            l = new THREE.BufferAttribute(new Float32Array(3 * a), 3),
            s = new THREE.BufferAttribute(new Float32Array(3 * a), 3),
            d = new THREE.BufferAttribute(new Float32Array(2 * a), 2),
            c = new THREE.BufferAttribute(new Float32Array(a), 1);
          this.setAttribute("position", l),
            this.setAttribute("birdColor", s),
            this.setAttribute("reference", d),
            this.setAttribute("birdVertex", c);
          let u = 0;
          const f = o.wingSpan,
            m = o.birdSize;
          for (let n = 0; n < numBirds; n++)
            addVertex(0, -0, -20 * m, 0, 4 * m, -20 * m, 0, 0, 30 * m),
              addVertex(0, 0, -15 * m, -f * m, 0, 0, 0, 0, 15 * m),
              addVertex(0, 0, 15 * m, f * m, 0, 0, 0, 0, -15 * m);
          const v = {};
          for (let e = 0; e < 3 * t; e++) {
            const t = ~~(~~(e / 3) / 3),
              a = (t % textureSize) / textureSize,
              l = ~~(t / textureSize) / textureSize,
              u = ~~(e / 9) / numBirds,
              f = u.toString(),
              m = -1 != o.colorMode.indexOf("Gradient");
            let p;
            (p = !m && v[f] ? v[f] : getRandomColor(u)),
              m || v[f] || (v[f] = p),
              (s.array[3 * e + 0] = p.r),
              (s.array[3 * e + 1] = p.g),
              (s.array[3 * e + 2] = p.b),
              (d.array[2 * e] = a),
              (d.array[2 * e + 1] = l),
              (c.array[e] = e % 9);
          }
          this.scale(0.2, 0.2, 0.2);
        }
      }

      let u, f, m, v = 0, p = 0;
      let h, y;
      const g = 800,
        w = g / 2;
      let x, z, R, E, b, P, T = performance.now();

      function init() {
        h = window.innerWidth / 2;
        y = window.innerHeight / 2;

        u = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e3);
        u.position.z = 350;

        f = new THREE.Scene();
        o.alphaBackground || (f.background = new THREE.Color(o.bgColor));

        m = new THREE.WebGLRenderer({
          canvas: canvasRef.value,
          alpha: o.alphaBackground
        });
        m.setPixelRatio(window.devicePixelRatio);
        m.setSize(window.innerWidth, window.innerHeight);

        x = new GPUComputationRenderer(textureSize, textureSize, m);
        !1 === m.capabilities.isWebGL2 && x.setDataType(THREE.HalfFloatType);

        const positionsTexture = x.createTexture(),
          velocitiesTexture = x.createTexture();
        (function (e) {
          const n = e.image.data;
          for (let e = 0, t = n.length; e < t; e += 4) {
            const t = Math.random() * g - w,
              o = Math.random() * g - w,
              i = Math.random() * g - w;
            (n[e + 0] = t), (n[e + 1] = o), (n[e + 2] = i), (n[e + 3] = 1);
          }
        })(positionsTexture),
          (function (e) {
            const n = e.image.data;
            for (let e = 0, t = n.length; e < t; e += 4) {
              const t = Math.random() - 0.5,
                o = Math.random() - 0.5,
                i = Math.random() - 0.5;
              (n[e + 0] = 10 * t),
                (n[e + 1] = 10 * o),
                (n[e + 2] = 10 * i),
                (n[e + 3] = 1);
            }
          })(velocitiesTexture),
          (z = x.addVariable("textureVelocity", fragmentShaderVelocity, velocitiesTexture)),
          (R = x.addVariable("texturePosition", fragmentShaderPosition, positionsTexture)),
          x.setVariableDependencies(z, [R, z]),
          x.setVariableDependencies(R, [R, z]),
          (E = R.material.uniforms),
          (b = z.material.uniforms),
          (E.time = {
            value: 0
          }),
          (E.delta = {
            value: 0
          }),
          (b.time = {
            value: 1
          }),
          (b.delta = {
            value: 0
          }),
          (b.testing = {
            value: 1
          }),
          (b.separationDistance = {
            value: 1
          }),
          (b.alignmentDistance = {
            value: 1
          }),
          (b.cohesionDistance = {
            value: 1
          }),
          (b.freedomFactor = {
            value: 1
          }),
          (b.speedLimit = {
            value: o.speedLimit
          }),
          (b.predator = {
            value: new THREE.Vector3()
          }),
          (z.material.defines.BOUNDS = g.toFixed(2)),
          (z.wrapS = THREE.RepeatWrapping),
          (z.wrapT = THREE.RepeatWrapping),
          (R.wrapS = THREE.RepeatWrapping),
          (R.wrapT = THREE.RepeatWrapping),
          x.init();

        b.separationDistance.value = o.separation;
        b.alignmentDistance.value = o.alignment;
        b.cohesionDistance.value = o.cohesion;

        const birdGeometry = new BirdGeometry();
        P = {
          birdSize: {
            value: o.birdSize
          },
          texturePosition: {
            value: null
          },
          textureVelocity: {
            value: null
          },
          time: {
            value: 1
          },
          delta: {
            value: 0
          }
        };
        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: P,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          side: THREE.DoubleSide
        });
        const birdMesh = new THREE.Mesh(birdGeometry, shaderMaterial);
        (birdMesh.rotation.y = Math.PI / 2),
          (birdMesh.matrixAutoUpdate = !1),
          birdMesh.updateMatrix(),
          f.add(birdMesh);
      }

      function animate() {
        requestAnimationFrame(animate);
        const e = performance.now();
        let n = (e - T) / 1e3;
        n > 1 && (n = 1),
          (T = e),
          (E.time.value = e),
          (E.delta.value = n),
          (b.time.value = e),
          (b.delta.value = n),
          (P.time.value = e),
          (P.delta.value = n),
          b.predator.value.set((0.5 * v) / h, (-0.5 * p) / y, 0),
          (v = 1e4),
          (p = 1e4),
          x.compute(),
          (P.texturePosition.value = x.getCurrentRenderTarget(R).texture),
          (P.textureVelocity.value = x.getCurrentRenderTarget(z).texture),
          m.render(f, u);
      }

      const handlePointerMove = (e) => {
        if (e.isPrimary !== false) {
          v = e.clientX - h;
          p = e.clientY - y;
        }
      };

      const handleResize = () => {
        h = window.innerWidth / 2;
        y = window.innerHeight / 2;
        u.aspect = window.innerWidth / window.innerHeight;
        u.updateProjectionMatrix();
        m.setSize(window.innerWidth, window.innerHeight);
      };

      init();
      animate();

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerdown", handlePointerMove);
      window.addEventListener("resize", handleResize);

      onBeforeUnmount(() => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerMove);
        window.removeEventListener("resize", handleResize);
      });
    };
  };
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

.hero-section {
  min-height: 80vh;
  position: relative;
  width: 100%;

  color: white;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.image-grid {
  min-height: 600px;
  position: relative;
  z-index: 1;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;
}

.boids-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  margin: -50px;
}

/* Aligned image containers in a 3x3 grid */
.image-container-1 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 10%;
  left: 45%;
  z-index: 10;
}

.image-container-2 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 20%;
  left: 10%;
  z-index: 9;
}

.image-container-3 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 20%;
  left: 80%;
  z-index: 8;
}

.image-container-4 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 35%;
  left: 45%;
  z-index: 7;
}

.image-container-5 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 45%;
  left: 10%;
  z-index: 6;
}

.image-container-6 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 45%;
  left: 80%;
  z-index: 5;
}

.image-container-7 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 60%;
  left: 45%;
  z-index: 4;
}

.image-container-8 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 70%;
  left: 70%;
  z-index: 3;
}

.button-style {
  border-radius: 10px;
  border-color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-transform: capitalize;
}
</style>
