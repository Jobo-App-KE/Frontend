// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you have this for icons
import { createPinia } from 'pinia' // Import Pinia

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#4CAF50', // A shade of green for primary actions
          secondary: '#424242', // Dark grey for secondary elements
          accent: '#82B1FF', // A light blue accent
          error: '#FF5252', // Red for errors
          info: '#2196F3', // Blue for info
          success: '#4CAF50', // Green for success
          warning: '#FFC107', // Yellow for warnings
          background: '#F5F5F5', // Light grey background
          text: '#212121', // Dark text
        },
      },
    },
  },
})

const pinia = createPinia() // Create Pinia instance

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia) // Use Pinia
  .mount('#app')
