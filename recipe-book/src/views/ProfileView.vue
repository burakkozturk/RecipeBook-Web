<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.isAuthenticated()) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="profile-page">
    <div class="container py-5">
      <!-- Loading State -->
      <div v-if="authStore.loading" class="text-center py-5">
        <i class="fas fa-spinner fa-spin fa-2x"></i>
        <p class="mt-3">Loading profile...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="authStore.error" class="alert alert-danger">
        {{ authStore.error }}
      </div>

      <!-- Profile Content -->
      <div v-else-if="authStore.user" class="profile-content">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <h2 class="username">{{ authStore.user.username }}</h2>
            
            <div class="profile-actions mt-4">
              <button class="btn btn-edit">
                <i class="fas fa-edit"></i>
                Edit Profile
              </button>
              <button class="btn btn-recipes">
                <i class="fas fa-utensils"></i>
                My Recipes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="text-center py-5">
        <p>No profile data available</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background-color: #f3f4f6;
  min-height: 100vh;
  padding-top: 5rem;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6C63FF;
  border-radius: 50%;
  color: white;
}

.profile-avatar i {
  font-size: 4rem;
}

.username {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.profile-info {
  margin-top: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  color: #4a5568;
}

.info-item i {
  color: #6C63FF;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-edit {
  background-color: #6C63FF;
  color: white;
}

.btn-edit:hover {
  background-color: #5b52e5;
}

.btn-recipes {
  background-color: #FF6B6B;
  color: white;
}

.btn-recipes:hover {
  background-color: #ff5252;
}

.alert {
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .profile-card {
    margin: 1rem;
  }
  
  .profile-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 