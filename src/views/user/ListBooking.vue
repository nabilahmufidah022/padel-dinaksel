<template>
  <div class="page-container">
    <h1 class="page-title">Daftar Pemesanan</h1>

    <div v-if="bookings.length === 0" class="empty-state">
      <p>Belum ada pemesanan lapangan.</p>
    </div>

    <div class="booking-grid" v-else>
      <div class="booking-card" v-for="(item, index) in bookings" :key="index">
        <div class="booking-header">
          <h3>{{ item.courtName }}</h3>
          <span class="badge">Booked</span>
        </div>

        <div class="booking-body">
          <p><strong>Tanggal:</strong> {{ item.date }}</p>
          <p><strong>Waktu:</strong> {{ item.time }}</p>
          <p><strong>Durasi:</strong> {{ item.duration }} jam</p>
          <p class="total">Rp {{ item.total.toLocaleString('id-ID') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingList',

  data() {
    return {
      bookings: [],
    }
  },

  mounted() {
    this.bookings = JSON.parse(localStorage.getItem('bookings')) || []
  },
}
</script>

<style scoped>
.page-container {
  padding: 32px 40px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
}

.booking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.booking-card {
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.booking-header h3 {
  font-size: 18px;
  font-weight: 700;
}

.badge {
  background: #e6f4ea;
  color: #137333;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.booking-body p {
  font-size: 14px;
  margin-bottom: 6px;
  color: #444;
}

.total {
  margin-top: 10px;
  font-weight: 700;
  font-size: 16px;
  color: #0f5132;
}

.empty-state {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  color: #777;
}
</style>
