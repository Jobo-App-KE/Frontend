// stores/app.js
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

        const response = await fetch(
          `${import.meta.env.BASE_URL}/webapp/api/v1/${import.meta.env.lngid}/reg/service`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 11,
          content: {
            fname: payload.fname,
            lname: payload.lname,
            phone: payload.phone,
            email: payload.email,
            pwd: payload.password, // Correct field name
          },
        }

        const response = await fetch(
          `${import.meta.env.BASE_URL}/webapp/api/v1/${import.meta.env.lngid}/reg/service`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
      this.loading = true
      this.error = null
      try {
        const registrationPayload = {
          tsp: '250314111358', // Timestamp/placeholder
          ver: 1,
          act: 12,
          content: {
            prov_code: payload.prov_code,
            sub_cat: payload.sub_cat,
            sub_typ: payload.sub_typ,
            rate: payload.rate,
            charge: payload.charge,
            descr: payload.descr,
            lon: payload.lon,
            lat: payload.lat,
            img_data: payload.img_data,
          },
        }

        const response = await fetch(
          `${import.meta.env.BASE_URL}/webapp/api/v1/${import.meta.env.lngid}/reg/service`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            prov_code: payload.prov_code,
            schedule: payload.schedule,
          },
        }

        const response = await fetch(
          `${import.meta.env.BASE_URL}/webapp/api/v1/${import.meta.env.lngid}/reg/service`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

        const response = await fetch(
          `${import.meta.env.BASE_URL}/webapp/api/v1/${import.meta.env.lngid}/auth/service `,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginPayload),
          },
        )

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
  },
})
