import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DestinationView from '../views/DestinationView.vue'
import BookingView from '../views/BookingView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/destinations/:slug', name: 'destination', component: DestinationView },
    { path: '/booking', name: 'booking', component: BookingView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
