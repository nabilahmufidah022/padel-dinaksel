<template>
  <div class="login-page">
    <div class="overlay"></div>

    <div class="card">
      <div class="logo-circle"><img src="@/assets/logo.png" alt="Logo Dinaksel" /></div>

      <h2>Admin Login</h2>
      <p class="subtitle">Sign in to manage the system</p>

      <form @submit.prevent="loginAdmin">
        <label>Username</label>
        <input v-model="username" placeholder="admin" />

        <label>Password</label>
        <input type="password" v-model="password" placeholder="••••••••" />

        <button type="submit" class="btn admin-btn">Login</button>
      </form>

      <p class="back">
        <router-link to="/login">← Back to User Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',

  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    loginAdmin() {
      // Dummy credential (nanti bisa ganti API)
      if (this.username === 'admin' && this.password === 'admin123') {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('role', 'admin')

        this.$router.push('/admin/dashboard')
      } else {
        alert('Admin credentials invalid')
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/auth.css';

.admin {
  color: #ff5a5f;
}

.admin-btn {
  background: #ff5a5f;
}
</style>
