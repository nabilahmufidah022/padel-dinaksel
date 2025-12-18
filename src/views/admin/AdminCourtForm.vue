<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Edit Court' : 'Tambah Court' }}</h2>

    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Nama Court</label>
        <input v-model="form.name" required />
      </div>

      <div class="form-group">
        <label>Harga / Jam</label>
        <input type="number" v-model="form.price" required />
      </div>

      <div class="form-group">
        <label>URL Gambar</label>
        <input v-model="form.image" />
      </div>

      <div class="form-group checkbox">
        <input type="checkbox" v-model="form.available" />
        <label>Aktifkan Court</label>
      </div>

      <button type="submit">
        {{ isEdit ? 'Simpan Perubahan' : 'Tambah Court' }}
      </button>
    </form>
  </div>
</template>

<script>
import { useCourtsStore } from '@/stores/courts'

export default {
  props: ['id'],

  data() {
    return {
      form: {
        name: '',
        price: '',
        image: '',
        available: true,
      },
      courtsStore: null,
    }
  },

  computed: {
    isEdit() {
      return !!this.id
    },
  },

  mounted() {
    this.courtsStore = useCourtsStore()
    this.courtsStore.load()

    if (this.isEdit) {
      const cid = Number(this.id)
      const found = this.courtsStore.courts.find((c) => c.id === cid)
      if (found) {
        this.form = {
          name: found.name,
          price: found.price,
          image: found.image || '',
          available: !!found.available,
        }
      }
    }
  },

  methods: {
    submit() {
      if (this.isEdit) {
        const cid = Number(this.id)
        this.courtsStore.updateCourt(cid, {
          name: this.form.name,
          price: Number(this.form.price),
          image: this.form.image,
          available: !!this.form.available,
        })
        alert('Court berhasil diperbarui')
      } else {
        // add via store and persist
        this.courtsStore.addCourt({
          name: this.form.name,
          price: Number(this.form.price),
          image: this.form.image,
          available: !!this.form.available,
        })
        alert('Court berhasil ditambahkan')
      }

      this.$router.push('/admin/courts')
    },
  },
}
</script>
<style scoped>
.form-container {
  max-width: 500px;
  margin: 150px auto;
  background: #ffffff;
  padding: 32px 36px;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

/* TITLE */
.form-container h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #1f2937;
  text-align: center;
}

/* FORM GROUP */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #374151;
}

/* INPUT */
.form-group input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* CHECKBOX */
.form-group.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.form-group.checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-group.checkbox label {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  cursor: pointer;
}

/* SUBMIT BUTTON */
button[type='submit'] {
  width: 100%;
  margin-top: 22px;
  background: #0f3d2e;
  color: #ffffff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

button[type='submit']:hover {
  background: #145c44;
  transform: translateY(-1px);
}

button[type='submit']:active {
  transform: translateY(0);
}

/* RESPONSIVE */
@media (max-width: 480px) {
  .form-container {
    padding: 26px 22px;
    margin: 24px 16px;
  }

  .form-container h2 {
    font-size: 22px;
  }
}
</style>
