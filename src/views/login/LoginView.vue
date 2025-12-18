<template>
  <div class="login-page">
    <!-- Overlay Background -->
    <div class="overlay"></div>

    <!-- Login Card -->
    <div class="card">
      <!-- Logo -->
      <div class="logo-circle"><img src="@/assets/logo.png" alt="Logo Dinaksel" /></div>

      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to book your favorite court</p>

      <form @submit.prevent="login">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="your.email@example.com" />

        <label>Password</label>
        <div class="password-wrapper">
          <input type="password" v-model="password" placeholder="Enter your password" />
          <span class="eye">👁️</span>
        </div>

        <div class="options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#" class="forgot">Forgot password?</a>
        </div>

        <button type="submit" class="btn">Sign In</button>
      </form>

      <div class="divider">
        <span>OR CONTINUE WITH</span>
      </div>

      <div class="social-buttons">
        <button class="social google">Google</button>
        <button class="social apple">Apple</button>
      </div>

      <p class="create">
        Don’t have an account?
        <router-link to="/register">Create Account</router-link>
      </p>
    </div>

    <!-- Admin Login Button -->
    <button class="admin-login" @click="$router.push('/admin/login')">Admin Login ❔</button>
  </div>
</template>

<script>
export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    login() {
      const user = JSON.parse(localStorage.getItem('user'))

      if (user && user.email === this.email && user.password === this.password) {
        // ✅ INI WAJIB
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('role', 'user')

        // redirect ke halaman user
        this.$router.push('/user/home')
      } else {
        alert('Email atau password salah')
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/auth.css';
</style>
