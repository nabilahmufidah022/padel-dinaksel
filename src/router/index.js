import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/login/LoginView.vue'
import HomeView from '@/views/user/Home.vue'
import ListCourt from '@/views/user/ListCourt.vue'
import ListBooking from '@/views/user/ListBooking.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },

  {
    path: '/home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/book',
    component: ListCourt,
    meta: { requiresAuth: true },
  },
  {
    path: '/booking/:id',
    name: 'BookingDetail',
    component: () => import('@/views/user/BookingDetail.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/my-booking',
    component: ListBooking,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isDev = import.meta.env.DEV
  const isLoggedIn = isDev || localStorage.getItem('loggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
