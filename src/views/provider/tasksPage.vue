<template>
  <v-container>
    <div class="mb-6 d-flex justify-space-between align-center">
      <h1 class="text-h4 font-weight-bold text-green-darken-3">My Tasks</h1>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="green-darken-3" variant="outlined" prepend-icon="mdi-sort" class="rounded-xl text-capitalize"
            v-bind="props">
            Sort By
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(sort, index) in sortOptions" :key="index" @click="sortBy = sort.value">
            <v-list-item-title>{{ sort.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-tabs v-model="tab" color="green-darken-3" slider-color="green-darken-3">
      <v-tab value="current" class="text-capitalize">Current</v-tab>
      <v-tab value="past" class="text-capitalize">Past</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="current">
        <v-row class="mt-4">
          <v-col v-for="(task, index) in sortedTasks.current" :key="index" cols="12">
            <TaskCard :task="task" />
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item value="past">
        <v-row class="mt-4">
          <v-col v-for="(task, index) in sortedTasks.past" :key="index" cols="12">
            <TaskCard :task="task" />
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import TaskCard from './components/taskCard.vue';

const tab = ref('current');
const sortBy = ref(null);

const allTasks = ref({
  current: [
    { name: 'Help Moving', date: 'Feb 19, 2025', location: 'Golden Gate Park', invoiced: 33.85, client: 'Paul P.', clientImage: 'https://placehold.co/100x100/50C878/fff?text=P.P.' },
    { name: 'Online Shopping', date: 'Feb 20, 2025', location: 'Downtown', invoiced: 67.04, client: 'Willy W.', clientImage: 'https://placehold.co/100x100/50C878/fff?text=W.W.' },
  ],
  past: [
    { name: 'Furniture Assembly', date: 'Jan 15, 2025', location: 'Lydam 402', invoiced: 85.00, client: 'Jane D.', clientImage: 'https://placehold.co/100x100/50C878/fff?text=J.D.' },
    { name: 'Mounting & Installation', date: 'Jan 10, 2025', location: 'Manchester', invoiced: 55.50, client: 'Tim B.', clientImage: 'https://placehold.co/100x100/50C878/fff?text=T.B.' },
  ],
});

const sortOptions = [
  { text: 'Date (newest first)', value: 'date-desc' },
  { text: 'Date (oldest first)', value: 'date-asc' },
  { text: 'Client Name (A-Z)', value: 'name-asc' },
  { text: 'Client Name (Z-A)', value: 'name-desc' },
  { text: 'Invoiced Amount (highest first)', value: 'amount-desc' },
  { text: 'Invoiced Amount (lowest first)', value: 'amount-asc' },
];

const sortedTasks = computed(() => {
  const current = [...allTasks.value.current];
  const past = [...allTasks.value.past];

  const sortFunction = (a, b) => {
    switch (sortBy.value) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'name-asc':
        return a.client.localeCompare(b.client);
      case 'name-desc':
        return b.client.localeCompare(a.client);
      case 'amount-asc':
        return a.invoiced - b.invoiced;
      case 'amount-desc':
        return b.invoiced - a.invoiced;
      default:
        return 0;
    }
  };

  return {
    current: current.sort(sortFunction),
    past: past.sort(sortFunction),
  };
});
</script>
