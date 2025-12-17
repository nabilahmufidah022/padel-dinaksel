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
export default {
  name: 'BookingDetail',

  data() {
    return {
      court: null,
      date: '',
      time: '',
      duration: 1,
      times: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'],
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

    const courts = [
      {
        id: 1,
        name: 'Court A - Premium',
        price: 150000,
        image:
          'https://image.made-in-china.com/202f0j00pfGknuYRVVrK/Padel-Court-Padel-Tennis-Court-Regular-Padel-Court.webp',
      },
      {
        id: 2,
        name: 'Court B - Standard',
        price: 120000,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSSkSJRGKQmNzyi9ep2PMjYrorXLmFPnpg&s',
      },
      {
        id: 3,
        name: 'Court C - Economy',
        price: 100000,
        image:
          'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01jx9dpphphjvaper0f43hfyms.jpg',
      },
    ]

    this.court = courts.find((c) => c.id === courtId)
  },

  methods: {
    confirmBooking() {
      if (!this.date || !this.time) {
        alert('Tanggal dan waktu wajib diisi')
        return
      }

      const bookings = JSON.parse(localStorage.getItem('bookings')) || []

      bookings.push({
        courtId: this.court.id,
        courtName: this.court.name,
        date: this.date,
        time: this.time,
        duration: this.duration,
        total: this.totalPrice,
      })

      localStorage.setItem('bookings', JSON.stringify(bookings))

      alert('Booking berhasil!')
      this.$router.push('/my-booking')
    },
  },
}
</script>

<style scoped>
.booking-page {
  padding: 40px 48px;
  background: #f5f7f8;
  min-height: 100vh;
}

.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 28px;
}

/* LAYOUT */
.booking-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: flex-start;
}

/* LEFT CARD */
.court-card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.court-card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.court-info {
  padding: 22px 24px;
}

.court-info h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #0f5132;
  margin-bottom: 14px;
}

.facility {
  list-style: none;
  padding: 0;
  margin: 0;
}

.facility li {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  position: relative;
  padding-left: 18px;
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
  padding: 26px;
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.booking-form h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
}

/* FORM */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  height: 46px;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  padding: 0 14px;
  font-size: 14px;
}

/* SUMMARY */
.summary {
  background: #f8faf9;
  padding: 18px;
  border-radius: 14px;
  margin: 22px 0;
}

.summary h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.summary-row.total {
  font-weight: 700;
  font-size: 15px;
  margin-top: 10px;
}

/* BUTTON */
.btn-book {
  width: 100%;
  padding: 14px;
  background: #0f3d2e;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-book:hover {
  background: #0c2f24;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .booking-page {
    padding: 24px;
  }

  .booking-layout {
    grid-template-columns: 1fr;
  }

  .court-card img {
    height: 220px;
  }
}
</style>
