<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero">
      <h1>PT DOY Padel Courts</h1>
      <p class="subtitle">Play Smart, Play Doy.</p>
      <p class="subtitle">World-class padel court booking system</p>

      <div class="hero-buttons">
        <button class="btn-primary">Book Court</button>
        <button class="btn-secondary">View Availability</button>
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
    <h2 class="section-title">Available Courts</h2>

    <section class="courts-container">
      <div v-for="court in courts" :key="court.id" class="court-card">
        <img :src="court.image" />

        <div class="status" :class="{ booked: court.status === 'Booked' }">
          {{ court.status }}
        </div>

        <div class="court-content">
          <h4>{{ court.name }}</h4>
          <small>Next: {{ court.nextTime }}</small>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { MapPin, Clock, Users, Calendar } from 'lucide-vue-next'

export default {
  components: {
    MapPin,
    Clock,
    Users,
    Calendar,
  },
  data() {
    return {
      courts: [
        {
          id: 1,
          name: 'Court 1',
          nextTime: '10:00 AM',
          status: 'Available',
          image: 'https://images.pexels.com/photos/5739120/pexels-photo-5739120.jpeg',
        },
        {
          id: 2,
          name: 'Court 2',
          nextTime: '2:00 PM',
          status: 'Booked',
          image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg',
        },
      ],
    }
  },
}
</script>

<style>
.home-page {
  margin-top: 90px;
  background: #f9f9f9;
}
/* NAVBAR */
.navbar {
  width: 100%;
  padding: 18px 50px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-circle {
  background: #2f6c2f;
  color: white;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.logo-text h2 {
  margin: 0;
  font-size: 18px;
}
.logo-text span {
  font-size: 12px;
  color: #5fa65c;
}

.nav-menu {
  display: flex;
  gap: 35px;
}

.nav-menu a {
  font-weight: 600;
  text-decoration: none;
  color: #333;
}

.nav-menu a.router-link-active {
  color: white;
  background: #1c4b1c;
  padding: 8px 18px;
  border-radius: 20px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #a7d763;
  color: #235b13;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

/* HERO */
.hero {
  background: url('https://images.pexels.com/photos/5739120/pexels-photo-5739120.jpeg') center/cover
    no-repeat;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.hero h1 {
  font-size: 48px;
}

.subtitle {
  font-size: 20px;
}

.hero-buttons {
  margin-top: 25px;
}

.btn-primary {
  padding: 12px 25px;
  background: #82c91e;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-right: 15px;
}

.btn-secondary {
  padding: 12px 25px;
  background: white;
  border-radius: 25px;
  border: 2px solid #1f8d57;
  color: #1f8d57;
  font-weight: bold;
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
  width: 230px;
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
.section-title {
  margin-left: 40px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
}

.courts-container {
  display: flex;
  gap: 25px;
  padding: 20px 40px 50px;
  flex-wrap: wrap;
}

.court-card {
  width: 260px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.court-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 5px 12px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  background: #82c91e;
}

.status.booked {
  background: #ff5b5b;
}

.court-content {
  padding: 15px;
}

.court-content small {
  color: #555;
}

.icon {
  width: 32px;
  height: 32px;
  margin-bottom: 12px;
  color: #2f6c2f;
}
</style>
