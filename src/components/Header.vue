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
      localStorage.clear()
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 100;
  display: flex;
  justify-content: center;
}

/* ===== NAVBAR INNER (INI KUNCINYA) ===== */
.navbar-inner {
  width: 100%;
  max-width: 1280px; /* 🔥 BIKIN SEMUA RAPI */
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ===== LEFT ===== */
.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.logo-circle img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text h2 {
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
}

.logo-text span {
  font-size: 13px;
  color: #a7d763;
}

/* ===== CENTER MENU ===== */
.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-menu a {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
}

.nav-menu a.router-link-exact-active {
  background: #a7d763;
  color: #1c4b1c;
}

/* ===== RIGHT ===== */
.nav-right {
  position: relative;
}

.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #a7d763;
  color: #235b13;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.username {
  font-weight: 600;
  white-space: nowrap;
}

/* ===== DROPDOWN ===== */
.profile-dropdown {
  position: absolute;
  top: 56px;
  right: 0;
  background: #fff;
  width: 180px;
  padding: 8px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.profile-dropdown a,
.logout {
  padding: 10px 14px;
  display: block;
  border-radius: 10px;
  font-weight: 600;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

.logout {
  color: #d9534f;
}
</style>
