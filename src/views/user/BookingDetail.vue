<template>
  <div class="booking-page" v-if="court">
    <h1 class="page-title">Peminjaman Lapangan</h1>

    <div class="booking-layout">
      <!-- LEFT : COURT DETAIL -->
      <div class="court-card">
        <img :src="court.image" alt="Court Image" />

        <div class="court-info">
          <h2>{{ court.name }}</h2>
          <p class="price">Rp {{ court.price.toLocaleString('id-ID') }} / jam</p>

          <ul class="facility">
            <li>Fasilitas lengkap</li>
            <li>Tersedia air minum</li>
            <li>Ruang ganti tersedia</li>
            <li>Parkir gratis</li>
          </ul>
        </div>
      </div>

      <!-- RIGHT : BOOKING FORM -->
      <div class="booking-form">
        <h3>Detail Booking</h3>

        <div class="form-group">
          <label>Tanggal</label>
          <input type="date" v-model="date" />
        </div>

        <div class="form-group">
          <label>Waktu Mulai</label>
          <select v-model="time">
            <option value="">Pilih Waktu</option>
            <option v-for="t in times" :key="t" :value="t">
              {{ t }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Durasi (jam)</label>
          <select v-model="duration">
            <option :value="1">1 Jam</option>
            <option :value="2">2 Jam</option>
            <option :value="3">3 Jam</option>
          </select>
        </div>

        <!-- SUMMARY -->
        <div class="summary">
          <h4>Ringkasan Harga</h4>

          <div class="summary-row">
            <span>Harga per jam</span>
            <span>Rp {{ court.price.toLocaleString('id-ID') }}</span>
          </div>

          <div class="summary-row">
            <span>Durasi</span>
            <span>{{ duration }} jam</span>
          </div>

          <div class="summary-row total">
            <span>Total</span>
            <span>Rp {{ totalPrice.toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <button class="btn-book" @click="confirmBooking">Buat Booking</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCourtsStore } from '@/stores/courts'
import { useBookingsStore } from '@/stores/bookings'

export default {
  name: 'BookingDetail',

  data() {
    return {
      court: null,
      date: '',
      time: '',
      duration: 1,
      times: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'],
      courtsStore: null,
      bookingsStore: null,
    }
  },

  computed: {
    totalPrice() {
      return this.court ? this.court.price * this.duration : 0
    },
  },

  mounted() {
    const courtId = Number(this.$route.params.id)

    this.date = this.$route.query.date || ''
    this.time = this.$route.query.time || ''

    this.courtsStore = useCourtsStore()
    this.bookingsStore = useBookingsStore()

    this.courtsStore.load()
    this.bookingsStore.load()

    const found = this.courtsStore.courts.find((c) => c.id === courtId)
    if (found) this.court = found
  },

  methods: {
    confirmBooking() {
      if (!this.date || !this.time) {
        alert('Tanggal dan waktu wajib diisi')
        return
      }

      const booking = this.bookingsStore.addBooking({
        courtId: this.court.id,
        courtName: this.court.name,
        date: this.date,
        time: this.time,
        duration: this.duration,
        total: this.totalPrice,
        image: this.court.image,
      })

      alert('Booking berhasil!')
      this.$router.push('/user/my-booking')
    },
  },
}
</script>

<style scoped>
.booking-page {
  padding: 24px 16px;
  max-width: 980px;
  margin: 100px auto;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* LAYOUT */
.booking-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 16px;
  align-items: flex-start;
}

/* LEFT CARD */
.court-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.court-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.court-info {
  padding: 18px 20px;
}

.court-info h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #0f5132;
  margin-bottom: 12px;
}

/* FACILITY */
.facility {
  list-style: none;
  padding: 0;
  margin: 0;
}

.facility li {
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
  position: relative;
  padding-left: 16px;
}

.facility li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #0f5132;
  font-weight: bold;
}

/* RIGHT CARD */
.booking-form {
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.booking-form h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

/* FORM */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}

.form-group input,
.form-group select {
  height: 42px;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  padding: 0 12px;
  font-size: 13px;
}

/* SUMMARY */
.summary {
  background: #f8faf9;
  padding: 14px;
  border-radius: 12px;
  margin: 14px 0;
}

.summary h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
}

.summary-row.total {
  font-weight: 700;
  margin-top: 8px;
}

/* BUTTON */
.btn-book {
  width: 100%;
  padding: 12px;
  background: #0f3d2e;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.btn-book:hover {
  background: #0c2f24;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .booking-layout {
    grid-template-columns: 1fr;
  }

  .court-card img {
    height: 200px;
  }
}
</style>
