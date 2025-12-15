import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/login/LoginView.vue'
import HomeView from '@/views/Home.vue'
import ListCourt from '@/views/ListCourt.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isDev = import.meta.env.DEV
  const isLoggedIn = isDev || localStorage.getItem('loggedIn') === 'true'
  console.log('to:', to.path, 'loggedIn:', isLoggedIn, 'isDev:', isDev)

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
