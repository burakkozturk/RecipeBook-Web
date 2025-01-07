<template>
  <div class="category-detail">
    <div class="banner">
      <div class="banner-content">
        <h1>{{ categoryName }}</h1>
        <p>{{ categoryDescription || `Discover delicious ${categoryName} recipes` }}</p>
      </div>
    </div>

    <div class="container">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading recipes...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
      </div>

      <div v-else-if="recipes.length === 0" class="empty-state">
        <i class="fas fa-utensils"></i>
        <h2>No recipes found</h2>
        <p>There are no recipes in this category yet.</p>
      </div>

      <div v-else class="recipes-grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
          <div class="recipe-image-wrapper">
            <img :src="recipe.imageUrl" :alt="recipe.title">
            <div class="recipe-badges">
              <span class="badge difficulty">{{ recipe.difficulty }}</span>
              <span class="badge time">{{ recipe.cookTime + recipe.prepTime }}m</span>
            </div>
          </div>
          <div class="recipe-content">
            <h3 class="recipe-title">{{ recipe.title }}</h3>
            <p class="recipe-description">{{ recipe.description }}</p>
            <div class="recipe-meta">
              <div class="meta-item">
                <i class="fas fa-clock"></i>
                <span>Prep: {{ recipe.prepTime }}m</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-fire"></i>
                <span>Cook: {{ recipe.cookTime }}m</span>
              </div>
            </div>
          </div>
          <div class="recipe-footer">
            <div class="recipe-stats">
              <button class="stat-button" @click.prevent="toggleLike(recipe)">
                <i class="fas fa-heart" :class="{ 'liked': recipe.isLiked }"></i>
                <span>{{ recipe.likes || 0 }}</span>
              </button>
              <div class="stat-item">
                <i class="fas fa-user"></i>
                <span>{{ recipe.author.name }}</span>
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
const categoryDescription = ref('')

const fetchRecipes = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`http://localhost:9191/api/recipe/category/${route.params.id}`)
    recipes.value = response.data
    if (recipes.value.length > 0) {
      categoryName.value = recipes.value[0].category.name
      categoryDescription.value = recipes.value[0].category.description
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
  min-height: 100vh;
  background: #f8fafc;
}

.banner {
  position: relative;
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1440') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  text-align: center;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.4);
  padding: 3rem;
  border-radius: 1rem;
  backdrop-filter: blur(5px);
}

.banner h1 {
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;
  line-height: 1.2;
  letter-spacing: -1px;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
}

.banner p {
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0;
  line-height: 1.6;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.recipes-grid {
  display: grid;
  margin-bottom: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.recipe-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  background: white;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.recipe-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 60%;
}

.recipe-image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.recipe-card:hover .recipe-image-wrapper img {
  transform: scale(1.05);
}

.recipe-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.badge {
  background: rgba(255, 255, 255, 0.95);
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-content {
  padding: 1.5rem;
  flex: 1;
}

.recipe-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.recipe-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.recipe-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.recipe-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.stat-button:hover {
  background: #f3f4f6;
}

.stat-button i.liked {
  color: #ef4444;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.view-recipe {
  background: #6366f1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-recipe:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .recipes-grid {
    gap: 1rem;
  }

  .recipe-content {
    padding: 1rem;
  }

  .recipe-footer {
    padding: 1rem;
  }
}
</style> 