import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import HomeView from '@/views/user/Home.vue'
import ListCourt from '@/views/user/ListCourt.vue'
import ListBooking from '@/views/user/ListBooking.vue'

import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/profile',
    component: () => import('@/views/user/Profile.vue'),
    meta: { role: 'admin' },
  },

  {
    path: '/home',
    component: HomeView,
    meta: { role: 'user' },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/book',
    component: ListCourt,
    meta: { role: 'user' },
  },
  {
    path: '/booking/:id',
    name: 'BookingDetail',
    component: () => import('@/views/user/BookingDetail.vue'),
    meta: { role: 'user' },
  },
  {
    path: '/my-booking',
    component: ListBooking,
    meta: { role: 'user' },
  },
  {
    path: '/booking-detail/:id',
    name: 'BookingViewDetail',
    component: () => import('@/views/user/BookingViewDetail.vue'),
    meta: { role: 'user' },
  },

  {
    path: '/admin/login',
    component: AdminLogin,
  },

  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { role: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isDev = import.meta.env.DEV
  const isLoggedIn = isDev || localStorage.getItem('loggedIn') === 'true'
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      return next('/login')
    }

    if (to.meta.role && to.meta.role !== role) {
      return next('/login')
    }
  }

  next()
})

export default router
