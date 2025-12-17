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
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/book">List Court</RouterLink>
      <router-link to="/my-booking">My Bookings</router-link>
    </nav>

    <div class="nav-right">
      <div class="user-circle">JD</div>
      <span class="username">John</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
