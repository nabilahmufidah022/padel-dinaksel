import { createRouter, createWebHistory } from 'vue-router'

// public
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'

// user
import HomeView from '@/views/user/Home.vue'
import ListCourt from '@/views/user/ListCourt.vue'
import ListBooking from '@/views/user/ListBooking.vue'
import ProfileView from '@/views/user/Profile.vue'

// admin
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminCourtForm from '@/views/admin/AdminCourtForm.vue'

const routes = [
  // ===== PUBLIC =====
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/admin/login', component: AdminLogin },

  // ===== USER =====
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout.vue'),
    meta: { requiresAuth: true, role: 'user' },
    children: [
      { path: 'home', component: HomeView },
      { path: 'book', component: ListCourt },
      { path: 'my-booking', component: ListBooking },
      { path: 'profile', component: ProfileView },
      {
        path: 'booking/:id',
        component: () => import('@/views/user/BookingDetail.vue'),
      },
    ],
  },

  // ===== ADMIN =====
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      {
        path: 'courts',
        component: () => import('@/views/admin/AdminCourtList.vue'),
      },
      {
        path: 'courts/create',
        component: AdminCourtForm,
      },
      {
        path: 'courts/:id/edit',
        component: AdminCourtForm,
        props: true,
      },
      {
        path: 'bookings',
        component: () => import('@/views/admin/AdminBookings.vue'),
      },
      {
        path: 'users',
        component: () => import('@/views/admin/AdminUsers.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ===== AUTH GUARD =====
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  const role = localStorage.getItem('role')

  if (!to.meta.requiresAuth) return next()

  if (!loggedIn) return next('/login')

  if (to.meta.role && to.meta.role !== role) {
    return next('/login')
  }

  next()
})

export default router
