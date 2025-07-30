// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Login from '../views/LoginPage.vue'
import Signup from '../views/SignupPage.vue'
import ProviderDetails from '../views/ProviderDetails.vue'
import ListedProviders from '../views/ListedProviders.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/provider-details/:id',
    name: 'ProviderDetails',
    component: ProviderDetails,
    props: true, // Allows passing route params as props to the component
  },
  {
    path: '/providers', // New route for listed providers
    name: 'ListedProviders',
    component: ListedProviders,
  },
  // You can add more routes here as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
