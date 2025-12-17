<template>
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="navbar-inner">
      <!-- LEFT -->
      <div class="nav-left">
        <div class="logo-circle">
          <img src="@/assets/logo.png" />
        </div>
        <div class="logo-text">
          <h2>PT Dinaksel Padel Arena</h2>
          <span>Play Smart, Play Hard.</span>
        </div>
      </div>

      <!-- CENTER -->
      <nav class="nav-menu">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/book">List Court</RouterLink>
        <RouterLink to="/my-booking">My Bookings</RouterLink>
      </nav>

      <!-- RIGHT -->
      <div class="nav-right" ref="profileArea">
        <div class="profile-wrapper" @click="toggleProfile">
          <div class="user-circle">JD</div>
          <span class="username">John</span>
        </div>

        <div v-if="showProfile" class="profile-dropdown">
          <RouterLink to="/profile">My Account</RouterLink>
          <button class="logout" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      showProfile: false,
    }
  },

  methods: {
    toggleProfile() {
      this.showProfile = !this.showProfile
    },

    logout() {
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('role')
      this.$router.push('/login')
    },

    handleClickOutside(event) {
      if (!this.$refs.profileArea.contains(event.target)) {
        this.showProfile = false
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<style scoped>
@import '@/assets/header.css';
</style>
