<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app color="green-darken-3">
      <v-list dense nav>
        <v-list-item class="mb-4">
          <v-avatar size="64" class="ma-auto d-block">
            <v-img src="https://placehold.co/100x100/A3BE8C/fff?text=R.R." alt="Randy R."></v-img>
          </v-avatar>
        </v-list-item>
        <v-list-item v-for="item in navItems" :key="item.title" :value="item.component"
          @click="currentPageComponent = item.component" class="rounded-xl my-2"
          :class="{ 'v-list-item--active': currentPageComponent === item.component }">
          <v-list-item-title class="text-white">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app flat color="green-lighten-2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">JobO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid class="pa-4">
        <component :is="currentPageComponent" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

// Dynamically import pages as separate components
const Home = defineAsyncComponent(() => import('./homePage.vue'));
const Tasks = defineAsyncComponent(() => import('./tasksPage.vue'));
const Availability = defineAsyncComponent(() => import('./availabilityPage.vue'));
const MyBusiness = defineAsyncComponent(() => import('./myBusiness.vue'));
const Profile = defineAsyncComponent(() => import('./providerProfile.vue'));

const drawer = ref(true);
const currentPageComponent = ref(Home);

const navItems = [
  { title: 'Home', component: Home },
  { title: 'Tasks', component: Tasks },
  { title: 'Availability', component: Availability },
  { title: 'My Business', component: MyBusiness },
  { title: 'Profile', component: Profile },
];
</script>

<style scoped>
.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
