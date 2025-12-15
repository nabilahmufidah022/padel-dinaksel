<template>
  <div class="login-page">
    <!-- Overlay Background -->
    <div class="overlay"></div>

    <!-- Login Card -->
    <div class="card">
      <!-- Logo -->
      <div class="logo">DOY</div>

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
        <a href="#">Create Account</a>
      </p>
    </div>

    <!-- Admin Login Button -->
    <button class="admin-login">Admin Login ❔</button>
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
      localStorage.setItem('loggedIn', 'true')
      this.$router.push('/home')
    },
  },
}
</script>

<style>
/* Background */
.login-page {
  width: 100vw;
  height: 100vh;
  background-image: url('/images/padel-bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Arial, sans-serif;
  overflow: hidden;
}

/* Overlay gradient */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 90, 60, 0.6), rgba(0, 150, 50, 0.6));
}

/* Card */
.card {
  position: relative;
  z-index: 10;
  width: 380px;
  padding: 35px 40px;
  background: #fff;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 70px;
  margin: 0 auto 15px;
  padding: 15px 0;
  background: #d7f2d7;
  border-radius: 15px;
  font-weight: bold;
  font-size: 22px;
  color: #2f6c2f;
}

h2 {
  margin: 10px 0 0;
  color: #333;
}

.subtitle {
  color: gray;
  font-size: 14px;
  margin-bottom: 25px;
}

/* Form */
label {
  display: block;
  text-align: left;
  margin: 10px 0 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  margin-bottom: 10px;
}

.password-wrapper {
  position: relative;
}

.password-wrapper .eye {
  position: absolute;
  right: 12px;
  top: 10px;
  cursor: pointer;
  color: gray;
}

/* Remember & Forgot */
.options {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 25px;
  font-size: 14px;
}

.forgot {
  color: #3b7f22;
  text-decoration: none;
}

.btn {
  width: 100%;
  padding: 12px;
  background: #72c020;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.btn:hover {
  background: #5aa216;
}

/* Divider */
.divider {
  margin: 25px 0;
  border-top: 1px solid #ccc;
  position: relative;
}

.divider span {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
  background: white;
  font-size: 12px;
  color: gray;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.social {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-weight: bold;
}

.social:hover {
  background: #f0f0f0;
}

/* Create Account */
.create {
  margin-top: 20px;
  font-size: 14px;
}

.create a {
  color: #3b7f22;
  text-decoration: none;
}

/* Admin Login Button */
.admin-login {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: none;
  padding: 10px 18px;
  border-radius: 30px;
  color: white;
  cursor: pointer;
}
</style>
