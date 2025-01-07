<template>
  <div class="users-page">
    <div class="page-header">
      <h1>Users</h1>
      <div class="header-actions">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" v-model="searchQuery" placeholder="Search users...">
        </div>
        <button class="add-user-btn">
          <i class="fas fa-plus"></i>
          Add User
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading users...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else class="users-list">
      <div v-for="user in filteredUsers" :key="user.id" class="user-item">
        <div class="user-info">
          <div class="user-avatar">
            <img :src="user.profilePhoto || 'https://via.placeholder.com/80'" :alt="user.name">
          </div>
          <div class="user-details">
            <div class="user-header">
              <h3>{{ user.name }}</h3>
              <span class="verification-badge" :class="{ 'verified': user.isVerify }">
                <i class="fas" :class="user.isVerify ? 'fa-check-circle' : 'fa-times-circle'"></i>
                {{ user.isVerify ? 'Verified' : 'Not Verified' }}
              </span>
            </div>
            <p class="username">@{{ user.username }}</p>
            <div class="user-meta">
              <span class="meta-item">
                <i class="fas fa-envelope"></i>
                {{ user.email }}
              </span>
            </div>
          </div>
        </div>

        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-value">{{ user.followersCount || 0 }}</span>
            <span class="stat-label">Followers</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ user.followingCount || 0 }}</span>
            <span class="stat-label">Following</span>
          </div>
        </div>

        <div class="user-actions">
          <button class="action-btn view" title="View User">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn edit" title="Edit User">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" @click="deleteUser(user.id)" title="Delete User">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get('http://localhost:9191/api/admin/user')
    users.value = response.data.users
  } catch (err) {
    error.value = 'Kullanıcılar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    console.error('Error fetching users:', err)
  } finally {
    loading.value = false
  }
}

const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    try {
      await axios.delete(`http://localhost:9191/api/admin/user/${userId}`)
      users.value = users.value.filter(user => user.id !== userId)
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-size: 1.875rem;
  color: #1f2937;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.search-box i {
  color: #6b7280;
}

.search-box input {
  border: none;
  outline: none;
  width: 200px;
  font-size: 0.875rem;
}

.add-user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-user-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-item {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.user-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  min-width: 0;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.user-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.verification-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 1rem;
  background: #fee2e2;
  color: #ef4444;
}

.verification-badge.verified {
  background: #dcfce7;
  color: #10b981;
}

.username {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.user-meta {
  display: flex;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #6b7280;
  font-size: 0.8125rem;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1.5rem;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background-color: #e5e7eb;
}

.stat-item {
  text-align: center;
  min-width: 70px;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.125rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.user-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.action-btn.view {
  background: #f3f4f6;
  color: #4b5563;
}

.action-btn.edit {
  background: #e0e7ff;
  color: #6366f1;
}

.action-btn.delete {
  background: #fee2e2;
  color: #ef4444;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.action-btn.view:hover {
  background: #6366f1;
  color: white;
}

.action-btn.edit:hover {
  background: #4f46e5;
  color: white;
}

.action-btn.delete:hover {
  background: #dc2626;
  color: white;
}

@media (max-width: 1024px) {
  .user-stats {
    display: none;
  }
}

@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .user-info {
    width: 100%;
  }

  .user-actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }
}
</style> 