<template>
  <div class="page-container">
    <h1 class="page-title">Manajemen Booking</h1>

    <div v-if="bookings.length === 0" class="empty-state">
      <i class="bi bi-calendar-x"></i>
      <p>Belum ada booking</p>
    </div>

    <div v-else class="booking-card-list">
      <div class="booking-card" v-for="b in bookings" :key="b.bookingId">
        <!-- HEADER -->
        <div class="card-header">
          <div>
            <h3>{{ b.courtName }}</h3>
            <small>{{ b.bookingId }}</small>
          </div>

          <span :class="['badge', b.status]">
            {{ b.status }}
          </span>
        </div>

        <!-- BODY -->
        <div class="card-body">
          <div class="info">
            <span>Tanggal</span>
            <strong>{{ b.date }}</strong>
          </div>

          <div class="info">
            <span>Waktu</span>
            <strong>{{ b.time }}</strong>
          </div>

          <div class="info">
            <span>Durasi</span>
            <strong>{{ b.duration }} jam</strong>
          </div>

          <div class="info total">
            <span>Total</span>
            <strong>Rp {{ b.total.toLocaleString('id-ID') }}</strong>
          </div>
        </div>

        <!-- ACTION -->
        <div class="card-actions">
          <button class="btn view" @click="view(b.bookingId)">View</button>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import { useBookingsStore } from '@/stores/bookings'

export default {
  name: 'AdminBookings',

  data() {
    return {
      bookingsStore: null,
      showModal: false,
      selectedBooking: null,
    }
  },

  computed: {
    bookings() {
      return this.bookingsStore ? this.bookingsStore.bookings : []
    },
  },

  mounted() {
    this.bookingsStore = useBookingsStore()
    this.bookingsStore.load()
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

    view(id) {
      const booking = this.bookings.find((b) => b.bookingId === id)
      if (!booking) return
      this.selectedBooking = booking
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.selectedBooking = null
    },
  },
}
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 80px auto;
  padding: 0 20px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
}

/* EMPTY */
.empty-state {
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  color: #777;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}

/* LIST */
.booking-card-list {
  display: grid;
  gap: 18px;
}

/* CARD */
.booking-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

/* HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.card-header small {
  color: #888;
  font-size: 12px;
}

/* BODY */
.card-body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.info span {
  font-size: 12px;
  color: #777;
}

.info strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
}

.info.total strong {
  color: #0f5132;
}

/* ACTIONS */
.card-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
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

/* BADGE */
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
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

/* RESPONSIVE */
@media (max-width: 768px) {
  .card-body {
    grid-template-columns: 1fr 1fr;
  }

  .card-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
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

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 14px 20px;
  border-top: 1px solid #eee;
}
</style>
