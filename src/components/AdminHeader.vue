<template>
  <header class="admin-navbar">
    <div class="admin-inner">
      <!-- LEFT -->
      <div class="admin-left">
        <span class="admin-badge">ADMIN</span>
        <h2>Dinaksel Panel</h2>
      </div>

      <!-- CENTER -->
      <nav class="admin-menu">
        <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
        <RouterLink to="/admin/courts">Courts</RouterLink>
        <RouterLink to="/admin/bookings">Bookings</RouterLink>
        <RouterLink to="/admin/users">Users</RouterLink>
      </nav>

      <!-- RIGHT -->
      <div class="admin-right">
        <span class="admin-name">Admin</span>
        <button class="logout-btn" @click="logoutAdmin">Logout</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',

  methods: {
    logoutAdmin() {
      localStorage.removeItem('isAdmin')
      this.$router.push('/admin/login')
    },
  },
}
</script>

<style scoped>
/* =========================
   ADMIN HEADER (USER-LIKE)
========================= */

.admin-navbar {
  width: 100%;
  height: 90px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  justify-content: center;

  background: #1e293b; /* beda di warna (dark slate) */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.admin-inner {
  width: 100%;
  max-width: 1300px;
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ===== LEFT ===== */
.admin-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.admin-badge {
  background: #22c55e;
  color: #022c22;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 10px;
}

.admin-left h2 {
  font-size: 18px;
  font-weight: 600;
  color: #f8fafc;
  margin: 0;
}

/* ===== CENTER MENU ===== */
.admin-menu {
  display: flex;
  align-items: center;
  gap: 36px;
}

.admin-menu a {
  font-size: 15px;
  font-weight: 500;
  color: #cbd5f5;
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
}

/* hover underline (mirip user header) */
.admin-menu a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #22c55e;
  transition: width 0.25s ease;
}

.admin-menu a:hover::after {
  width: 100%;
}

.admin-menu a:hover {
  color: #ffffff;
}

.admin-menu a.router-link-active {
  color: #22c55e;
  font-weight: 600;
}

.admin-menu a.router-link-active::after {
  width: 100%;
}

/* ===== RIGHT ===== */
.admin-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-name {
  font-size: 14px;
  font-weight: 500;
  color: #e5e7eb;
}

/* logout mirip user button */
.logout-btn {
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.25s ease;
}

.logout-btn:hover {
  background: #ef4444;
  color: white;
}
</style>
