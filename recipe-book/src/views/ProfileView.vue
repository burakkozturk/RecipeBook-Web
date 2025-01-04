<template>
  <div class="profile-page">
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading profile...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else class="profile-container">
      <div class="profile-header">
        <div class="profile-info">
          <div class="profile-photo-section">
            <div class="profile-photo">
              <img :src="user.profilePhoto" :alt="user.name">
              <div v-if="!user.verify" class="verify-badge" title="Not Verified">
                <i class="fas fa-times-circle"></i>
              </div>
              <div v-else class="verify-badge verified" title="Verified">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
          </div>
          <div class="profile-details">
            <div class="profile-header-content">
              <div class="name-section">
                <h1>{{ user.name }}</h1>
                <p class="username">@{{ user.username }}</p>
              </div>
            </div>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{ user.followersCount }}</span>
                <span class="stat-label">Followers</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-value">{{ user.followingCount }}</span>
                <span class="stat-label">Following</span>
              </div>
            </div>
            <div class="profile-info-items">
              <div class="info-item" v-if="user.dateOfBirth">
                <i class="fas fa-birthday-cake"></i>
                <span>{{ formatDate(user.dateOfBirth) }}</span>
              </div>
              <div class="info-item" v-if="user.createdAt">
                <i class="fas fa-calendar"></i>
                <span>Joined {{ formatDate(user.createdAt) }}</span>
              </div>
            </div>
            <div class="biography" v-if="user.biography">
              <p>{{ user.biography }}</p>
            </div>
            <div class="biography" v-else>
              <p class="no-bio">No biography added yet.</p>
            </div>
            <div class="action-group">
              <button class="profile-btn settings" title="Settings">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
              </button>
              <button class="profile-btn new-recipe" title="Create New Recipe">
                <i class="fas fa-plus"></i>
                <span>New Recipe</span>
              </button>
              <button v-if="user.role === 'ADMIN'" class="profile-btn admin" title="Admin Panel">
                <i class="fas fa-shield-alt"></i>
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recipes Section -->
      <div class="recipes-container">
        <div class="recipes-section">
          <div class="tabs">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'recipes' }"
              @click="switchTab('recipes')"
            >
              <i class="fas fa-utensils"></i>
              My Recipes
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'favorites' }"
              @click="switchTab('favorites')"
            >
              <i class="fas fa-heart"></i>
              My Favorites
            </button>
          </div>

          <div v-if="activeTab === 'recipes'">
            <div v-if="loadingRecipes" class="loading">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Loading recipes...</p>
            </div>
            <div v-else-if="recipes.length === 0" class="no-recipes">
              <p>No recipes added yet.</p>
            </div>
            <div v-else class="recipes-grid">
              <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
                <div class="recipe-image-wrapper">
                  <div class="recipe-image" :style="{ backgroundImage: `url(${recipe.imageUrl})` }">
                    <div class="recipe-badges">
                      <span class="badge difficulty">{{ recipe.difficulty }}</span>
                      <span class="badge time">{{ recipe.cookTime + recipe.prepTime }}m</span>
                    </div>
                  </div>
                </div>
                <div class="recipe-content">
                  <div class="recipe-tags">
                    <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
                  </div>
                  <h3 class="recipe-title">{{ recipe.title }}</h3>
                  <p class="recipe-description">{{ recipe.description }}</p>
                </div>
                <div class="recipe-footer">
                  <div class="recipe-times">
                    <div class="time-item">
                      <span class="time-label">PREP TIME</span>
                      <span class="time-value">{{ recipe.prepTime }}m</span>
                    </div>
                    <div class="time-item">
                      <span class="time-label">COOK TIME</span>
                      <span class="time-value">{{ recipe.cookTime }}m</span>
                    </div>
                  </div>
                  <div class="recipe-actions">
                    <div class="recipe-stats">
                      <button class="stat-button" @click.prevent="toggleLike(recipe)">
                        <i class="fas fa-heart" :class="{ 'liked': recipe.isLiked }"></i>
                        <span>{{ recipe.likes || 0 }}</span>
                      </button>
                      <div class="stat-item">
                        <i class="fas fa-comment"></i>
                        <span>{{ recipe.comments?.length || 0 }}</span>
                      </div>
                    </div>
                    <div class="action-buttons">
                      <template v-if="currentUserId === recipe.authorId">
                        <button class="action-btn edit" @click="editRecipe(recipe)" title="Edit Recipe">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" @click="deleteRecipe(recipe)" title="Delete Recipe">
                          <i class="fas fa-trash"></i>
                        </button>
                      </template>
                      <router-link :to="`/recipe/${recipe.id}`" class="view-recipe">
                        View Recipe
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div v-if="loadingFavorites" class="loading">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Loading favorites...</p>
            </div>
            <div v-else-if="favoriteRecipes.length === 0" class="no-recipes">
              <p>No favorite recipes yet.</p>
            </div>
            <div v-else class="recipes-grid">
              <div v-for="recipe in favoriteRecipes" :key="recipe.id" class="recipe-card">
                <div class="recipe-image-wrapper">
                  <div class="recipe-image" :style="{ backgroundImage: `url(${recipe.imageUrl})` }">
                    <div class="recipe-badges">
                      <span class="badge difficulty">{{ recipe.difficulty }}</span>
                      <span class="badge time">{{ recipe.cookTime + recipe.prepTime }}m</span>
                    </div>
                  </div>
                </div>
                <div class="recipe-content">
                  <div class="recipe-tags">
                    <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
                  </div>
                  <h3 class="recipe-title">{{ recipe.title }}</h3>
                  <p class="recipe-description">{{ recipe.description }}</p>
                </div>
                <div class="recipe-footer">
                  <div class="recipe-times">
                    <div class="time-item">
                      <span class="time-label">PREP TIME</span>
                      <span class="time-value">{{ recipe.prepTime }}m</span>
                    </div>
                    <div class="time-item">
                      <span class="time-label">COOK TIME</span>
                      <span class="time-value">{{ recipe.cookTime }}m</span>
                    </div>
                  </div>
                  <div class="recipe-actions">
                    <div class="recipe-stats">
                      <button class="stat-button" @click.prevent="toggleLike(recipe)">
                        <i class="fas fa-heart" :class="{ 'liked': recipe.isLiked }"></i>
                        <span>{{ recipe.likes || 0 }}</span>
                      </button>
                      <div class="stat-item">
                        <i class="fas fa-comment"></i>
                        <span>{{ recipe.comments?.length || 0 }}</span>
                      </div>
                    </div>
                    <div class="action-buttons">
                      <router-link :to="`/recipe/${recipe.id}`" class="view-recipe">
                        View Recipe
                      </router-link>
                    </div>
                  </div>
                </div>
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
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const auth = useAuthStore()
const user = ref(null)
const recipes = ref([])
const loading = ref(true)
const loadingRecipes = ref(true)
const error = ref(null)
const activeTab = ref('recipes')
const favoriteRecipes = ref([])
const loadingFavorites = ref(true)
const currentUserId = ref(null)

const fetchUserProfile = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`http://localhost:9191/api/user/username/${auth.user.username}`)
    user.value = response.data
    currentUserId.value = response.data.id
  } catch (err) {
    error.value = 'Failed to load profile. Please try again later.'
    console.error('Error fetching profile:', err)
  } finally {
    loading.value = false
  }
}

const fetchUserRecipes = async () => {
  try {
    loadingRecipes.value = true
    const response = await axios.get(`http://localhost:9191/api/recipe/user/${auth.user.username}`)
    recipes.value = response.data
  } catch (err) {
    console.error('Error fetching recipes:', err)
  } finally {
    loadingRecipes.value = false
  }
}

const toggleLike = async (recipe) => {
  try {
    const response = await axios.post(`http://localhost:9191/api/recipe/${recipe.id}/like`)
    recipe.likes = response.data.likes
    recipe.isLiked = !recipe.isLiked
  } catch (err) {
    console.error('Error liking recipe:', err)
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

const editRecipe = (recipe) => {
  // TODO: Implement edit functionality
  console.log('Edit recipe:', recipe.id)
}

const deleteRecipe = async (recipe) => {
  if (confirm('Are you sure you want to delete this recipe?')) {
    try {
      await axios.delete(`http://localhost:9191/api/recipe/${recipe.id}`)
      recipes.value = recipes.value.filter(r => r.id !== recipe.id)
    } catch (err) {
      console.error('Error deleting recipe:', err)
    }
  }
}

const switchTab = (tab) => {
  activeTab.value = tab
  if (tab === 'favorites' && favoriteRecipes.value.length === 0) {
    fetchFavorites()
  }
}

const fetchFavorites = async () => {
  try {
    loadingFavorites.value = true
    const favResponse = await axios.get(`http://localhost:9191/api/favourites/${currentUserId.value}`)
    const favoriteIds = favResponse.data.map(fav => fav.recipeId)
    
    const recipePromises = favoriteIds.map(id => 
      axios.get(`http://localhost:9191/api/recipe/${id}`)
    )
    
    const responses = await Promise.all(recipePromises)
    favoriteRecipes.value = responses.map(res => res.data)
  } catch (err) {
    console.error('Error fetching favorites:', err)
  } finally {
    loadingFavorites.value = false
  }
}

onMounted(() => {
  fetchUserProfile()
  fetchUserRecipes()
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem 1rem;
}

.profile-header {
  margin-top: 5rem;
  margin-left: 12rem;
  margin-right: 12rem;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  padding: 2rem;
}

.profile-info {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.profile-details {
  margin-left: 3rem;
  flex: 1;
}

.profile-header-content {
  margin-bottom: 1.5rem;
}

.name-section h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.3rem;
}

.username {
  font-size: 1.1rem;
  color: #6b7280;
  font-weight: 500;
}

.profile-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.2rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
}

.profile-info-items {
  margin: 1.5rem 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.biography {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
}

.action-group {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .profile-details {
    margin-left: 0;
    width: 100%;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .info-item {
    justify-content: center;
  }

  .action-group {
    justify-content: center;
  }
}

.profile-photo {
  width: 300px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-photo:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-photo:hover img {
  transform: scale(1.08);
}

.verify-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.verify-badge:hover {
  transform: scale(1.15) rotate(5deg);
}

.verify-badge i {
  font-size: 18px;
}

.profile-btn {
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.profile-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-btn:hover::before {
  opacity: 1;
}

.profile-btn i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.profile-btn:hover i {
  transform: scale(1.1) rotate(5deg);
}

.profile-btn span {
  font-weight: 500;
  letter-spacing: 0.01em;
}

.profile-btn.settings {
  background: #f8fafc;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02),
              inset 0 2px 4px rgba(255, 255, 255, 0.8);
}

.profile-btn.settings:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05),
              inset 0 2px 4px rgba(255, 255, 255, 0.8);
  border-color: #d1d5db;
}

.profile-btn.new-recipe {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
}

.profile-btn.new-recipe:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.3);
  background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
}

.profile-btn.admin {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.2);
}

.profile-btn.admin:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(220, 38, 38, 0.3);
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
}

@media (max-width: 768px) {
  .action-group {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .profile-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Recipe section styles */
.recipes-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.recipes-section {
  padding: 2rem 0;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.recipe-card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.1);
}

.recipe-image-wrapper {
  position: relative;
  padding-top: 55%;
  flex-shrink: 0;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.recipe-card:hover .recipe-image {
  transform: scale(1.03);
}

.recipe-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.badge {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: #1f2937;
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
}

.recipe-card:hover .badge {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.recipe-content {
  padding: 1.5rem;
  flex: 1;
}

.recipe-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #6366f1;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #e0e7ff;
  color: #4f46e5;
  transform: translateY(-1px);
}

.recipe-title {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: .3rem;
  color: #1f2937;
}

.recipe-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3em;
  height: auto;
  max-height: 4.8em;
}

.recipe-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  margin-top: auto;
}

.recipe-times {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.2rem;
}

.time-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.time-label {
  font-size: 0.7rem;
  color: #6b7280;
  letter-spacing: 0.5px;
  margin-bottom: 0.2rem;
}

.time-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.recipe-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e5e7eb;
}

.recipe-stats {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.stat-button, .stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.stat-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-button:hover {
  color: #ef4444;
  background: #f3f4f6;
}

.stat-button i.liked {
  color: #ef4444;
}

.view-recipe {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  padding: 0.8rem 1.6rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: -0.01em;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-recipe:hover {
  background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
}

@media (max-width: 768px) {
  .recipes-container {
    padding: 0 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .recipes-section {
    padding: 1.5rem 0;
  }

  .recipes-grid {
    padding: 0.5rem 0;
  }

  .recipe-image-wrapper {
    padding-top: 50%;
  }

  .recipe-content {
    padding: 1.25rem;
  }

  .recipe-footer {
    padding: 1.25rem;
  }

  .time-value {
    font-size: 1rem;
  }

  .recipe-title {
    font-size: 1.3rem;
  }

  .recipe-description {
    font-size: 0.95rem;
  }

  .recipe-times {
    gap: 2rem;
  }

  .recipe-stats {
    gap: 0.8rem;
  }

  .stat-button, .stat-item {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
  }

  .view-recipe {
    padding: 0.5rem 1rem;
    min-width: 100px;
  }
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  transform: translateY(-2px) scale(1.05);
}

.action-btn.edit:hover {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.action-btn.delete:hover {
  background: #ef4444;
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.action-btn i {
  font-size: 1rem;
}

.profile-actions {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0 2.5rem;
  position: relative;
}

.action-group {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02),
              0 2px 4px rgba(0, 0, 0, 0.02),
              inset 0 2px 4px rgba(255, 255, 255, 0.8);
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.5rem;
  border-radius: 16px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.profile-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-btn:hover::before {
  opacity: 1;
}

.profile-btn i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.profile-btn:hover i {
  transform: scale(1.1) rotate(5deg);
}

.profile-btn span {
  font-weight: 500;
  letter-spacing: 0.01em;
}

.profile-btn.settings {
  background: #f8fafc;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02),
              inset 0 2px 4px rgba(255, 255, 255, 0.8);
}

.profile-btn.settings:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05),
              inset 0 2px 4px rgba(255, 255, 255, 0.8);
  border-color: #d1d5db;
}

.profile-btn.new-recipe {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
}

.profile-btn.new-recipe:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.3);
  background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
}

.profile-btn.admin {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.2);
}

.profile-btn.admin:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(220, 38, 38, 0.3);
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
}

@media (max-width: 768px) {
  .action-group {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .profile-btn {
    width: 100%;
    justify-content: center;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.tab-btn:hover {
  color: #4f46e5;
  background: #f1f5f9;
}

.tab-btn:hover i {
  transform: scale(1.1) rotate(5deg);
}

.tab-btn.active {
  background: #4f46e5;
  color: white;
}

.tab-btn.active i {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: row;
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .tab-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style> 