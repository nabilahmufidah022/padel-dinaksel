<template>
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="nav-left">
      <div class="logo-circle">DOY</div>
      <div class="logo-text">
        <h2>PT DOY Padel Courts</h2>
        <span>Play Smart, Play Doy.</span>
      </div>
    </div>

    <nav class="nav-menu">
      <router-link to="/home" exact>Home</router-link>
      <router-link to="/book">Book Court</router-link>
      <router-link to="/bookings">My Bookings</router-link>
    </nav>

    <div class="nav-right">
      <div class="user-circle">JD</div>
      <span class="username">John</span>
    </div>
  </header>
</template>
