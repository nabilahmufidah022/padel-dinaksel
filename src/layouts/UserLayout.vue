<template>
  <Header />

  <main class="main">
    <RouterView />
  </main>

  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'UserLayout',
  components: { Header, Footer },
}
</script>
