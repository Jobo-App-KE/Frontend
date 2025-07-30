import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // Import the Vuetify plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true, // Automatically import Vuetify components and directives
      styles: {
        configFile: 'src/styles/settings.scss', // Optional: if you have custom SASS variables
      },
    }),
  ],
  // Configure Vite to resolve modules from 'src'
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Server configuration for development
  server: {
    port: 5173, // You can change this if needed
    open: true, // Automatically open browser on start
  },
})
