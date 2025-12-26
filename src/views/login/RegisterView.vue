<template>
  <div class="login-page">
    <div class="overlay"></div>

    <div class="card">
      <!-- Logo -->
      <div class="logo-circle"><img src="@/assets/logo.png" alt="Logo Dinaksel" /></div>

      <h2>Create Account</h2>
      <p class="subtitle">Join and start booking your court</p>

      <form @submit.prevent="register">
        <label>Full Name</label>
        <input type="text" v-model="name" placeholder="Your full name" required />

        <label>Email</label>
        <input type="email" v-model="email" placeholder="your.email@example.com" required />

        <label>Password</label>
        <input type="password" v-model="password" placeholder="Create a password" required />

        <label>Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Repeat your password"
          required
        />

        <button type="submit" class="btn">Create Account</button>
      </form>

      <p class="create">
        Already have an account?
        <router-link to="/login">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },

  methods: {
    register() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      localStorage.setItem('user', JSON.stringify(user))
      alert('Account created successfully!')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
@import '@/assets/auth.css';
</style>
