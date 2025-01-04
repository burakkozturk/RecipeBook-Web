<template>
  <div class="categories-page">
    <div class="page-header">
      <h1>Categories</h1>
      <button class="add-category-btn">
        <i class="fas fa-plus"></i>
        Add Category
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading categories...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else class="categories-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <div class="category-info">
          <div class="category-image">
            <img :src="category.imageUrl" :alt="category.name">
          </div>
          <div class="category-details">
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <div class="category-stats">
              <span class="stat">
                <i class="fas fa-utensils"></i>
                {{ category.recipeCount || 0 }} Recipes
              </span>
            </div>
          </div>
        </div>
        <div class="category-actions">
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button class="action-btn delete" @click="deleteCategory(category.id)">
            <i class="fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const loading = ref(true)
const error = ref(null)

const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get('http://localhost:9191/api/categories')
    categories.value = response.data
  } catch (err) {
    error.value = 'Failed to load categories. Please try again later.'
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (categoryId) => {
  if (confirm('Are you sure you want to delete this category?')) {
    try {
      await axios.delete(`http://localhost:9191/api/categories/${categoryId}`)
      categories.value = categories.value.filter(cat => cat.id !== categoryId)
    } catch (err) {
      console.error('Error deleting category:', err)
    }
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.categories-page {
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

.add-category-btn {
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

.add-category-btn:hover {
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

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-item {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.category-image {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-details {
  flex: 1;
}

.category-details h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.category-details p {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.category-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.category-actions {
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

.action-btn.edit {
  background: #f3f4f6;
  color: #4b5563;
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

@media (max-width: 768px) {
  .categories-page {
    padding: 1rem;
  }

  .category-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .category-info {
    width: 100%;
  }

  .category-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 