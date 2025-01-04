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
            <div v-if="user.authorities?.includes('ROLE_ADMIN')" class="admin-badge" title="Admin">
              <i class="fas fa-shield-alt"></i>
            </div>
          </div>
          <div class="user-details">
            <h3>{{ user.name }}</h3>
            <p class="username">@{{ user.username }}</p>
            <div class="user-meta">
              <span class="meta-item">
                <i class="fas fa-envelope"></i>
                {{ user.email }}
              </span>
              <span class="meta-item">
                <i class="fas fa-calendar"></i>
                Joined {{ formatDate(user.createdAt) }}
              </span>
            </div>
          </div>
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-value">{{ user.recipes?.length || 0 }}</span>
            <span class="stat-label">Recipes</span>
          </div>
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
          <button class="action-btn view">
            <i class="fas fa-eye"></i>
            View
          </button>
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button class="action-btn delete" @click="deleteUser(user.id)">
            <i class="fas fa-trash"></i>
            Delete
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
    users.value = response.data
  } catch (err) {
    error.value = 'Failed to load users. Please try again later.'
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
  margin-bottom: 2rem;
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
  padding: 0.5rem 1rem;
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
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-user-btn:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
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
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.user-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.user-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: #6366f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  border: 2px solid white;
}

.user-details {
  flex: 1;
}

.user-details h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.username {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.user-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.user-stats {
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.user-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.view {
  background: #f3f4f6;
  color: #4b5563;
}

.action-btn.view:hover {
  background: #6366f1;
  color: white;
}

.action-btn.edit {
  background: #e0e7ff;
  color: #6366f1;
}

.action-btn.edit:hover {
  background: #6366f1;
  color: white;
}

.action-btn.delete {
  background: #fef2f2;
  color: #ef4444;
}

.action-btn.delete:hover {
  background: #ef4444;
  color: white;
}

@media (max-width: 1024px) {
  .user-stats {
    display: none;
  }
}

@media (max-width: 768px) {
  .users-page {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-actions {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .user-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .user-info {
    width: 100%;
  }

  .user-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .user-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 