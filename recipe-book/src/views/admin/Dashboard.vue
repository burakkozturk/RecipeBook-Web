<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="stat-content">
          <h3>Total Recipes</h3>
          <p class="stat-value">{{ totalRecipes }}</p>
          <p class="stat-change">
            <i class="fas fa-arrow-up"></i>
            +{{ newRecipesCount }} new this week
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>Total Users</h3>
          <p class="stat-value">{{ totalUsers }}</p>
          <p class="stat-change">
            <i class="fas fa-arrow-up"></i>
            +{{ newUsersCount }} new this week
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-heart"></i>
        </div>
        <div class="stat-content">
          <h3>Total Likes</h3>
          <p class="stat-value">{{ totalLikes }}</p>
          <p class="stat-change">
            <i class="fas fa-arrow-up"></i>
            +{{ newLikesCount }} new this week
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-comment"></i>
        </div>
        <div class="stat-content">
          <h3>Total Comments</h3>
          <p class="stat-value">{{ totalComments }}</p>
          <p class="stat-change">
            <i class="fas fa-arrow-up"></i>
            +{{ newCommentsCount }} new this week
          </p>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="recent-activities">
        <div class="section-header">
          <h2>Recent Activities</h2>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="activities-list">
          <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <i :class="getActivityIcon(activity.type)"></i>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.text }}</p>
              <p class="activity-time">{{ formatDate(activity.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="popular-recipes">
        <div class="section-header">
          <h2>Popular Recipes</h2>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="recipes-list">
          <div v-for="recipe in popularRecipes" :key="recipe.id" class="recipe-item">
            <img :src="recipe.image || 'https://via.placeholder.com/100'" :alt="recipe.title">
            <div class="recipe-content">
              <h3>{{ recipe.title }}</h3>
              <div class="recipe-meta">
                <span>
                  <i class="fas fa-heart"></i>
                  {{ recipe.likes?.length || 0 }}
                </span>
                <span>
                  <i class="fas fa-comment"></i>
                  {{ recipe.comments?.length || 0 }}
                </span>
                <span>
                  <i class="fas fa-eye"></i>
                  {{ recipe.views || 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const totalRecipes = ref(0)
const totalUsers = ref(0)
const totalLikes = ref(0)
const totalComments = ref(0)
const newRecipesCount = ref(0)
const newUsersCount = ref(0)
const newLikesCount = ref(0)
const newCommentsCount = ref(0)
const recentActivities = ref([])
const popularRecipes = ref([])

const fetchDashboardData = async () => {
  try {
    const [recipesResponse, usersResponse] = await Promise.all([
      axios.get('http://localhost:9191/api/recipe'),
      axios.get('http://localhost:9191/api/admin/user')
    ])

    const recipes = recipesResponse.data
    const users = usersResponse.data

    // Calculate totals
    totalRecipes.value = recipes.length
    totalUsers.value = users.length
    totalLikes.value = recipes.reduce((sum, recipe) => sum + (recipe.likes?.length || 0), 0)
    totalComments.value = recipes.reduce((sum, recipe) => sum + (recipe.comments?.length || 0), 0)

    // Calculate new items this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    newRecipesCount.value = recipes.filter(recipe => new Date(recipe.createdAt) > oneWeekAgo).length
    newUsersCount.value = users.filter(user => new Date(user.createdAt) > oneWeekAgo).length
    
    // Generate recent activities
    const activities = []
    recipes.slice(0, 5).forEach(recipe => {
      activities.push({
        id: `recipe-${recipe.id}`,
        type: 'recipe',
        text: `New recipe "${recipe.title}" was created by ${recipe.author?.name}`,
        timestamp: recipe.createdAt
      })
    })

    users.slice(0, 5).forEach(user => {
      activities.push({
        id: `user-${user.id}`,
        type: 'user',
        text: `New user ${user.name} joined the platform`,
        timestamp: user.createdAt
      })
    })

    recentActivities.value = activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)

    // Get popular recipes
    popularRecipes.value = [...recipes]
      .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
      .slice(0, 5)

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

const getActivityIcon = (type) => {
  const icons = {
    recipe: 'fas fa-utensils',
    user: 'fas fa-user',
    like: 'fas fa-heart',
    comment: 'fas fa-comment'
  }
  return icons[type] || 'fas fa-circle'
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
  fetchDashboardData()
})
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-change {
  font-size: 0.875rem;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change i {
  font-size: 0.75rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.recent-activities,
.popular-recipes {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.25rem;
  color: #1f2937;
}

.view-all-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #f3f4f6;
  color: #4b5563;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #6366f1;
  color: white;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: #f3f4f6;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
}

.activity-icon.recipe {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.activity-icon.user {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.activity-icon.like {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.activity-icon.comment {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.recipes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recipe-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.recipe-item:hover {
  background: #f3f4f6;
}

.recipe-item img {
  width: 64px;
  height: 64px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.recipe-content {
  flex: 1;
}

.recipe-content h3 {
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style> 