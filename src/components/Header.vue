<template>
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="nav-left">
      <div class="logo-circle"><img src="@/assets/logo.png" alt="Logo Dinaksel" /></div>
      <div class="logo-text">
        <h2>PT Dinaksel Padel Arena</h2>
        <span>Play Smart, Play Hard.</span>
      </div>
    </div>

    <nav class="nav-menu">
      <router-link to="/home" exact>Home</router-link>
      <router-link to="/book">List Court</router-link>
      <router-link to="/bookings">My Bookings</router-link>
    </nav>

    <div class="nav-right">
      <div class="user-circle">JD</div>
      <span class="username">John</span>
    </div>
  </header>
</template>
