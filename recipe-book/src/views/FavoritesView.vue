<template>
  <div class="favorites-page">
    <div class="page-header">
      <div class="container">
        <h1>My Favorites</h1>
        <p>Your favorite recipes collection</p>
      </div>
    </div>

    <div class="favorites-container">
      <div v-if="loading" class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading favorites...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="favoriteRecipes.length === 0" class="no-favorites">
        <div class="empty-state">
          <i class="fas fa-heart"></i>
          <h2>No favorites yet</h2>
          <p>Start exploring recipes and save your favorites!</p>
          <router-link to="/categories" class="explore-btn">
            Explore Recipes
          </router-link>
        </div>
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
              <router-link :to="`/recipe/${recipe.id}`" class="view-recipe">
                View Recipe
              </router-link>
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
const favoriteRecipes = ref([])
const loading = ref(true)
const error = ref(null)

const fetchFavorites = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Önce kullanıcının favori tarif ID'lerini al
    const favResponse = await axios.get(`http://localhost:9191/api/favourites/${auth.user.id}`)
    const favoriteIds = favResponse.data.map(fav => fav.recipeId)
    
    // Her bir favori tarif için detay bilgilerini çek
    const recipePromises = favoriteIds.map(id => 
      axios.get(`http://localhost:9191/api/recipe/${id}`)
    )
    
    const responses = await Promise.all(recipePromises)
    favoriteRecipes.value = responses.map(res => res.data)
  } catch (err) {
    error.value = 'Failed to load favorites. Please try again later.'
    console.error('Error fetching favorites:', err)
  } finally {
    loading.value = false
  }
}

const toggleLike = async (recipe) => {
  try {
    const response = await axios.post(`http://localhost:9191/api/recipe/${recipe.id}/like`)
    recipe.likes = response.data.likes
    recipe.isLiked = !recipe.isLiked
    
    if (!recipe.isLiked) {
      // Eğer beğeni kaldırıldıysa, tarifi listeden çıkar
      favoriteRecipes.value = favoriteRecipes.value.filter(r => r.id !== recipe.id)
    }
  } catch (err) {
    console.error('Error toggling like:', err)
  }
}

onMounted(fetchFavorites)
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding-top: 5rem;
}

.page-header {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  padding: 3rem 0;
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.favorites-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
}

.empty-state i {
  font-size: 4rem;
  color: #e5e7eb;
  margin-bottom: 1rem;
}

.empty-state h2 {
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.explore-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

/* Recipe card styles */
.recipe-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.recipe-image-wrapper {
  position: relative;
  padding-top: 55%;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.05);
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
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recipe-content {
  padding: 1.5rem;
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
}

.recipe-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.recipe-description {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.recipe-times {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.2rem;
}

.time-item {
  text-align: center;
}

.time-label {
  font-size: 0.7rem;
  color: #6b7280;
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.time-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
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

.stat-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-button:hover {
  color: #ef4444;
  background: #fef2f2;
}

.stat-button i.liked {
  color: #ef4444;
}

.view-recipe {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-recipe:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .favorites-container {
    padding: 0 1rem;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-header {
    padding: 2rem 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style> 