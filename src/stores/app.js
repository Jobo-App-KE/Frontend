// stores/app.js
import { defineStore } from 'pinia'

// Placeholder for your API base URL
const API_BASE_URL = 'http://your-backend-api.com'

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
        reviews: 2,
        tasksCompleted: 6,
        about: 'Assembly and minor repairs! Would love to help you get things done!',
        testimonial: {
          name: 'Olivia N.',
          date: 'Jun 27',
          imageUrl:
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          text: 'So professional and talented at what he does. Efficient and very nice. Highly recommend!!!',
        },
        allReviews: [
          {
            name: 'Purity Wanjiru',
            date: '1 week ago',
            text: 'Halima did an amazing job with our deep clean. She was thorough, efficient, and very professional. Highly recommend!',
          },
          {
            name: 'John Doe',
            date: '2 months ago',
            text: 'I hired Halima for a one-time cleaning and she exceeded my expectations. My apartment looks brand new.',
          },
        ],
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
        tasksCompleted: 302,
        testimonial: {
          name: 'Caroline H.',
          date: 'Jun 13',
          imageUrl:
            'https://images.pexels.com/photos/3777567/pexels-photo-3777567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          text: '"Candidio is phenomenal. He is highly skilled, knowledgeable, professional, and just lovely to talk to. I couldn\'t believe how fast he finished a range of building projects within a few hours, and the job was well done. Candidio is excellent to work with."',
        },
        allReviews: [
          {
            name: 'Jane Melissa',
            date: '3 weeks ago',
            text: 'Joseph was very prompt and fixed our wiring issue quickly. Great service and fair pricing.',
          },
        ],
      },
      {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/920377/pexels-photo-920377.jpeg',
        name: 'Jane Melissa',
        profession: 'Plumber',
        location: 'Mombasa, Kenya',
        rate: 'KSh 650/hour',
        rating: 4.8,
        reviews: 15,
        tasksCompleted: 50,
        about:
          'Experienced plumber specializing in residential plumbing solutions. From minor leaks to full installations, I can help.',
        testimonial: {
          name: 'David R.',
          date: 'Jul 01',
          imageUrl:
            'https://images.pexels.com/photos/3777570/pexels-photo-3777570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          text: 'Jane was great! Arrived on time and fixed the issue quickly and efficiently.',
        },
        allReviews: [
          {
            name: 'Peter Mwangi',
            date: '1 month ago',
            text: 'Jane fixed a major leak under our sink efficiently and cleanly. She explained the problem clearly and was a pleasure to work with.',
          },
          {
            name: 'Sarah Kimani',
            date: '3 months ago',
            text: 'Great plumber! Responded quickly to my call and fixed the issue with no fuss. Highly recommended.',
          },
          {
            name: 'David Omondi',
            date: '4 months ago',
            text: 'Professional and reliable. I will definitely call Jane again for any future plumbing needs.',
          },
        ],
      },
      {
        id: 4,
        imageUrl: 'https://images.pexels.com/photos/33169687/pexels-photo-33169687.jpeg',
        name: 'John Abdullah',
        profession: 'Childcare',
        location: 'Nakuru, Kenya',
        rate: 'KSh 400/hour',
        rating: 4.9,
        reviews: 10,
        tasksCompleted: 25,
        about:
          'Caring and reliable childminder with experience in looking after children of all ages. I love to play games and read stories.',
        testimonial: {
          name: 'Sarah P.',
          date: 'Jun 20',
          imageUrl:
            'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          text: 'John was wonderful with our kids. They had a great time and were very comfortable with him.',
        },
        allReviews: [
          {
            name: 'Mary Githinji',
            date: '2 days ago',
            text: 'John is fantastic with our kids. He is patient, engaging, and our children love spending time with him.',
          },
          {
            name: 'Ann Mumbi',
            date: '1 month ago',
            text: 'We are so grateful to have found John. He is reliable and my children feel very comfortable with him.',
          },
          {
            name: 'George Njoroge',
            date: '2 months ago',
            text: 'Excellent childcare provider. I have no hesitation leaving my child with him. Highly trustworthy.',
          },
        ],
      },
    ],
    loading: false,
    error: null,
  }),
  actions: {
    // Action to handle user signup/registration
    async signup(payload) {
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 10,
          content: {
            fname: payload.fname,
            lname: payload.lname,
            phone: payload.phone,
            email: payload.email,
            pwd: payload.password, // Correct field name
            lon: payload.lon,
            lat: payload.lat,
          },
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationPayload),
        })

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Registration successful:', result.msg)
          return { success: true, message: result.msg }
        } else {
          this.error = result.msg || 'Registration failed.'
          console.error('Registration failed:', result.msg)
          return { success: false, message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to submit registration. Please check your network connection.'
        console.error(err)
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Action to handle user login
    async login(payload) {
      this.loading = true
      this.error = null
      try {
        // Map the role string to the correct type for the API payload
        const roleType = payload.role === 'client' ? 1 : 2

        const loginPayload = {
          tsp: '250305110300', // Timestamp/placeholder
          ver: 1,
          act: 10,
          content: {
            pin: payload.password,
            typ: roleType,
            uname: payload.username,
          },
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginPayload),
        })

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Login successful:', result.data)
          // TODO: You should save the token (result.data.tkn) to local storage or a secure cookie
          // You may also want to store other user data in the Pinia store here
          return { success: true, data: result.data }
        } else {
          this.error = result.msg || 'Login failed.'
          console.error('Login failed:', result.msg)
          return { success: false, message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to log in. Please check your network connection.'
        console.error(err)
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Action to fetch providers by search query
    async fetchProvidersBySearch(searchText) {
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 100,
          content: {
            code: 10, // Hardcoded as per the provided example
            stxt: searchText,
          },
        }

        const response = await fetch(`${API_BASE_URL}/api/providers/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(searchPayload),
        })

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Providers fetched successfully:', result.data)
          return { success: true, providers: result.data }
        } else {
          this.error = result.msg || 'Failed to fetch providers.'
          console.error('Failed to fetch providers:', result.msg)
          return { success: false, providers: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to fetch providers. Please check your network connection.'
        console.error(err)
        return { success: false, providers: [], message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Action to fetch categories
    async fetchCategoriesBySearch(searchText) {
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 200,
          content: {
            code: 10,
            stxt: searchText,
          },
        }

        const response = await fetch(`${API_BASE_URL}/api/categories/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(searchPayload),
        })

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Categories fetched successfully:', result.data)
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to fetch categories.'
          console.error('Failed to fetch categories:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to fetch categories. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },

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
