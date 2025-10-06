import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // Import the Vuetify plugin
import { Buffer } from 'buffer'
// import netlify from '@netlify/vite-plugin'

const USERNAME = '11264768';
const PASSWORD = '60-dayfreetrial';

const basicAuthToken = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vuetify({
      autoImport: true, // Automatically import Vuetify components and directives
      styles: {
        configFile: 'src/styles/settings.scss', // Optional: if you have custom SASS variables
      },
    }),
    // netlify(),
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
    host:true,
    proxy: {
      '/api': {
        target: 'http://watsontech-001-site1.mtempurl.com',
        headers: {
          'Authorization': `Basic ${basicAuthToken}`
        },
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },

  },
})
