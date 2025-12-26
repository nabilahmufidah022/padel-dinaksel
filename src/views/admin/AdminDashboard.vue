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

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <header class="modal-header">
          <h3>Detail Booking</h3>
          <button class="modal-close" @click="closeModal">×</button>
        </header>

        <div class="modal-body">
          <div v-if="selectedBooking">
            <p><strong>Lapangan:</strong> {{ selectedBooking.courtName }}</p>
            <p><strong>Booking ID:</strong> {{ selectedBooking.bookingId }}</p>
            <p><strong>Tanggal:</strong> {{ selectedBooking.date }}</p>
            <p><strong>Waktu:</strong> {{ selectedBooking.time }}</p>
            <p><strong>Durasi:</strong> {{ selectedBooking.duration }} jam</p>
            <p><strong>Total:</strong> Rp {{ selectedBooking.total.toLocaleString('id-ID') }}</p>
            <p>
              <strong>Status:</strong>
              <span :class="['badge', selectedBooking.status]">{{ selectedBooking.status }}</span>
            </p>

            <div v-if="selectedBooking.paymentProof" style="margin-top: 12px">
              <h4 style="margin: 8px 0 6px">Bukti Pembayaran</h4>
              <div style="display: flex; align-items: center; gap: 12px">
                <img
                  :src="selectedBooking.paymentProof"
                  alt="bukti"
                  class="modal-payment-img"
                  style="cursor: pointer"
                  @click="openImageLightbox(selectedBooking.paymentProof)"
                />
                <div style="font-size: 14px; color: #555">
                  {{ selectedBooking.paymentFileName }}
                </div>
              </div>
            </div>
            <div v-if="selectedBooking.note">
              <strong>Catatan:</strong>
              <p>{{ selectedBooking.note }}</p>
            </div>
          </div>
          <div v-else>Booking tidak ditemukan.</div>
        </div>

        <footer class="modal-footer">
          <button
            v-if="selectedBooking && selectedBooking.status === 'pending'"
            class="btn confirm"
            @click="confirm(selectedBooking.bookingId)"
          >
            Confirm
          </button>
          <button
            v-if="selectedBooking && selectedBooking.status === 'pending'"
            class="btn reject"
            @click="reject(selectedBooking.bookingId)"
          >
            Reject
          </button>
          <button class="btn" @click="closeModal">Close</button>
        </footer>
      </div>
    </div>

    <!-- IMAGE LIGHTBOX -->
    <div v-if="showImageLightbox" class="image-lightbox" @click.self="closeImageLightbox">
      <div class="image-lightbox-inner">
        <img :src="imageLightboxSrc" alt="preview" />
        <div class="image-actions">
          <a
            :href="imageLightboxSrc"
            :download="selectedBooking ? selectedBooking.paymentFileName : ''"
            class="btn download"
            >Download</a
          >
          <button class="btn" @click="closeImageLightbox">Close</button>
        </div>
      </div>
    </div>
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
      showModal: false,
      selectedBooking: null,
      showImageLightbox: false,
      imageLightboxSrc: null,
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
    confirm(id) {
      if (!confirm('Konfirmasi booking ini?')) return
      this.bookingsStore.confirmBooking(id)
      alert('Booking dikonfirmasi')
      this.closeModal()
    },

    reject(id) {
      if (!confirm('Tolak booking ini?')) return
      this.bookingsStore.rejectBooking(id)
      alert('Booking ditolak')
      this.closeModal()
    },

    viewBooking(id) {
      const booking = this.bookingsStore.bookings.find((b) => b.bookingId === id)
      if (!booking) return
      this.selectedBooking = booking
      this.showModal = true
    },

    openImageLightbox(src) {
      if (!src) return
      this.imageLightboxSrc = src
      this.showImageLightbox = true
    },

    closeImageLightbox() {
      this.showImageLightbox = false
      this.imageLightboxSrc = null
    },

    closeModal() {
      this.showModal = false
      this.selectedBooking = null
    },
  },
}
</script>

<style scoped>
.dashboard-page {
  padding: 32px 40px;
  max-width: 1200px;
  margin: 100px auto;
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

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 12px;
  max-width: 640px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.modal-body {
  padding: 18px 20px;
  color: #333;
}

.modal-body p {
  margin: 8px 0;
}

.modal-body .modal-payment-img {
  width: 160px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.image-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.image-lightbox-inner {
  background: transparent;
  max-width: 960px;
  width: 100%;
  text-align: center;
}

.image-lightbox-inner img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

.image-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.image-actions .download {
  background: #0f5132;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
}

.image-actions .btn {
  padding: 8px 12px;
  border-radius: 8px;
  background: #e2e6ea;
  border: none;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 14px 20px;
  border-top: 1px solid #eee;
}

.btn.confirm {
  background: #d4edda;
  color: #155724;
}

.btn.reject {
  background: #f8d7da;
  color: #721c24;
}

.btn.view {
  background: #e2e6ea;
  color: #333;
}
</style>
