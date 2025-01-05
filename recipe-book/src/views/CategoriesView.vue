<template>
  <div class="categories-page">
    <div class="container">
      <h2 class="section-title">Explore our most popular recipe categories</h2>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading categories...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
      </div>

      <div v-else class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <router-link :to="`/category/${category.id}`" class="category-content">
            <div class="category-image">
              <img :src="category.image_url" :alt="category.name">
              <div class="category-overlay"></div>
              <h3>{{ category.name }}</h3>
              <div class="explore-link">
                Explore <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
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

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.categories-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 4rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  color: #4b5563;
  margin-bottom: 3rem;
  font-weight: 500;
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #6C63FF;
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
}

.category-content {
  text-decoration: none;
  color: white;
  display: block;
  height: 100%;
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
  transition: background 0.3s ease;
}

.category-image h3 {
  position: absolute;
  bottom: 3rem;
  left: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  z-index: 1;
}

.explore-link {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;
  z-index: 1;
}

.explore-link i {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

/* Hover Effects */
.category-card:hover .category-image img {
  transform: scale(1.05);
}

.category-card:hover .category-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
}

.category-card:hover .explore-link i {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .categories-page {
    padding: 3rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .section-title {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }

  .categories-grid {
    gap: 1.5rem;
  }

  .category-image h3 {
    font-size: 1.5rem;
    bottom: 2.5rem;
  }
}

@media (max-width: 480px) {
  .categories-page {
    padding: 2rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .category-image h3 {
    font-size: 1.3rem;
    bottom: 2rem;
  }

  .explore-link {
    font-size: 0.9rem;
  }
}
</style> 