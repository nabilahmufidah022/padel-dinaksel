import { defineStore } from 'pinia'

const STORAGE_KEY = 'pd_courts'

export const useCourtsStore = defineStore('courts', {
  state: () => ({
    courts: [],
  }),

  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        this.courts = raw ? JSON.parse(raw) : []
      } catch (e) {
        this.courts = []
      }
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.courts))
      } catch (e) {
        // ignore
      }
    },

    addCourt(payload) {
      const newCourt = {
        id: Date.now(),
        name: payload.name || 'New Court',
        price: payload.price ? Number(payload.price) : 0,
        image: payload.image || '',
        available: !!payload.available,
      }

      this.courts.push(newCourt)
      this.save()
      return newCourt
    },

    updateCourt(id, payload) {
      const idx = this.courts.findIndex((c) => c.id === id)
      if (idx === -1) return null
      this.courts[idx] = { ...this.courts[idx], ...payload }
      this.save()
      return this.courts[idx]
    },

      removeCourt(id) {
        const idx = this.courts.findIndex((c) => c.id === id)
        if (idx === -1) return false
        this.courts.splice(idx, 1)
        this.save()
        return true
      },

    setCourts(list) {
      this.courts = list || []
      this.save()
    },
  },
})
