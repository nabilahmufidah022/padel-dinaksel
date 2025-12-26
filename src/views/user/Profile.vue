<template>
  <div class="profile-page">
    <h1>My Account</h1>

    <div class="profile-card">
      <div class="avatar">{{ userInitials }}</div>

      <div class="info">
        <div class="field">
          <label>Full Name</label>
          <input :value="user.name" disabled />
        </div>

        <div class="field">
          <label>Email</label>
          <input :value="user.email" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
    }
  },
  computed: {
    userInitials() {
      return this.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.user.name = user.name
      this.user.email = user.email
    }
  },
}
</script>
<style scoped>
.profile-page {
  margin-top: 120px;
  padding: 40px;
}

.profile-card {
  max-width: 520px;
  background: #fff;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #a7d763;
  color: #235b13;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.field label {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

.field input {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
</style>
