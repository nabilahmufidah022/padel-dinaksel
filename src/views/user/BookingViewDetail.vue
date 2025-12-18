<template>
  <div class="page-container" v-if="booking">
    <h1 class="page-title">Detail Peminjaman</h1>

    <div class="detail-layout">
      <!-- LEFT -->
      <div class="court-card">
        <img :src="booking.image" />

        <div class="court-info">
          <h2>{{ booking.courtName }}</h2>
          <span :class="['status', booking.status]">{{ booking.status }}</span>

          <p class="booking-id">Booking ID: {{ booking.bookingId }}</p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="detail-card">
        <h3>Informasi Pemesanan</h3>

        <div class="info-row">
          <span>Tanggal</span>
          <strong>{{ booking.date }}</strong>
        </div>

        <div class="info-row">
          <span>Waktu</span>
          <strong>{{ booking.time }}</strong>
        </div>

        <div class="info-row">
          <span>Durasi</span>
          <strong>{{ booking.duration }} jam</strong>
        </div>

        <div class="divider"></div>

        <div class="info-row total">
          <span>Total Harga</span>
          <strong>Rp {{ booking.total.toLocaleString('id-ID') }}</strong>
        </div>

        <div class="actions">
          <button class="btn-outline" @click="$router.back()">Kembali</button>
          <button class="btn-danger" @click="cancelBooking">Batalkan Booking</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">Data pemesanan tidak ditemukan</div>
</template>
<script>
import { useBookingsStore } from '@/stores/bookings'

export default {
  name: 'BookingViewDetail',

  data() {
    return {
      booking: null,
      bookingsStore: null,
    }
  },

  mounted() {
    const bookingId = this.$route.params.id
    this.bookingsStore = useBookingsStore()
    this.bookingsStore.load()

    this.booking = this.bookingsStore.getById(bookingId)
  },

  methods: {
    cancelBooking() {
      if (!confirm('Yakin ingin membatalkan booking ini?')) return

      this.bookingsStore.removeBooking(this.booking.bookingId)
      alert('Booking berhasil dibatalkan')
      this.$router.push('/user/my-booking')
    },
  },
}
</script>

<style scoped>
.page-container {
  padding: 32px 40px;
  background: #f5f7f8;
  min-height: 100vh;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 28px;
}

/* LAYOUT */
.detail-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
}

/* LEFT */
.court-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.court-card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.court-info {
  padding: 22px;
}

.court-info h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
}

.booking-id {
  font-size: 14px;
  color: #777;
  margin-top: 10px;
}

/* RIGHT */
.detail-card {
  background: #fff;
  padding: 26px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.detail-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 14px;
}

.info-row.total {
  font-size: 17px;
  font-weight: 700;
}

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 18px 0;
}

/* STATUS */
.status {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.status.confirmed {
  background: #b7eb8f;
  color: #135200;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.status.rejected {
  background: #f8d7da;
  color: #721c24;
}

/* BUTTON */
.actions {
  display: flex;
  gap: 14px;
  margin-top: 24px;
}

.btn-outline {
  flex: 1;
  padding: 12px;
  border-radius: 999px;
  border: 1px solid #ccc;
  background: white;
  font-weight: 600;
}

.btn-danger {
  flex: 1;
  padding: 12px;
  border-radius: 999px;
  border: 1px solid #ff4d4f;
  color: #ff4d4f;
  background: white;
  font-weight: 600;
}

/* EMPTY */
.not-found {
  padding: 60px;
  text-align: center;
  color: #777;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
}
</style>
