<template>
  <div class="categories-page">
    <div class="container">
      <div class="page-header">
        <h1>Recipe Categories</h1>
        <p>Explore our delicious recipe collections</p>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading categories...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
      </div>

      <div v-else class="categories-grid">
        <router-link 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/category/${category.id}`" 
          class="category-card"
        >
          <div class="category-image">
            <img :src="category.image_url" :alt="category.name">
            <div class="category-overlay"></div>
            <div class="category-content">
              <h3>{{ category.name }}</h3>
              <p v-if="category.recipeCount" class="recipe-count">
                {{ category.recipeCount }} Recipes
              </p>
              <span class="explore-link">
                Explore Category <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 0 0 4rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  position: relative;
  background: linear-gradient(120deg, #4338ca 0%, #6366f1 100%);
  padding: 5rem 0;
  margin-bottom: 3rem;
  text-align: center;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/pattern-dots.png') repeat;
  opacity: 0.05;
  animation: slide 30s linear infinite;
}

.page-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.page-header .container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.page-header h1 {
  font-size: 4.5rem;
  color: white;
  margin: 0;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInUp 0.8s ease-out;
}

.page-header p {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.5rem;
  line-height: 1.6;
  font-weight: 400;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.category-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.category-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.05);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.7)
  );
  transition: background 0.3s ease;
}

.category-card:hover .category-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8)
  );
}

.category-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  color: white;
  z-index: 1;
}

.category-content h3 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.recipe-count {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0 0 1rem 0;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.explore-link i {
  transition: transform 0.3s ease;
}

.category-card:hover .explore-link i {
  transform: translateX(5px);
}

.loading-state, .error-state {
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

.error-state i {
  font-size: 2.5rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .categories-page {
    padding: 3rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .categories-grid {
    gap: 1rem;
  }

  .category-content {
    padding: 1.5rem;
  }

  .category-content h3 {
    font-size: 1.5rem;
  }
}
</style>

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

onMounted(() => {
  fetchCategories()
})
</script> 