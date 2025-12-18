<template>
  <div class="dashboard-page">
    <header class="dashboard-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin 👋</p>
      </div>
      <div>
        <router-link to="/admin/bookings" class="btn">View All Bookings</router-link>
      </div>
    </header>

    <section class="stats-grid">
      <div class="stat-card">
        <h4>Total Courts</h4>
        <strong>{{ totalCourts }}</strong>
      </div>

      <div class="stat-card">
        <h4>Available Courts</h4>
        <strong>{{ availableCourtsCount }}</strong>
      </div>

      <div class="stat-card">
        <h4>Total Bookings</h4>
        <strong>{{ totalBookings }}</strong>
      </div>

      <div class="stat-card">
        <h4>Pending Bookings</h4>
        <strong>{{ pendingBookingsCount }}</strong>
      </div>
    </section>

    <section class="recent-bookings">
      <h3>Recent Bookings</h3>
      <div v-if="recentBookings.length === 0" class="empty">No bookings yet</div>
      <table v-else class="bookings-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Court</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in recentBookings" :key="b.bookingId">
            <td>{{ b.bookingId }}</td>
            <td>{{ b.courtName }}</td>
            <td>{{ b.date }}</td>
            <td>{{ b.time }}</td>
            <td>
              <span :class="['badge', b.status]">{{ b.status }}</span>
            </td>
            <td><button class="btn-sm" @click="viewBooking(b.bookingId)">View</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { useBookingsStore } from '@/stores/bookings'
import { useCourtsStore } from '@/stores/courts'

export default {
  name: 'AdminDashboard',

  data() {
    return {
      bookingsStore: null,
      courtsStore: null,
    }
  },

  computed: {
    totalCourts() {
      return this.courtsStore ? this.courtsStore.courts.length : 0
    },

    availableCourtsCount() {
      return this.courtsStore ? this.courtsStore.courts.filter((c) => c.available).length : 0
    },

    totalBookings() {
      return this.bookingsStore ? this.bookingsStore.bookings.length : 0
    },

    pendingBookingsCount() {
      return this.bookingsStore
        ? this.bookingsStore.bookings.filter((b) => b.status === 'pending').length
        : 0
    },

    recentBookings() {
      if (!this.bookingsStore) return []
      return [...this.bookingsStore.bookings].slice(-6).reverse()
    },
  },

  mounted() {
    this.bookingsStore = useBookingsStore()
    this.courtsStore = useCourtsStore()
    this.bookingsStore.load()
    this.courtsStore.load()
  },

  methods: {
    viewBooking(id) {
      this.$router.push(`/admin/bookings/${id}`)
    },
  },
}
</script>

<style scoped>
.dashboard-page {
  padding: 28px 36px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 22px;
}

.stat-card {
  background: #fff;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.stat-card h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.stat-card strong {
  font-size: 22px;
}

.recent-bookings {
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
}

.bookings-table th,
.bookings-table td {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid #f0f0f0;
}

.badge {
  padding: 6px 10px;
  border-radius: 999px;
  text-transform: capitalize;
}

.badge.pending {
  background: #fff3cd;
  color: #856404;
}
.badge.confirmed {
  background: #d4edda;
  color: #155724;
}
.badge.rejected {
  background: #f8d7da;
  color: #721c24;
}

.btn {
  background: #0f5132;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
}
.btn-sm {
  padding: 6px 8px;
  border-radius: 6px;
}

@media (max-width: 800px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
