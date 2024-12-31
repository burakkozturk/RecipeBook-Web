<template>
  <div class="categories-page">
    <!-- Banner Section -->
    <div class="banner">
      <div class="container">
        <div class="banner-content">
          <h1>Recipe <span class="highlight">Categories</span></h1>
          <p>Find inspiration and discover amazing recipes from around the world</p>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <i class="fas fa-th-large"></i>
            <div class="stat-info">
              <span class="stat-number">9</span>
              <span class="stat-label">Categories</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-utensils"></i>
            <div class="stat-info">
              <span class="stat-number">500+</span>
              <span class="stat-label">Recipes</span>
            </div>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <div class="stat-info">
              <span class="stat-number">50k+</span>
              <span class="stat-label">Happy Cooks</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="categories-section">
      <div class="container">
        <div class="categories-grid">
          <div v-for="category in categories" :key="category.id" class="category-card">
            <router-link :to="`/category/${category.id}`" class="category-content">
              <div class="category-bg" :style="{ backgroundImage: `url(${getCategoryImage(category.name)})` }"></div>
              <div class="category-overlay"></div>
              <div class="category-info">
                <h2>{{ category.name }}</h2>
                <span class="recipe-count">{{ getRecipeCount(category.id) }} Recipes</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import beveragesImg from '@/assets/beverages.jpeg'
import breadsImg from '@/assets/beverages.jpeg'
import breakfastImg from '@/assets/beverages.jpeg'
import dessertsImg from '@/assets/dessert.webp'
import dietaryImg from '@/assets/beverages.jpeg'
import mainCoursesImg from '@/assets/main.webp'
import saladsImg from '@/assets/beverages.jpeg'
import snacksImg from '@/assets/beverages.jpeg'
import soupImg from '@/assets/soup.webp'

const categories = [
  { id: 6, name: 'Beverages' },
  { id: 9, name: 'Breads & Fermented Foods' },
  { id: 7, name: 'Breakfast Foods' },
  { id: 3, name: 'Desserts' },
  { id: 8, name: 'Dietary Options' },
  { id: 2, name: 'Main Courses' },
  { id: 4, name: 'Salads & Appetizers' },
  { id: 5, name: 'Snacks' },
  { id: 1, name: 'Soup' }
]

const getCategoryImage = (categoryName) => {
  const images = {
    'Beverages': beveragesImg,
    'Breads & Fermented Foods': breadsImg,
    'Breakfast Foods': breakfastImg,
    'Desserts': dessertsImg,
    'Dietary Options': dietaryImg,
    'Main Courses': mainCoursesImg,
    'Salads & Appetizers': saladsImg,
    'Snacks': snacksImg,
    'Soup': soupImg
  }
  return images[categoryName]
}

// Geçici olarak rastgele tarif sayısı döndüren fonksiyon
const getRecipeCount = (categoryId) => {
  return Math.floor(Math.random() * 50) + 10
}
</script>

<style scoped>
.categories-page {
  background-color: #f8fafc;
}

.banner {
  background-color: #6C63FF;
  padding: 6rem 0 3rem;
  text-align: center;
}

.banner-content {
  max-width: 800px;
  margin: 0 auto;
  color: white;
}

.banner-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.highlight {
  color: #FF6B6B;
}

.banner-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.stats-section {
  background: white;
  padding: 2rem 0;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.stat-item i {
  font-size: 2rem;
  color: #6C63FF;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.categories-section {
  padding: 2rem 0 5rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.category-card {
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.category-content {
  display: block;
  height: 100%;
  text-decoration: none;
  color: white;
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
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.7)
  );
  transition: all 0.3s ease;
}

.category-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  z-index: 1;
}

.category-info h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.recipe-count {
  font-size: 1rem;
  opacity: 0.9;
}

.category-card:hover .category-bg {
  transform: scale(1.05);
}

.category-card:hover .category-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8)
  );
}

@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .banner {
    padding: 4rem 0 2rem;
  }

  .banner-content h1 {
    font-size: 2.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .category-card {
    height: 250px;
  }
}
</style> 