<template>
  <div class="featured-page">
    <div class="page-header">
      <h1>Featured Management</h1>
      <p class="header-description">Manage featured categories and recipes that appear on the homepage</p>
    </div>

    <div class="featured-sections">
      <!-- Featured Categories Section -->
      <div class="section featured-categories">
        <div class="section-header">
          <h2>Featured Categories</h2>
          <p>Select up to 4 categories to feature on the homepage</p>
        </div>

        <div v-if="loadingCategories" class="loading-state">
          <div class="spinner"></div>
          <p>Loading categories...</p>
        </div>

        <div v-else class="categories-grid">
          <div v-for="category in categories" :key="category.id" 
               class="category-card" 
               :class="{ 'is-featured': isCategoryFeatured(category.id) }"
               @click="toggleFeaturedCategory(category)">
            <div class="card-content">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>
            <div class="featured-badge">
              <i class="fas fa-star"></i>
              Featured
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Recipes Section -->
      <div class="section featured-recipes">
        <div class="section-header">
          <h2>Featured Recipes</h2>
          <p>Select up to 6 recipes to feature on the homepage</p>
        </div>

        <div v-if="loadingRecipes" class="loading-state">
          <div class="spinner"></div>
          <p>Loading recipes...</p>
        </div>

        <div v-else class="recipes-grid">
          <div v-for="recipe in recipes" :key="recipe.id" 
               class="recipe-card"
               :class="{ 'is-featured': isRecipeFeatured(recipe.id) }"
               @click="toggleFeaturedRecipe(recipe)">
            <img :src="recipe.imageUrl" :alt="recipe.title">
            <div class="recipe-info">
              <h3>{{ recipe.title }}</h3>
              <p>{{ recipe.description }}</p>
              <div class="recipe-meta">
                <span>
                  <i class="fas fa-user"></i>
                  {{ recipe.author?.name }}
                </span>
                <span>
                  <i class="fas fa-clock"></i>
                  {{ recipe.cookTime + recipe.prepTime }}m
                </span>
              </div>
            </div>
            <div class="featured-badge">
              <i class="fas fa-star"></i>
              Featured
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

const categories = ref([])
const recipes = ref([])
const featuredCategories = ref([])
const featuredRecipes = ref([])
const loadingCategories = ref(true)
const loadingRecipes = ref(true)

const fetchCategories = async () => {
  try {
    loadingCategories.value = true
    const response = await axios.get('http://localhost:9191/api/categories')
    categories.value = response.data
    
    // Fetch featured categories
    const featuredResponse = await axios.get('http://localhost:9191/api/categories/featured')
    // API'den gelen ID'leri kullanarak featured kategorileri işaretleme
    featuredCategories.value = categories.value.filter(category => 
      featuredResponse.data.includes(category.id)
    )
  } catch (err) {
    console.error('Error fetching categories:', err)
  } finally {
    loadingCategories.value = false
  }
}

const fetchRecipes = async () => {
  try {
    loadingRecipes.value = true
    const response = await axios.get('http://localhost:9191/api/recipes')
    recipes.value = response.data
    
    // Fetch featured recipes
    const featuredResponse = await axios.get('http://localhost:9191/api/featured/recipes')
    featuredRecipes.value = featuredResponse.data
  } catch (err) {
    console.error('Error fetching recipes:', err)
  } finally {
    loadingRecipes.value = false
  }
}

const isCategoryFeatured = (categoryId) => {
  return featuredCategories.value.some(fc => fc.id === categoryId)
}

const isRecipeFeatured = (recipeId) => {
  return featuredRecipes.value.some(fr => fr.id === recipeId)
}

const toggleFeaturedCategory = async (category) => {
  try {
    if (isCategoryFeatured(category.id)) {
      await axios.delete(`http://localhost:9191/api/categories/featured/${category.id}`)
      featuredCategories.value = featuredCategories.value.filter(fc => fc.id !== category.id)
    } else {
      if (featuredCategories.value.length >= 4) {
        alert('En fazla 4 kategori öne çıkarılabilir')
        return
      }
      await axios.post(`http://localhost:9191/api/categories/featured/${category.id}`)
      featuredCategories.value.push(category)
    }
  } catch (err) {
    console.error('Error updating featured category:', err)
  }
}

const toggleFeaturedRecipe = async (recipe) => {
  try {
    if (isRecipeFeatured(recipe.id)) {
      await axios.delete(`http://localhost:9191/api/featured/recipes/${recipe.id}`)
      featuredRecipes.value = featuredRecipes.value.filter(fr => fr.id !== recipe.id)
    } else {
      if (featuredRecipes.value.length >= 6) {
        alert('You can only feature up to 6 recipes')
        return
      }
      await axios.post(`http://localhost:9191/api/featured/recipes/${recipe.id}`)
      featuredRecipes.value.push(recipe)
    }
  } catch (err) {
    console.error('Error updating featured recipe:', err)
  }
}

onMounted(() => {
  fetchCategories()
  fetchRecipes()
})
</script>

<style scoped>
.featured-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.header-description {
  color: #6b7280;
  font-size: 1rem;
}

.featured-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #6b7280;
  font-size: 0.875rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-card.is-featured {
  border-color: #6366f1;
  background: #f5f3ff;
}

.category-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.category-card p {
  color: #6b7280;
  font-size: 0.875rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.recipe-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.recipe-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-card.is-featured {
  border-color: #6366f1;
}

.recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-info {
  padding: 1.5rem;
}

.recipe-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.recipe-info p {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #6366f1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.is-featured .featured-badge {
  opacity: 1;
  transform: translateY(0);
}

.loading-state {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .featured-page {
    padding: 1rem;
  }

  .categories-grid,
  .recipes-grid {
    grid-template-columns: 1fr;
  }
}
</style> 