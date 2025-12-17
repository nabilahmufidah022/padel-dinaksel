<template>
  <div class="layout">
    <Header v-if="showLayout" />
    <main class="main">
      <RouterView />
    </main>
    <Footer v-if="showLayout" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },

  computed: {
    showLayout() {
      return !['/login', '/register'].includes(this.$route.path)
    },
  },
}
</script>
