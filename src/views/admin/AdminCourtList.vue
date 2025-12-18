<template>
  <div class="page-container">
    <div class="header">
      <h1>Manajemen Lapangan</h1>
      <button @click="$router.push('/admin/courts/create')">+ Tambah Court</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Harga/Jam</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="court in courts" :key="court.id">
          <td>{{ court.name }}</td>
          <td>Rp {{ court.price.toLocaleString('id-ID') }}</td>
          <td>
            <span :class="court.available ? 'active' : 'inactive'">
              {{ court.available ? 'Aktif' : 'Nonaktif' }}
            </span>
          </td>
          <td>
            <button @click="editCourt(court.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useCourtsStore } from '@/stores/courts'

export default {
  data() {
    return {
      courtsStore: null,
    }
  },

  created() {
    this.courtsStore = useCourtsStore()
    this.courtsStore.load()
  },

  computed: {
    courts() {
      return this.courtsStore ? this.courtsStore.courts : []
    },
  },

  methods: {
    editCourt(id) {
      this.$router.push(`/admin/courts/${id}/edit`)
    },

    deleteCourt(id) {
      if (!confirm('Hapus court ini?')) return
      this.courtsStore.removeCourt(id)
    },
  },
}
</script>
<style scoped>
.page-container {
  padding: 32px 40px;
  max-width: 1200px;
  margin: 100px auto;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
}

.header button {
  background: #0f3d2e;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.header button:hover {
  background: #145c44;
}

/* TABLE */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

thead {
  background: #f9fafb;
}

thead th {
  text-align: left;
  padding: 16px;
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

tbody td {
  padding: 14px 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f1f5f9;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f9fafb;
}

/* STATUS BADGE */
.active {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  background: #dcfce7;
  color: #166534;
}

.inactive {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  background: #e5e7eb;
  color: #374151;
}

/* ACTION BUTTON */
tbody button {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

tbody button:hover {
  background: #1d4ed8;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .page-container {
    padding: 20px;
  }

  table {
    font-size: 13px;
  }

  thead {
    display: none;
  }

  tbody tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px;
  }

  tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border: none;
  }

  tbody td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }
}
</style>
