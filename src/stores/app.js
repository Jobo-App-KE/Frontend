// stores/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // Sample data for service categories
    serviceCategories: [
      { icon: 'mdi-broom', name: 'House Cleaning', highlight: false },
      { icon: 'mdi-water-pump', name: 'Plumbing', highlight: false },
      { icon: 'mdi-lightning-bolt', name: 'Electrician', highlight: false },
      { icon: 'mdi-baby-carriage', name: 'Childcare', highlight: false },
      { icon: 'mdi-account-group', name: 'Others', highlight: false },
      { icon: 'mdi-stethoscope', name: 'Medical', highlight: false },
    ],
    // Sample data for featured service providers
    featuredProviders: [
      {
        id: 1,
        imageUrl: 'https://images.pexels.com/photos/33186276/pexels-photo-33186276.jpeg',
        name: 'Halima Sheikh',
        profession: 'House Cleaning',
        location: 'Nairobi, Kenya',
        rate: 'KSh 500/hour',
      },
      {
        id: 2,
        imageUrl: 'https://images.pexels.com/photos/2058659/pexels-photo-2058659.jpeg',
        name: 'Joseph Kamau',
        profession: 'Electrician',
        location: 'Kisumu, Kenya',
        rate: 'KSh 700/hour',
        rating: 5.0,
        reviews: 1,
        experience: 6,
        workingHours: '08:00 to 19:00',
        about:
          'Certified electrician with experience in residential and commercial electrical installations and repairs.',
        servicesOffered: [
          'Professional Electrician Services',
          'Residential and Commercial Properties',
          'Experienced and Reliable Service',
          'Fully Equipped with Professional Tools',
          'Flexible Scheduling Options',
        ],
      },
      {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/920377/pexels-photo-920377.jpeg',
        name: 'Jane Melissa',
        profession: 'Plumber',
        location: 'Mombasa, Kenya',
        rate: 'KSh 650/hour',
      },
      {
        id: 4,
        imageUrl: 'https://images.pexels.com/photos/33169687/pexels-photo-33169687.jpeg',
        name: 'John Abdullah',
        profession: 'Childcare',
        location: 'Nakuru, Kenya',
        rate: 'KSh 400/hour',
      },
    ],
    loading: false,
    error: null,
  }),
  actions: {
    // Simulate fetching service categories from an API
    async fetchServiceCategories() {
      this.loading = true
      this.error = null
      try {
        // In a real app, you would make a fetch call here:
        // const response = await fetch('/api/service-categories');
        // const data = await response.json();
        // this.serviceCategories = data;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        // Data is already in state for this example, so no change needed
      } catch (err) {
        this.error = 'Failed to fetch service categories.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    // Simulate fetching featured providers from an API
    async fetchFeaturedProviders() {
      this.loading = true
      this.error = null
      try {
        // In a real app, you would make a fetch call here:
        // const response = await fetch('/api/featured-providers');
        // const data = await response.json();
        // this.featuredProviders = data;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        // Data is already in state for this example, so no change needed
      } catch (err) {
        this.error = 'Failed to fetch featured providers.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    // Get a single provider by ID
    async fetchProviderById(id) {
      this.loading = true
      this.error = null
      try {
        // In a real app, you would make a fetch call here:
        // const response = await fetch(`/api/providers/${id}`);
        // const data = await response.json();
        // return data;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        const provider = this.featuredProviders.find((p) => p.id == id) // Use == for type coercion as route param is string
        return provider
      } catch (err) {
        this.error = `Failed to fetch provider with ID ${id}.`
        console.error(err)
        return null
      } finally {
        this.loading = false
      }
    },
    async submitBooking(bookingData) {
      this.loading = true
      this.error = null
      try {
        // In a real app, you would make a POST request here:
        // const response = await fetch('/api/bookings', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(bookingData),
        // });
        // if (!response.ok) throw new Error('Booking failed');
        // const result = await response.json();
        // return result;

        // Simulate API delay and success
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('Booking submitted:', bookingData)
        return { success: true, message: 'Booking successful!' }
      } catch (err) {
        this.error = 'Failed to submit booking.'
        console.error(err)
        return { success: false, message: 'Booking failed.' }
      } finally {
        this.loading = false
      }
    },
  },
})
