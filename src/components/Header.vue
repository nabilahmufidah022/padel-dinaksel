<template>
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="nav-left">
      <div class="logo-circle"><img src="@/assets/logo.png" alt="Logo Dinaksel" /></div>
      <div class="logo-text">
        <h2>PT Dinaksel Padel Arena</h2>
        <span>Play Smart, Play Hard.</span>
      </div>
    </div>

    <nav class="nav-menu">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/book">List Court</RouterLink>
      <router-link to="/my-booking">My Bookings</router-link>
    </nav>

    <div class="nav-right">
      <div class="user-circle">JD</div>
      <span class="username">John</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.home-page {
  margin-top: 90px;
  background: #f9f9f9;
}

/* NAVBAR */
.navbar {
  height: 90px;
  width: 100%;
  padding: 0 40px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LEFT */
.nav-left {
  display: flex;
  align-items: center; /* 🔥 bikin sejajar vertikal */
  gap: 12px;
}

/* LOGO */
.logo-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0; /* 🔥 cegah logo mengecil / dorong teks */
}

.logo-circle img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-text h2 {
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
}

.logo-text span {
  font-size: 13px;
  color: #a7d763;
}

/* CENTER MENU */
.nav-menu {
  display: flex;
  gap: 28px;
}

.nav-menu a {
  font-weight: 600;
  font-size: 15px;
  color: #333;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-menu a:hover {
  background: #a7d763;
}

.nav-menu a.router-link-exact-active {
  background: #a7d763;
  color: #1c4b1c;
}

/* RIGHT */
.nav-right {
  display: flex;
  align-items: center;
  gap: 40px;
}

.user-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #a7d763;
  color: #235b13;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}

.username {
  font-weight: 600;
  color: #333;
}
</style>
