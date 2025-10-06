import { defineStore } from 'pinia'

export const useServiceStore = defineStore('services', {
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
    categories: [],
    providers: [],
    loading: false,
    error: null,
    subCategories: [],
    timeData: [],
    providerReviews: [],
  }),
  actions: {
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

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': authHeader,
               'Allow-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Providers fetched successfully:', result.data)
          this.providers = result.data
          this.providers.forEach(async (element) => {
            console.log(element);
            const result = await this.fetchProviderReviews({ providerCode: element.code })
            if (result.success) {
              element.reviews = result.reviews.length
              element.providerReviews = result.reviews
            }
          });
          return { success: true, providers: this.providers}
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

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;


        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Categories fetched successfully:', result.data)
          this.categories = result.data
          return { success: true, categories: this.categories }
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

    async fetchSubCategoriesBySearch(searchText) {
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 250,
          content: {
            code: 10,
            stxt: searchText,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;


        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
             headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Sub Categories fetched successfully:', result.data)
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to fetch categories.'
          console.error('Failed to fetch sub categories:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to fetch sub categories. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchCategorySubCategoriesBySearch(code, searchText) {

      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 251,
          content: {
            code: code,
            stxt: searchText,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('sub sub Categories fetched successfully:', result.data)
          this.subCategories = result.data
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to fetch categories.'
          console.error('Failed to fetch sub sub categories:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to fetch sub sub categories. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },

    async postProviderSchedule(code, searchText) {

      console.log(code, searchText);
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 110,
          content: {
            code: code,
            typ: 9,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Provider schedule submitted successfully:', result.data)
          this.timeData = result.data
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to submit provider schedule.'
          console.error('Failed to submit provider schedule:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to submit provider schedule. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },

    async postScheduleExcpection(payload) {
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 251,
          content: {
            prov_code: 10,
            type: payload.type,
            dates: payload.dates,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Schedule exception submitted successfully:', result.data)
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to post schedule exception.'
          console.error('Failed to post schedule exception:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to post schedule exception. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },

    async addReview(payload) {
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 400,
          content: {
            rev_typ: 1,
            rec: payload.providerCode,
            rate: payload.rating,
            cont: payload.comment,
            src_code: 11,
            src_typ: 1,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Review added successfully:', result.data)
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to add review.'
          console.error('Failed to add review:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to add review. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },
    // Get a single provider by ID
    async fetchProviderReviews(payload) {
      console.log('Provider ID:', payload.providerCode);
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 410,
          content: {
            code: payload.providerCode,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Provider reviews fetched successfully:', result.data)
          this.providerReviews = result.data
          return { success: true, reviews: result.data }
        } else {
          this.error = result.msg || 'Failed to fetch provider reviews.'
          console.error('Failed to fetch provider reviews:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to fetch provider reviews. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },
    async submitBooking(bookingData) {

      console.log("Booking",bookingData);
      this.loading = true
      this.error = null
      try {
        const searchPayload = {
          tsp: '250314111358',
          ver: 1,
          act: 500,
          content: {
            prov_code: bookingData.provider.code,
            client_code: 11,
            sub_code: 10,
            loc: bookingData.location,
            descr: bookingData.task,
            dur: 6,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/gen/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(searchPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Booking submitted successfully:', result.data)
          return { success: true, categories: result.data }
        } else {
          this.error = result.msg || 'Failed to submit booking.'
          console.error('Failed to submit booking:', result.msg)
          return { success: false, categories: [], message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to submit booking. Please check your network connection.'
        console.error(err)
        return { success: false, categories: [], message: this.error }
      } finally {
        this.loading = false
      }
    },
  },
  getters: {},
})
