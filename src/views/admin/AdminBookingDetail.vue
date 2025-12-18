<template>
  <div class="page-container" v-if="booking">
    <h1 class="page-title">Detail Booking (Admin)</h1>

    <div class="detail-card">
      <div class="left">
        <img :src="booking.image" alt="Court" />
      </div>

      <div class="right">
        <h2>{{ booking.courtName }}</h2>
        <p><strong>Booking ID:</strong> {{ booking.bookingId }}</p>
        <p><strong>Tanggal:</strong> {{ booking.date }}</p>
        <p><strong>Waktu:</strong> {{ booking.time }}</p>
        <p><strong>Durasi:</strong> {{ booking.duration }} jam</p>
        <p><strong>Total:</strong> Rp {{ booking.total.toLocaleString('id-ID') }}</p>
        <p>
          <strong>Status:</strong>
          <span :class="['badge', booking.status]">{{ booking.status }}</span>
        </p>

        <div class="actions">
          <button v-if="booking.status === 'pending'" @click="confirmBooking">Confirm</button>
          <button v-if="booking.status === 'pending'" @click="rejectBooking">Reject</button>
          <button @click="$router.back()">Back</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">Booking tidak ditemukan</div>
</template>

<script>
import { useBookingsStore } from '@/stores/bookings'

export default {
  name: 'AdminBookingDetail',

  data() {
    return {
      bookingsStore: null,
      booking: null,
    }
  },

  mounted() {
    const id = this.$route.params.id
    this.bookingsStore = useBookingsStore()
    this.bookingsStore.load()
    this.booking = this.bookingsStore.getById(id)
  },

  methods: {
    confirmBooking() {
      if (!confirm('Konfirmasi booking ini?')) return
      this.bookingsStore.confirmBooking(this.booking.bookingId)
      this.booking.status = 'confirmed'
      alert('Booking dikonfirmasi')
    },

    rejectBooking() {
      if (!confirm('Tolak booking ini?')) return
      this.bookingsStore.rejectBooking(this.booking.bookingId)
      this.booking.status = 'rejected'
      alert('Booking ditolak')
    },
  },
}
</script>

<style scoped>
.detail-card {
  display: flex;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
}
.detail-card .left img {
  width: 360px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}
.detail-card .right h2 {
  margin: 0 0 8px;
}
.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
.actions button {
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.badge.pending {
  background: #fff3cd;
  color: #856404;
  padding: 4px 8px;
  border-radius: 8px;
}
.badge.confirmed {
  background: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 8px;
}
.badge.rejected {
  background: #f8d7da;
  color: #721c24;
  padding: 4px 8px;
  border-radius: 8px;
}
.not-found {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
</style>
