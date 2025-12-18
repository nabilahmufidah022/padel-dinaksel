<template>
  <AdminHeader />

  <main class="main">
    <RouterView />
  </main>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'

export default {
  name: 'AdminLayout',
  components: { AdminHeader },
}
</script>
