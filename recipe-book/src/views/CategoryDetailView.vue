<template>
  <div class="category-detail">
    <!-- Category Header -->
    <div class="category-header">
      <div class="container">
        <h1>{{ categoryName }}</h1>
        <p>Discover delicious {{ categoryName.toLowerCase() }} recipes</p>
      </div>
    </div>

    <!-- Recipes Grid -->
    <div class="recipes-section">
      <div class="container">
        <div v-if="loading" class="loading">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Loading recipes...</p>
        </div>

        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
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
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const categoryName = ref('')

const fetchRecipes = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`http://localhost:9191/api/recipe/category/${route.params.id}`)
    recipes.value = response.data
    if (recipes.value.length > 0) {
      categoryName.value = recipes.value[0].category.name
    }
  } catch (err) {
    error.value = 'Failed to load recipes. Please try again later.'
    console.error('Error fetching recipes:', err)
  } finally {
    loading.value = false
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

onMounted(fetchRecipes)

watch(() => route.params.id, fetchRecipes)
</script>

<style scoped>
.category-detail {
  background-color: #f8fafc;
  min-height: 100vh;
}

.category-header {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  padding: 5rem 0;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.category-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/pattern.png') repeat;
  opacity: 0.1;
}

.category-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.category-header p {
  font-size: 1.3rem;
  opacity: 0.9;
}

.recipes-section {
  padding: 4rem 0;
  margin-top: -4rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.recipe-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  display: flex;
  flex-direction: column;
}

.recipe-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
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
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recipe-content {
  padding: 1.5rem;
  flex: 1;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.like-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #6b7280;
  transition: all 0.3s ease;
}

.like-button:hover {
  color: #ef4444;
  transform: scale(1.05);
}

.like-button i {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.like-button i.liked {
  color: #ef4444;
  animation: likeAnimation 0.3s ease;
}

.like-count {
  font-size: 0.9rem;
  font-weight: 500;
}

@keyframes likeAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.recipe-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
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
  background: #6366f1;
  color: white;
}

.recipe-title {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: .3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.5rem;
  min-height: 1.5em;
  height: auto;
  max-height: 3em;
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
  background: #6366f1;
  color: white;
  padding: 0.7rem 4.4rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-recipe:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }

  .recipe-card {
    height: 520px;
  }

  .recipe-image-wrapper {
    padding-top: 50%;
  }

  .recipe-content {
    padding: 1.25rem;
    gap: 0.8rem;
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

  .like-button {
    padding: 0.4rem;
  }

  .like-button i {
    font-size: 1.1rem;
  }

  .like-count {
    font-size: 0.85rem;
  }

  .recipe-actions {
    flex-direction: row;
    align-items: center;
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
</style> 