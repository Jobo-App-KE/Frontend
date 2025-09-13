<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold text-green-darken-3 mb-6">My Business</h1>

    <!-- February Earnings Card -->
    <MetricsCard title="February Earnings" :metrics="[
      { value: '$155.31', label: 'TOTAL EARNED' },
      { value: '4', label: 'TASK COUNT' },
    ]" @click="openDialog('earnings')" />

    <!-- Current Metrics Card -->
    <MetricsCard title="Current Metrics" :metrics="[
      { value: '100%', label: 'RESPONSE' },
      { value: '100%', label: 'ACCEPTANCE' },
      { value: '100%', label: 'RELIABILITY' },
    ]" note="Excellent work keeping your Clients..." @click="openDialog('metrics')" />

    <!-- Ratings & Reviews Card -->
    <MetricsCard title="Ratings & Reviews" :metrics="[
      { value: '100%', label: 'POSITIVE REVIEWS' },
      { value: '4', label: 'REVIEW COUNT' },
    ]" @click="openDialog('ratings')" />

    <!-- Skills & Rates Card -->
    <MetricsCard title="Skills & Rates" :metrics="[
      { value: '10', label: 'SKILLS' },
    ]" note="9 of your rates can be optimized to help your business" @click="openDialog('skills')" />

    <!-- Elite Status -->
    <v-card class="pa-4 rounded-xl mb-6" @click="openDialog('elite')">
      <div class="d-flex justify-space-between align-center">
        <h2 class="text-h6 font-weight-bold text-green-darken-3">February Elite Status</h2>
        <v-icon color="green-darken-3">mdi-chevron-right</v-icon>
      </div>
      <div class="d-flex align-center mt-4">
        <v-icon size="40" color="green-darken-3" class="mr-4">mdi-medal-outline</v-icon>
        <div>
          <h3 class="text-body-1 font-weight-bold">Become Elite and earn up to 3x more money!</h3>
          <p class="text-caption text-grey-darken-1">Learn about the exclusive benefits you receive and how you can join
            our community of Elite Taskers.</p>
        </div>
      </div>
    </v-card>

    <!-- Main Dialog -->
    <v-dialog v-model="dialog" fullscreen>
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-space-between align-center text-h5 font-weight-bold">
          {{ dialogTitle }}
          <v-btn icon @click="dialog = false" flat>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="dialogContent" v-html="dialogContent"></div>
          <div v-if="dialogType === 'earnings'">
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl">
                  <div class="text-h5 font-weight-bold text-green-darken-3">{{ earningsData.totalEarned }}</div>
                  <div class="text-subtitle-1 text-grey-darken-1">Total Earned</div>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl">
                  <div class="text-h5 font-weight-bold text-green-darken-3">{{ earningsData.taskCount }}</div>
                  <div class="text-subtitle-1 text-grey-darken-1">Tasks Completed</div>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl">
                  <div class="text-h5 font-weight-bold text-green-darken-3">{{ earningsData.tips }}</div>
                  <div class="text-subtitle-1 text-grey-darken-1">Tips</div>
                </v-card>
              </v-col>
            </v-row>
            <h2 class="text-h6 font-weight-bold text-green-darken-3 mt-8 mb-4">Client Payments</h2>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Client</th>
                  <th class="text-left">Date</th>
                  <th class="text-left">Amount Paid</th>
                  <th class="text-left">Task</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(payment, index) in earningsData.payments" :key="index">
                  <td>{{ payment.client }}</td>
                  <td>{{ payment.date }}</td>
                  <td>${{ payment.amount }}</td>
                  <td>{{ payment.task }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-if="dialogType === 'skills'">
            <v-btn color="green-darken-3" class="mb-4" @click="openAddDialog">Add Skill</v-btn>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Skill</th>
                  <th class="text-left">Rate ($/hr)</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(skill, index) in skillsAndRates" :key="index">
                  <td>{{ skill.name }}</td>
                  <td>${{ skill.rate }}</td>
                  <td>
                    <v-btn icon size="small" flat @click="openEditDialog(skill)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-if="dialogType === 'ratings'">
            <v-row class="mb-4">
              <!-- Average Rating Card -->
              <v-col cols="12" md="6">
                <v-card class="pa-4 rounded-xl">
                  <div class="text-h4 font-weight-bold text-green-darken-3">{{ ratingsData.averageRating }}</div>
                  <div class="text-subtitle-1 text-grey-darken-1">Average Rating</div>
                </v-card>
              </v-col>
              <!-- Reviews Count Card -->
              <v-col cols="12" md="6">
                <v-card class="pa-4 rounded-xl">
                  <div class="text-h4 font-weight-bold text-green-darken-3">{{ ratingsData.reviewCount }}</div>
                  <div class="text-subtitle-1 text-grey-darken-1">Reviews</div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-for="(review, index) in ratingsData.reviews" :key="index" cols="12">
                <v-card class="pa-4 rounded-xl mb-4">
                  <div class="d-flex align-center">
                    <span class="font-weight-bold mr-2">{{ review.name }}</span>
                    <v-rating :model-value="review.rating" readonly density="compact"
                      color="yellow-darken-2"></v-rating>
                  </div>
                  <div class="text-caption text-grey-darken-1 mb-2">{{ review.date }}</div>
                  <p>{{ review.text }}</p>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-if="dialogType === 'metrics'">
            <v-row>
              <v-col cols="12" md="6" v-for="(metric, index) in metricsData.detailed" :key="index">
                <v-card class="pa-4 rounded-xl">
                  <div class="text-h5 font-weight-bold text-green-darken-3">{{ metric.value }}</div>
                  <div class="text-subtitle-1 text-grey-darken-1">{{ metric.label }}</div>
                  <p class="text-caption text-grey-darken-1 mt-2">{{ metric.note }}</p>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-if="dialogType === 'elite'">
            <v-card class="pa-4 rounded-xl mb-6">
              <h3 class="text-h6 font-weight-bold">Current Status:</h3>
              <p class="text-body-1 mt-2">You are currently **Not Elite**. Become an Elite Tasker to unlock exclusive
                benefits like priority support, higher search visibility, and up to 3x more money on tasks. You can
                achieve Elite status by maintaining high ratings and reliability.</p>
            </v-card>
            <h2 class="text-h6 font-weight-bold text-green-darken-3 mt-8 mb-4">Upgrade Your Plan</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl text-center">
                  <v-icon size="40" color="brown lighten-1">mdi-star</v-icon>
                  <div class="text-h6 font-weight-bold mt-2">Basic</div>
                  <div class="text-caption text-grey-darken-1">Perfect for getting started</div>
                  <v-btn color="brown lighten-1" class="mt-4" block>Choose Plan</v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl text-center">
                  <v-icon size="40" color="blue-grey lighten-1">mdi-star</v-icon>
                  <div class="text-h6 font-weight-bold mt-2">Standard</div>
                  <div class="text-caption text-grey-darken-1">Expanded benefits for growth</div>
                  <v-btn color="blue-grey lighten-1" class="mt-4" block>Choose Plan</v-btn>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 rounded-xl text-center">
                  <v-icon size="40" color="yellow-darken-2">mdi-star</v-icon>
                  <div class="text-h6 font-weight-bold mt-2">Elite</div>
                  <div class="text-caption text-grey-darken-1">Premium benefits for top earners</div>
                  <v-btn color="yellow-darken-2" class="mt-4" block>Choose Plan</v-btn>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-3" variant="text" @click="dialog = false" class="text-capitalize">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Skill Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-space-between align-center">
          <h3 class="text-h6 font-weight-bold">Edit Skill</h3>
          <v-btn icon @click="editDialog = false" flat>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editSkill.name" label="Skill Name" variant="outlined" class="mb-4"></v-text-field>
          <v-text-field v-model="editSkill.rate" label="Rate ($/hr)" variant="outlined" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-3" variant="text" @click="editDialog = false" class="text-capitalize">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Skill Dialog -->
    <v-dialog v-model="addDialog" max-width="500">
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-space-between align-center">
          <h3 class="text-h6 font-weight-bold">Add Skill</h3>
          <v-btn icon @click="addDialog = false" flat>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="addSkill.name" label="Skill Name" variant="outlined" class="mb-4"></v-text-field>
          <v-text-field v-model="addSkill.rate" label="Rate ($/hr)" variant="outlined" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-3" variant="text" @click="addDialog = false" class="text-capitalize">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import MetricsCard from './components/businessMetricsCard.vue';

const dialog = ref(false);
const dialogTitle = ref('');
const dialogContent = ref('');
const dialogType = ref('');

const editDialog = ref(false);
const editSkill = ref({});

const addDialog = ref(false);
const addSkill = ref({ name: '', rate: null });

const skillsAndRates = ref([
  { name: 'Furniture Assembly', rate: 45 },
  { name: 'Mounting & Installation', rate: 50 },
  { name: 'Help Moving', rate: 40 },
  { name: 'Online Shopping', rate: 35 },
  { name: 'Cleaning', rate: 30 },
]);

const ratingsData = ref({
  averageRating: '4.8',
  reviewCount: 4,
  reviews: [
    { name: 'John Doe', rating: 5, date: 'Feb 15, 2025', text: 'Randy was fantastic! Fast and professional.' },
    { name: 'Jane Smith', rating: 5, date: 'Feb 12, 2025', text: 'Couldn\'t have done it without him. Highly recommend.' },
    { name: 'Tim Brown', rating: 4, date: 'Feb 08, 2025', text: 'Great communication and very reliable.' },
    { name: 'Sarah Parker', rating: 5, date: 'Feb 02, 2025', text: 'A true professional. Arrived on time and did a great job.' },
  ]
});

const metricsData = ref({
  detailed: [
    { value: '100%', label: 'Response Rate', note: 'Your response rate is excellent. Keep it up!' },
    { value: '100%', label: 'Acceptance Rate', note: 'You\'re accepting all tasks. Great for business!' },
    { value: '100%', label: 'Reliability Rate', note: 'You\'ve completed every task on time. Perfect!' },
    { value: '11', label: 'Tasks Completed', note: 'Total tasks completed in the last 30 days.' },
    { value: '5', label: 'New Clients', note: 'You have acquired 5 new clients in the last month.' }
  ]
});

const earningsData = ref({
  totalEarned: '$155.31',
  taskCount: 4,
  tips: '$19.91',
  payments: [
    { client: 'Michael', date: 'Feb 20, 2025', amount: 85.00, task: 'Furniture Assembly' },
    { client: 'Jessica', date: 'Feb 18, 2025', amount: 55.50, task: 'Mounting & Installation' },
    { client: 'Chris', date: 'Feb 15, 2025', amount: 33.85, task: 'Help Moving' },
    { client: 'David', date: 'Feb 10, 2025', amount: 67.04, task: 'Online Shopping' },
  ]
});

const openDialog = (type) => {
  dialogType.value = type;
  switch (type) {
    case 'earnings':
      dialogTitle.value = 'February Earnings';
      dialogContent.value = '';
      break;
    case 'metrics':
      dialogTitle.value = 'Current Metrics';
      dialogContent.value = '';
      break;
    case 'ratings':
      dialogTitle.value = 'Ratings & Reviews';
      dialogContent.value = ''; // Content is handled by the template
      break;
    case 'skills':
      dialogTitle.value = 'Skills & Rates';
      dialogContent.value = ''; // Content is handled by the table
      break;
    case 'elite':
      dialogTitle.value = 'Elite Status';
      dialogContent.value = ''; // Content is handled by the template
      break;
  }
  dialog.value = true;
};

const openEditDialog = (skill) => {
  editSkill.value = { ...skill };
  editDialog.value = true;
};

const openAddDialog = () => {
  addSkill.value = { name: '', rate: null };
  addDialog.value = true;
};
</script>
