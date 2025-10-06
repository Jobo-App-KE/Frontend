// stores/app.js
import router from '@/router'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    schedule: [
      {
        day: 2,
        time: {
          str_time: '12:00',
          end_time: '18:00',
        },
      },
      {
        day: 3,
        time: {
          str_time: '12:00',
          end_time: '15:00',
        },
      },
      {
        day: 4,
        time: {
          str_time: '12:00',
          end_time: '17:30',
        },
      },
      {
        day: 5,
        time: {
          str_time: '12:00',
          end_time: '18:00',
        },
      },
      {
        day: 6,
        time: {
          str_time: '12:00',
          end_time: '18:00',
        },
      },
    ],
    loading: false,
    error: null,
  }),
  actions: {
    // Action to handle user signup/registration
    async clientSignup(payload) {
      console.log(payload)
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 10,
          content: {
            fname: payload.content.fname,
            lname: payload.content.lname,
            phone: payload.content.phone,
            email: payload.content.email,
            pwd: payload.content.password, // Correct field name
            lon: payload.content.lon,
            lat: payload.content.lat,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/reg/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(registrationPayload),
          },
        )

        const result = await response.json()
        console.log('Registration response:', result)
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

    async providerSignup(payload) {
      console.log(payload)
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 11,
          content: {
            fname: payload.content.fname,
            lname: payload.content.lname,
            phone: payload.content.phone,
            email: payload.content.email,
            pwd: payload.content.password, // Correct field name
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/reg/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(registrationPayload),
          },
        )

        const result = await response.json()
        console.log('Provider signup response:', result)
        if (result.stat === 0) {
          console.log('Provider signup successful:', result.msg)
          return { success: true, message: result.msg }
        } else {
          this.error = result.msg || 'Provider signup failed.'
          console.error('Provider signup failed:', result.msg)
          return { success: false, message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to submit provider signup. Please check your network connection.'
        console.error(err)
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async providerRegistration(payload) {
      console.log(payload)
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 12,
          content: {
            prov_code: payload.providerCode,
            sub_cat: 10,
            sub_typ: 0,
            rate: payload.rateType,
            charge: payload.charge,
            descr: payload.userBio,
            lon: '29.35968900',
            lat: '-3.36148800',
            img_data: '',
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/reg/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(registrationPayload),
          },
        )

        const result = await response.json()
        console.log('Provider Registration response:', result)
        if (result.stat === 0) {
          console.log('Provider Registration successful:', result.msg)
          return { success: true, message: result.msg }
        } else {
          this.error = result.msg || 'Registration failed.'
          console.error('Provider Registration failed:', result.msg)
          return { success: false, message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to submit provider registration. Please check your network connection.'
        console.error(err)
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async providerSchedule(payload) {
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 13,
          content: {
            prov_code: payload.providerCode,
            schedule: payload.schedule,
          },
        }

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/reg/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(registrationPayload),
          },
        )

        const result = await response.json()
        console.log('Provider Schedule response:', result)
        if (result.stat === 0) {
          console.log('Provider Schedule successful:', result.msg)
          return { success: true, message: result.msg }
        } else {
          this.error = result.msg || 'Provider Schedule failed.'
          console.error('Provider Schedule failed:', result.msg)
          return { success: false, message: this.error }
        }
      } catch (err) {
        this.error = 'Failed to submit Provider Schedule. Please check your network connection.'
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

        const corsProxyUrl = "https://proxy.corsfix.com/?"; // The proxy URL
        const targetUrl = `${import.meta.env.VITE_BASE_URL}/webapp/api/v1/${import.meta.env.VITE_lngid}/auth/service`;

        const authHeader = 'Basic ' + btoa('11264768:60-dayfreetrial');

        const response = await fetch(
          corsProxyUrl + targetUrl,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader,
            },
            body: JSON.stringify(loginPayload),
          },
        )

        const result = await response.json()
        if (result.stat === 0) {
          console.log('Login successful:', result.data)
          // TODO: You should save the token (result.data.tkn) to local storage or a secure cookie
          // You may also want to store other user data in the Pinia store here
          router.push('/')
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
  },
})
