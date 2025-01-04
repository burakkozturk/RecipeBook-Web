<template>
  <div class="recipes-page">
    <div class="page-header">
      <h1>Recipes</h1>
      <div class="header-actions">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" v-model="searchQuery" placeholder="Tariflerde ara...">
        </div>
        <button class="add-recipe-btn">
          <i class="fas fa-plus"></i>
          New Recipe
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Recipes loading...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else class="recipes-list">
      <div v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-item">
        <div class="recipe-image">
          <img :src="recipe.imageUrl || 'https://via.placeholder.com/150'" :alt="recipe.title">
          <div class="recipe-category" :style="{ background: getCategoryColor(recipe.category?.name) }">
            {{ recipe.category?.name }}
          </div>
        </div>
        <div class="recipe-info">
          <h3>{{ recipe.title }}</h3>
          <p class="recipe-description">{{ recipe.description }}</p>
          <div class="recipe-meta">
            <span class="meta-item">
              <i class="fas fa-user"></i>
              {{ recipe.author?.name || 'Bilinmeyen Yazar' }}
            </span>
            <span class="meta-item">
              <i class="fas fa-calendar"></i>
              {{ formatDate(recipe.createdAt) }}
            </span>
            <span class="meta-item">
              <i class="fas fa-clock"></i>
              {{ recipe.cookingTime }} minutes
            </span>
          </div>
        </div>
        <div class="recipe-stats">
          <div class="stat-item">
            <span class="stat-value">{{ recipe.likes?.length || 0 }}</span>
            <span class="stat-label">Likes</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ recipe.comments?.length || 0 }}</span>
            <span class="stat-label">Comment</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ recipe.views || 0 }}</span>
            <span class="stat-label">View</span>
          </div>
        </div>
        <div class="recipe-actions">
          <button class="action-btn view">
            <i class="fas fa-eye"></i>
            View
          </button>
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
            Update
          </button>
          <button class="action-btn delete" @click="deleteRecipe(recipe.id)">
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

const recipes = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const filteredRecipes = computed(() => {
  if (!searchQuery.value) return recipes.value
  
  const query = searchQuery.value.toLowerCase()
  return recipes.value.filter(recipe => 
    recipe.title?.toLowerCase().includes(query) ||
    recipe.description?.toLowerCase().includes(query) ||
    recipe.author?.name?.toLowerCase().includes(query)
  )
})

const fetchRecipes = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get('http://localhost:9191/api/recipe')
    recipes.value = response.data
  } catch (err) {
    error.value = 'Tarifler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    console.error('Error fetching recipes:', err)
  } finally {
    loading.value = false
  }
}

const deleteRecipe = async (recipeId) => {
  if (confirm('Bu tarifi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
    try {
      await axios.delete(`http://localhost:9191/api/recipe/${recipeId}`)
      recipes.value = recipes.value.filter(recipe => recipe.id !== recipeId)
    } catch (err) {
      console.error('Error deleting recipe:', err)
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

const getCategoryColor = (category) => {
  const colors = {
    'Kahvaltı': '#f59e0b',
    'Öğle Yemeği': '#10b981',
    'Akşam Yemeği': '#6366f1',
    'Tatlı': '#ec4899',
    'Atıştırmalık': '#8b5cf6',
    'İçecek': '#3b82f6'
  }
  return colors[category] || '#6b7280'
}

onMounted(() => {
  fetchRecipes()
})
</script>

<style scoped>
.recipes-page {
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

.add-recipe-btn {
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

.add-recipe-btn:hover {
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

.recipes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recipe-item {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.recipe-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 0.75rem;
  overflow: hidden;
  flex-shrink: 0;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-category {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.recipe-info {
  flex: 1;
}

.recipe-info h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.recipe-description {
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
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.recipe-stats {
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

.recipe-actions {
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
  .recipe-stats {
    display: none;
  }
}

@media (max-width: 768px) {
  .recipes-page {
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

  .recipe-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .recipe-image {
    width: 100%;
    height: 200px;
  }

  .recipe-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .recipe-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 