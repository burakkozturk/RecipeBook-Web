<template>
  <section class="categories-section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Categories</h2>
        <p>Explore our most popular recipe categories</p>
      </div>

      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading categories...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
      </div>

      <div v-else class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <router-link :to="`/category/${category.id}`" class="category-content">
            <div class="category-bg" :style="{ backgroundImage: `url(${category.image_url})` }"></div>
            <div class="category-overlay"></div>
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <span class="explore-btn">
                Explore <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
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
.categories-section {
  padding: 5rem 0;
  background-color: #f8fafc;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #64748b;
  font-size: 1.1rem;
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
}

.category-card {
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.category-content {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: white;
  position: relative;
}

.category-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
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
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.7)
  );
  transition: background 0.3s ease;
}

.category-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.category-info h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.explore-btn i {
  transition: transform 0.3s ease;
}

/* Hover Effects */
.category-card:hover .category-bg {
  transform: scale(1.05);
}

.category-card:hover .category-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.8)
  );
}

.category-card:hover .explore-btn {
  opacity: 1;
  transform: translateY(0);
}

.category-card:hover .explore-btn i {
  transform: translateX(5px);
}

@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .categories-section {
    padding: 3rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .category-card {
    height: 280px;
  }

  .category-info h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .category-card {
    height: 250px;
  }
}
</style> 