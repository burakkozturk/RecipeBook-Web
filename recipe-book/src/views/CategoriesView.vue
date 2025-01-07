<template>
  <div class="categories-page">
    <div class="banner">
      <div class="banner-content">
        <h1>Recipe Categories</h1>
        <p>Discover our delicious recipes</p>
      </div>
    </div>

    <div class="container">
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

.categories-grid {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
  margin-bottom: 4rem;
}

.category-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-decoration: none;
  background: white;
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
    rgba(0, 0, 0, 0.6)
  );
  transition: all 0.3s ease;
}



.category-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  color: white;
  z-index: 1;
}

.category-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.recipe-count {
  font-size: 0.875rem;
  opacity: 0.9;
  margin: 0 0 0.75rem;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.explore-link i {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.category-card:hover .explore-link i {
  transform: translateX(3px);
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
  .banner {
    height: 300px;
  }

  .banner-content {
    padding: 2rem;
  }

  .banner h1 {
    font-size: 2.5rem;
  }

  .banner p {
    font-size: 1.2rem;
  }

  .categories-grid {
    gap: 1rem;
    padding: 0 1rem;
  }

  .category-content {
    padding: 1.25rem;
  }

  .category-content h3 {
    font-size: 1.25rem;
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