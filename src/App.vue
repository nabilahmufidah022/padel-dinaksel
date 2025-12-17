<template>
  <div class="layout">
    <AdminHeader v-if="showAdminHeader" />
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
import AdminHeader from '@/components/AdminHeader.vue'

export default {
  components: {
    Header,
    Footer,
    AdminHeader,
  },

  computed: {
    showAdminHeader() {
      return this.$route.meta.role === 'admin'
    },

    showLayout() {
      return this.$route.meta.role === 'user'
    },
  },
}
</script>
