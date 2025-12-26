import { defineStore } from 'pinia'

const STORAGE_KEY = 'bookings'

export const useBookingsStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
  }),

  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        this.bookings = raw ? JSON.parse(raw) : []
      } catch (e) {
        this.bookings = []
      }
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookings))
      } catch (e) {
        // ignore
      }
    },

    addBooking(payload) {
      const booking = {
        bookingId: 'Dinaksel-' + Date.now(),
        courtId: payload.courtId,
        courtName: payload.courtName,
        date: payload.date,
        time: payload.time,
        duration: payload.duration || 1,
        total: payload.total || 0,
        image: payload.image || '',
        paymentProof: payload.paymentProof || '',
        paymentFileName: payload.paymentFileName || '',
        status: 'pending',
      }

      this.bookings.push(booking)
      this.save()
      return booking
    },

    removeBooking(bookingId) {
      const idx = this.bookings.findIndex((b) => b.bookingId === bookingId)
      if (idx === -1) return false
      this.bookings.splice(idx, 1)
      this.save()
      return true
    },

    setStatus(bookingId, status) {
      const idx = this.bookings.findIndex((b) => b.bookingId === bookingId)
      if (idx === -1) return false
      this.bookings[idx].status = status
      this.save()
      return true
    },

    confirmBooking(bookingId) {
      return this.setStatus(bookingId, 'confirmed')
    },

    rejectBooking(bookingId) {
      return this.setStatus(bookingId, 'rejected')
    },

    getById(bookingId) {
      return this.bookings.find((b) => b.bookingId === bookingId)
    },
  },
})
