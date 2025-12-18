<template>
  <div class="page-container">
    <h1 class="page-title">Daftar Peminjaman</h1>

    <div v-if="bookings.length === 0" class="empty-state">Belum ada peminjaman lapangan</div>

    <div class="booking-item" v-for="(item, index) in bookings" :key="index">
      <!-- IMAGE -->
      <div class="booking-image">
        <img :src="item.image" alt="Court" />
      </div>

      <!-- INFO -->
      <div class="booking-info">
        <h3>{{ item.courtName }}</h3>
        <p class="booking-id">Booking ID: {{ item.bookingId }}</p>

        <div class="booking-meta">
          <span>
            <i class="bi bi-calendar-event"></i>
            {{ item.date }}
          </span>
          <span>
            <i class="bi bi-clock"></i>
            {{ item.time }}
          </span>
        </div>

        <div class="actions">
          <button class="btn-outline" @click="goDetail(item.bookingId)">View Details</button>
          <button class="btn-danger" @click="cancel(item.bookingId)">Cancel Booking</button>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="booking-right">
        <span :class="['status', item.status]">{{ capitalize(item.status) }}</span>
        <p class="price">Rp {{ item.total.toLocaleString('id-ID') }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { useBookingsStore } from '@/stores/bookings'

export default {
  name: 'BookingList',

  data() {
    return {
      bookingsStore: null,
    }
  },

  computed: {
    bookings() {
      return this.bookingsStore ? this.bookingsStore.bookings : []
    },
  },

  methods: {
    goDetail(id) {
      this.$router.push(`/user/booking-detail/${id}`)
    },

    cancel(id) {
      if (!confirm('Yakin ingin membatalkan booking ini?')) return
      this.bookingsStore.removeBooking(id)
    },
    capitalize(s) {
      if (!s) return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
  },

  mounted() {
    this.bookingsStore = useBookingsStore()
    this.bookingsStore.load()
  },
}
</script>
<style scoped>
.page-container {
  padding: 32px 40px;
  margin: 100px auto;
  margin-top: 100px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
}

/* ITEM */
.booking-item {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

/* IMAGE */
.booking-image img {
  width: 160px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
}

/* INFO */
.booking-info {
  flex: 1;
  padding: 0 24px;
}

.booking-info h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.booking-id {
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
}

.booking-meta {
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #555;
  margin-bottom: 14px;
}

.booking-meta i {
  margin-right: 6px;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 12px;
}

.btn-outline {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #ccc;
  background: #feedf5;
  font-weight: 600;
  cursor: pointer;
}

.btn-danger {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #ff4d4f;
  color: #ff4d4f;
  background: white;
  font-weight: 600;
  cursor: pointer;
}

/* RIGHT */
.booking-right {
  min-width: 140px;
  text-align: right;
}

.status {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.status.confirmed {
  background: #b7eb8f;
  color: #135200;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #0f5132;
}

/* EMPTY */
.empty-state {
  background: #fff;
  padding: 40px;
  border-radius: 18px;
  text-align: center;
  color: #777;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .booking-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .booking-image img {
    width: 100%;
    height: 200px;
    margin-bottom: 14px;
  }

  .booking-right {
    width: 100%;
    text-align: left;
    margin-top: 12px;
  }
}
</style>
