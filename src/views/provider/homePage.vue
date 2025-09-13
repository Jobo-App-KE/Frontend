<template>
  <v-container>
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold text-green-darken-3">Hi Randy.</h1>
      <h2 class="text-h5 font-weight-bold text-grey-darken-2">Here's what's going on today.</h2>
    </div>

    <!-- Scheduled Tasks -->
    <h3 class="text-h6 font-weight-bold text-grey-darken-1 mb-4">TODAY'S SCHEDULED TASKS</h3>
    <v-row>
      <v-col v-for="(task, index) in scheduledTasks" :key="index" cols="12" md="6">
        <v-card class="pa-4 rounded-xl d-flex align-center">
          <div class="flex-grow-1">
            <div class="font-weight-bold">{{ task.title }}</div>
            <div class="text-caption text-grey-darken-1">{{ task.time }} in {{ task.location }}</div>
          </div>
          <v-avatar size="64">
            <v-img :src="task.clientImage"></v-img>
          </v-avatar>
        </v-card>
      </v-col>
    </v-row>

    <!-- Business Updates -->
    <h3 class="text-h6 font-weight-bold text-grey-darken-1 mt-8 mb-4">BUSINESS UPDATES</h3>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <MetricCard title="Reliability Rate" value="100%" color="green-darken-3" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <MetricCard title="Total Earnings" value="$155.31" color="blue-grey-darken-3"
          subtitle="You've made $19.91 in tips!" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <MetricCard title="New Messages" value="3" color="orange-darken-3" subtitle="1 unread message" />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <MetricCard title="New Reviews" value="1" color="purple-darken-3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import MetricCard from './components/metricCard.vue';

const scheduledTasks = ref([
  {
    title: 'Furniture Assembly',
    time: '5:00 pm',
    location: 'Downtown',
    clientImage: 'https://placehold.co/100x100/50C878/fff?text=W.W.',
  },
  {
    title: 'Online Shopping Delivery',
    time: '2:30 pm',
    location: 'Midtown',
    clientImage: 'https://placehold.co/100x100/50C878/fff?text=J.D.',
  },
]);
</script>
