<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>PT Dinaksel Padel Arena</h1>
        <h2>Play Smart, Play Hard.</h2>
        <p>Premium padel sports center with world-class facilities</p>

        <div class="hero-buttons">
          <button class="btn-primary">Book Court Now</button>
          <button class="btn-outline">View Availability</button>
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
    <div class="courts-wrapper">
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
          name: 'Court A - Premium',
          price: 150000,
          status: 'Available',
          image:
            'https://image.made-in-china.com/202f0j00pfGknuYRVVrK/Padel-Court-Padel-Tennis-Court-Regular-Padel-Court.webp',
        },
        {
          id: 2,
          name: 'Court 2',
          nextTime: '2:00 PM',
          status: 'Booked',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOSSkSJRGKQmNzyi9ep2PMjYrorXLmFPnpg&s',
        },
        {
          id: 3,
          name: 'Court A - Premium',
          price: 150000,
          image:
            'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01jx9dpphphjvaper0f43hfyms.jpg',
        },
        {
          id: 4,
          name: 'Court 1',
          nextTime: '10:00 AM',
          status: 'Available',
          image:
            'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01jx9p6pecd78yrpf63hemqsxk.jpg',
        },
      ],
    }
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
  padding: 0 20px;
}

.section-title {
  margin: 20px 0 10px 0;
  font-size: 22px;
  font-weight: bold;
}

.courts-container {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.court-card {
  width: 300px;
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
