<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold text-green-darken-3 mb-6">Set Availability</h1>
    <v-card class="pa-4 rounded-xl">
      <v-date-picker v-model="selectedDate" full-width color="green-darken-3"></v-date-picker>

      <div class="mt-8">
        <h2 class="text-h6 font-weight-bold mb-4">
          Availability for <span class="text-green-darken-3">{{ formattedDate }}</span>
        </h2>
        <p class="text-subtitle-1 text-grey-darken-1 mb-4">
          Select the time ranges when you are available.
        </p>

        <v-row>
          <v-col cols="12" sm="6">
            <v-list dense>
              <v-list-item v-for="time in morningHours" :key="time" class="mb-2">
                <v-checkbox v-model="selectedTimes" :value="time" :label="time" color="green-darken-3"
                  hide-details></v-checkbox>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="6">
            <v-list dense>
              <v-list-item v-for="time in afternoonHours" :key="time" class="mb-2">
                <v-checkbox v-model="selectedTimes" :value="time" :label="time" color="green-darken-3"
                  hide-details></v-checkbox>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <div class="mt-8 d-flex flex-wrap justify-space-between ga-2">
          <v-btn color="red-darken-3" variant="outlined" class="rounded-xl flex-grow-1 text-capitalize"
            @click="clearAvailability">
            Clear Availability
          </v-btn>
          <v-btn color="green-darken-3" variant="flat" class="rounded-xl flex-grow-1 text-capitalize"
            @click="saveAvailability">
            Save Availability
          </v-btn>
        </div>
        <div class="d-flex flex-wrap justify-space-between mt-4">
          <v-btn color="grey-darken-1" variant="text" class="rounded-xl text-capitalize">Turn off availability</v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedDate = ref(new Date());
const selectedTimes = ref([]);

const morningHours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
const afternoonHours = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

const formattedDate = computed(() => {
  if (!selectedDate.value) return 'Select a date';
  return selectedDate.value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
});

const clearAvailability = () => {
  selectedTimes.value = [];
  // You would also send an API call to clear the availability for the selected date
  console.log('Availability cleared for', formattedDate.value);
};

const saveAvailability = () => {
  // You would send an API call to save the selected times for the date
  console.log('Availability saved for', formattedDate.value, ':', selectedTimes.value);
};
</script>
