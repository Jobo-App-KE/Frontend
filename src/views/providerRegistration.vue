<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-card class="pa-4 mx-auto my-12" max-width="900" rounded="xl">
          <div class="d-flex align-center justify-center">
            <v-img
              src="https://assets-global.website-files.com/5f7203b5f3a7465691f4b825/5fa45330e255375d81b498b3_taskrabbit-logo.svg"
              max-height="40" class="mr-4"></v-img>
            <h1 class="text-h4 font-weight-bold">Provider Registration</h1>
          </div>
          <v-divider class="my-4"></v-divider>

          <v-stepper v-model="step" flat rounded="xl" class="transparent-bg">
            <v-stepper-header>
              <v-stepper-item :value="1" title="Profile Details" editable></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item :value="2" title="Services & Schedule"></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item :value="3" title="Payments & Verification"></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item :value="4" title="Confirm Details"></v-stepper-item>
            </v-stepper-header>

            <v-stepper-window>
              <v-stepper-window-item :value="1">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Update Profile</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" class="d-flex justify-center">
                        <v-avatar size="120">
                          <v-img :src="profilePic" alt="Profile Picture"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="userDetails.name" label="Full Name" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="userBio" label="User Bio Description" variant="outlined" rows="4"
                          rounded="lg" auto-grow></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="locationDetails" label="Location Details" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end mt-4">
                  <v-btn color="green-darken-2" class="text-capitalize px-8 py-6 rounded-lg" @click="step = 2">
                    <span class="font-weight-bold">Continue</span>
                  </v-btn>
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="2">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Services & Schedule</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-combobox v-model="servicesOffered" :items="availableServices" label="Services Offered"
                          multiple chips variant="outlined" rounded="lg"></v-combobox>
                      </v-col>
                      <v-col cols="12">
                        <v-select v-model="rateType" :items="['Per hour', 'Per day', 'Per week', 'Per month']"
                          label="Set Rates" variant="outlined" rounded="lg"></v-select>
                      </v-col>
                      <v-col cols="12">
                        <div class="text-subtitle-1 font-weight-bold mb-2">Set Schedule</div>
                        <v-checkbox v-for="day in daysOfWeek" :key="day.value" v-model="schedule.days" :label="day.text"
                          :value="day.value" hide-details></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <v-select v-model="schedule.hours" :items="['6am-6pm', '6am-8pm', '8am-6pm']" label="Hours"
                          variant="outlined" rounded="lg"></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="schedule.providerCode" label="Provider Code" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between mt-4">
                  <v-btn color="grey" @click="step = 1">Back</v-btn>
                  <v-btn color="green-darken-2" @click="step = 3">Continue</v-btn>
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="3">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Payments & Verification</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="paymentDetails.mpesaNumber" label="Mpesa Phone Number" variant="outlined"
                          rounded="lg"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input label="Upload ID" variant="outlined" rounded="lg" show-size></v-file-input>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input label="Upload Payment Verification" variant="outlined" rounded="lg"
                          show-size></v-file-input>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input label="Additional Certifications" variant="outlined" rounded="lg" show-size
                          multiple></v-file-input>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between mt-4">
                  <v-btn color="grey" @click="step = 2">Back</v-btn>
                  <v-btn color="green-darken-2" @click="step = 4">Continue</v-btn>
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="4">
                <v-card class="my-4" rounded="xl" variant="outlined">
                  <v-card-title>Confirm Details</v-card-title>
                  <v-card-text>
                    <div class="d-flex align-center mb-4">
                      <v-avatar size="64">
                        <v-img :src="profilePic" alt="Profile Picture"></v-img>
                      </v-avatar>
                      <div class="ml-4">
                        <div class="text-h6 font-weight-bold">{{ userDetails.name }}</div>
                        <div class="text-subtitle-1 text-grey-darken-1">{{ userBio }}</div>
                        <div class="text-body-2 text-grey-darken-1">{{ locationDetails }}</div>
                      </div>
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="text-subtitle-1 font-weight-bold">Services Offered</div>
                    <v-chip-group class="mb-4">
                      <v-chip v-for="service in servicesOffered" :key="service">{{ service }}</v-chip>
                    </v-chip-group>

                    <div class="text-subtitle-1 font-weight-bold">Rates & Schedule</div>
                    <div class="text-body-1">{{ rateType }}</div>
                    <div class="text-body-1">
                      <span class="font-weight-bold">Days:</span>
                      {{schedule.days.map(day => daysOfWeek.find(d => d.value === day).text).join(', ')}}
                    </div>
                    <div class="text-body-1">
                      <span class="font-weight-bold">Hours:</span>
                      {{ schedule.hours }}
                    </div>
                    <div class="text-body-1">
                      <span class="font-weight-bold">Provider Code:</span>
                      {{ schedule.providerCode }}
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="text-subtitle-1 font-weight-bold">Payment Details</div>
                    <div class="text-body-1">
                      <span class="font-weight-bold">Mpesa Number:</span>
                      {{ paymentDetails.mpesaNumber }}
                    </div>

                  </v-card-text>
                </v-card>
                <div class="d-flex justify-space-between mt-4">
                  <v-btn color="grey" @click="step = 3">Back</v-btn>
                  <v-btn color="green-darken-2" class="text-capitalize px-8 py-6 rounded-lg">
                    <span class="font-weight-bold">Submit</span>
                  </v-btn>
                </div>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      profilePic: 'https://cdn.vuetifyjs.com/images/john-smirk.png',
      userDetails: {
        name: 'John Doe'
      },
      userBio: 'Experienced provider specializing in furniture assembly and general home repair.',
      locationDetails: 'Nairobi, Kenya',
      availableServices: ['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Gardening'],
      servicesOffered: ['Plumbing', 'Electrical'],
      rateType: 'Per hour',
      schedule: {
        providerCode: 'PROV123',
        days: [1, 3, 5],
        hours: '8am-6pm'
      },
      daysOfWeek: [
        { text: 'Sunday', value: 0 },
        { text: 'Monday', value: 1 },
        { text: 'Tuesday', value: 2 },
        { text: 'Wednesday', value: 3 },
        { text: 'Thursday', value: 4 },
        { text: 'Friday', value: 5 },
        { text: 'Saturday', value: 6 },
      ],
      paymentDetails: {
        mpesaNumber: '0712345678'
      },
    };
  },
};
</script>

<style scoped>
.transparent-bg {
  background-color: transparent !important;
}
</style>
