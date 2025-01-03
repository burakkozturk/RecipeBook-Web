<template>
  <section class="categories-section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Categories</h2>
        <p>Explore our most popular recipe categories</p>
      </div>

      <div class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <router-link :to="category.link" class="category-content">
            <div class="category-bg" :style="{ backgroundImage: `url(${category.image})` }"></div>
            <div class="category-overlay"></div>
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p>{{ category.count }} Recipes</p>
              <span class="explore-btn">
                Explore <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="explore-all-wrapper">
        <router-link to="/categories" class="explore-all-btn">
          Explore All Categories
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import mainDishesImg from '@/assets/main.webp'
import dessertsImg from '@/assets/dessert.webp'
import beveragesImg from '@/assets/beverages.jpeg'
import soupImg from '@/assets/soup.webp'

const categories = [
  {
    id: 1,
    name: 'Main Dishes',
    icon: 'fas fa-utensils',
    count: 120,
    link: '/category/main-dishes',
    image: mainDishesImg
  },
  {
    id: 2,
    name: 'Desserts',
    icon: 'fas fa-cookie',
    count: 85,
    link: '/category/desserts',
    image: dessertsImg
  },
  {
    id: 3,
    name: 'Beverages',
    icon: 'fas fa-glass-martini-alt',
    count: 45,
    link: '/category/beverages',
    image: beveragesImg
  },
  {
    id: 4,
    name: 'Soups',
    icon: 'fas fa-soup',
    count: 35,
    link: '/category/soups',
    image: soupImg
  }
]
</script>

<style scoped>
.categories-section {
  padding: 5rem 0;
  background-color: #f8fafc;
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 0.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.category-card {
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
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
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.category-info p {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
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

.category-card:hover .category-info {
  transform: translateY(0);
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
    gap: 1rem;
  }

  .category-card {
    height: 320px;
  }
}

@media (max-width: 768px) {
  .categories-section {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .category-card {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .category-card {
    height: 250px;
  }
}

.explore-all-wrapper {
  text-align: center;
  margin-top: 3rem;
}

.explore-all-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #6C63FF;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.explore-all-btn:hover {
  background-color: #6C63FF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 100, 47, 0.2);
}

@media (max-width: 768px) {
  .explore-all-btn {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}
</style> 