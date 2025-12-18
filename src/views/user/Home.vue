<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>PT Dinaksel Padel Arena</h1>
        <h2>Play Smart, Play Hard.</h2>
        <p>Premium padel sports center with world-class facilities</p>

        <div class="hero-buttons">
          <button class="btn-primary" @click="$router.push('/user/book')">Book Court Now</button>
          <button class="btn-outline" @click="scrollToAvailability">View Availability</button>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features">
      <div class="feature-box">
        <MapPin class="icon" />
        <h3>Premium Location</h3>
        <p>Centrally located with easy access</p>
      </div>

      <div class="feature-box">
        <Clock class="icon" />
        <h3>24/7 Booking</h3>
        <p>Book anytime, play anytime</p>
      </div>

      <div class="feature-box">
        <Users class="icon" />
        <h3>Professional Staff</h3>
        <p>Expert guidance available</p>
      </div>

      <div class="feature-box">
        <Calendar class="icon" />
        <h3>Easy Scheduling</h3>
        <p>Real-time availability updates</p>
      </div>
    </section>

    <!-- COURTS -->

    <!-- AVAILABLE COURTS -->
    <div id="available-courts" class="courts-wrapper">
      <h2 class="section-title">Available Courts</h2>

      <div class="court-grid">
        <div class="court-card" v-for="court in availableCourts" :key="court.id">
          <div class="court-image">
            <img :src="court.image" alt="Court Image" />

            <!-- STATUS BADGE -->
            <span class="badge available">Available</span>
          </div>

          <div class="court-content">
            <h3>{{ court.name }}</h3>

            <p class="price">
              Rp {{ court.price ? court.price.toLocaleString('id-ID') : '-' }}
              <span>/jam</span>
            </p>

            <small v-if="court.nextTime"> Next Available: {{ court.nextTime }} </small>

            <button @click="$router.push({ name: 'BookingDetail', params: { id: court.id } })">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin, Clock, Users, Calendar } from 'lucide-vue-next'
import { useCourtsStore } from '@/stores/courts'

export default {
  components: {
    MapPin,
    Clock,
    Users,
    Calendar,
  },
  data() {
    return {
      courtsStore: null,
    }
  },

  computed: {
    courts() {
      return this.courtsStore ? this.courtsStore.courts : []
    },

    availableCourts() {
      return this.courts.filter((c) => c.available)
    },
  },
  mounted() {
    this.courtsStore = useCourtsStore()
    this.courtsStore.load()
  },
  methods: {
    scrollToAvailability() {
      const el = document.getElementById('available-courts')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        this.$router.push({ path: '/', hash: '#available-courts' })
      }
    },
  },
}
</script>

<style scoped>
.home-page {
  margin-top: 90px;
  background: #f9f9f9;
}
/* HERO */
.hero {
  height: 420px;
  background:
    linear-gradient(rgba(15, 83, 65, 0.8), rgba(15, 83, 65, 0.8)), url('@/assets/bg_padel.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  color: #fff;
}

.hero-content h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.hero-content h2 {
  color: #a3e635;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 16px;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-primary {
  background: #a3e635;
  color: #14532d;
  border: none;
  padding: 12px 22px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
}

.btn-outline {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 12px 22px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
}

/* FEATURES */
.features {
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 40px 20px;
}

.feature-box {
  background: white;
  width: 250px;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.feature-box p {
  color: #777;
  font-size: 14px;
}

/* COURTS LIST */
.courts-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 20px 60px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* GRID (SAMA DENGAN LIST COURT) */
.court-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* CARD */
.court-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

/* IMAGE */
.court-image {
  position: relative;
}

.court-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* BADGE */
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.available {
  background: #6de56a;
  color: #134e13;
}

/* CONTENT */
.court-content {
  padding: 16px;
}

.court-content h3 {
  margin-bottom: 6px;
}

.court-content small {
  color: #555;
}

/* BUTTON */
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

.court-content button:hover {
  background: #14532d;
}
.price {
  color: #0f5132;
  font-size: 18px;
  font-weight: 700;
  margin-top: 15px;
}

.price span {
  font-size: 12px;
  font-weight: normal;
}
</style>
