<template>
  <div class="page-container">
    <!-- FILTER -->
    <div class="filter-card">
      <div class="filter-header">
        <i class="bi bi-funnel"></i>
        <strong>Filter Lapangan</strong>
      </div>

      <div class="filter-body">
        <div class="filter-inputs">
          <div class="filter-group">
            <label>Tanggal</label>
            <input type="date" v-model="selectedDate" />
          </div>

          <div class="filter-group">
            <label>Waktu</label>
            <select v-model="selectedTime">
              <option value="">Pilih Waktu</option>
              <option v-for="time in times" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
        </div>

        <div class="filter-checkbox">
          <input type="checkbox" v-model="availableOnly" />
          <label>Tampilkan yang tersedia saja</label>
        </div>
      </div>
    </div>

    <!-- LIST COURT -->
    <div class="court-grid">
      <div class="court-card" v-for="court in filteredCourts" :key="court.id">
        <div class="court-image">
          <img :src="court.image" alt="Court Image" />

          <!-- BADGE STATUS -->
          <span class="badge" :class="court.available ? 'available' : 'booked'">
            {{ court.available ? 'Available' : 'Booked' }}
          </span>
        </div>

        <div class="court-content">
          <h3>{{ court.name }}</h3>

          <p class="price">
            Rp {{ court.price.toLocaleString('id-ID') }}
            <span>/jam</span>
          </p>

          <!-- BUTTON -->
          <button
            :disabled="!court.available"
            :class="{ disabled: !court.available }"
            @click="goToBooking(court.id)"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListCourt',

  data() {
    return {
      selectedDate: '',
      selectedTime: '',
      availableOnly: false,
      times: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'],

      courts: [
        {
          id: 1,
          name: 'Court A - Premium',
          price: 150000,
          image:
            'https://image.made-in-china.com/202f0j00pfGknuYRVVrK/Padel-Court-Padel-Tennis-Court-Regular-Padel-Court.webp',
          available: true,
        },
        {
          id: 2,
          name: 'Court B - Standard',
          price: 120000,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSSkSJRGKQmNzyi9ep2PMjYrorXLmFPnpg&s',
          available: true,
        },
        {
          id: 3,
          name: 'Court C - Economy',
          price: 100000,
          image:
            'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01jx9dpphphjvaper0f43hfyms.jpg',
          available: false,
        },
      ],
    }
  },

  computed: {
    filteredCourts() {
      return this.availableOnly ? this.courts.filter((c) => c.available) : this.courts
    },
  },

  methods: {
    goToBooking(courtId) {
      if (!this.selectedDate || !this.selectedTime) {
        alert('Pilih tanggal dan waktu terlebih dahulu')
        return
      }

      this.$router.push({
        name: 'BookingDetail',
        params: { id: courtId },
        query: {
          date: this.selectedDate,
          time: this.selectedTime,
        },
      })
    },
  },
}
</script>

<style scoped>
@media (max-width: 768px) {
  .filter-body {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-inputs {
    grid-template-columns: 1fr;
  }

  .filter-checkbox {
    padding-top: 10px;
  }
}

.page-container {
  padding: 30px 40px;
  margin: 50px auto;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* FILTER */
.filter-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
  margin-top: 40px;
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

/* GRID FILTER */
.filter-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
}

/* INPUT AREA */
.filter-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  flex: 1;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}

.filter-group input,
.filter-group select {
  height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* CHECKBOX */
.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 6px; /* sejajar tinggi input */
  white-space: nowrap;
}

.filter-checkbox input {
  width: 16px;
  height: 16px;
}

/* CHECKBOX */
.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  margin-top: 22px; /* sejajarkan dengan input */
}

.filter-checkbox input {
  width: 16px;
  height: 16px;
}

/* COURT GRID */
.court-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.court-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.court-image {
  position: relative;
}

.court-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.badge.available {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #6de56a;
  color: #134e13;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.court-content {
  padding: 16px;
}

.court-content h3 {
  margin-bottom: 8px;
}

.price {
  color: #0f5132;
  font-size: 18px;
  font-weight: 700;
}

.price span {
  font-size: 12px;
  font-weight: normal;
}

.court-content button {
  margin-top: 14px;
  width: 100%;
  padding: 10px;
  background: #0f3d2e;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* AVAILABLE */
.badge.available {
  background: #6de56a;
  color: #134e13;
}

/* BOOKED */
.badge.booked {
  background: #e0e0e0;
  color: #555;
}
</style>
