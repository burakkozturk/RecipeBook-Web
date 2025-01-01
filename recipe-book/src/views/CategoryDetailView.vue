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
            <div class="recipe-image" :style="{ backgroundImage: `url(${recipe.imageUrl})` }">
              <div class="recipe-overlay">
                <div class="recipe-meta">
                  <span class="time">
                    <i class="far fa-clock"></i>
                    {{ recipe.cookTime + recipe.prepTime }} mins
                  </span>
                  <span class="difficulty">
                    <i class="fas fa-signal"></i>
                    {{ recipe.difficulty }}
                  </span>
                </div>
              </div>
            </div>
            <div class="recipe-content">
              <div class="recipe-tags">
                <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <h3 class="recipe-title">{{ recipe.title }}</h3>
              <p class="recipe-description">{{ recipe.description }}</p>
              <div class="recipe-footer">
                <div class="recipe-info">
                  <span class="prep-time">
                    <i class="fas fa-hourglass-start"></i>
                    Prep: {{ recipe.prepTime }}m
                  </span>
                  <span class="cook-time">
                    <i class="fas fa-fire"></i>
                    Cook: {{ recipe.cookTime }}m
                  </span>
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

onMounted(fetchRecipes)

watch(() => route.params.id, fetchRecipes)
</script>

<style scoped>
.category-detail {
  background-color: #f8fafc;
  min-height: 100vh;
}

.category-header {
  background-color: #6C63FF;
  padding: 4rem 0;
  text-align: center;
  color: white;
}

.category-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.category-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.recipes-section {
  padding: 4rem 0;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}

.loading i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.recipe-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image {
  height: 240px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.recipe-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  color: white;
  font-size: 0.9rem;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 100px;
}

.recipe-content {
  padding: 1.5rem;
}

.recipe-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tag {
  background: #f1f5f9;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.85rem;
}

.recipe-title {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.recipe-description {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.recipe-info {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

.recipe-info span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.view-recipe {
  background: #6C63FF;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-recipe:hover {
  background: #5B52E5;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .category-header {
    padding: 3rem 0;
  }

  .category-header h1 {
    font-size: 2.5rem;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
  }

  .recipe-card {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style> 