<template>
  <section class="categories-section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Categories</h2>
        <p>Explore recipes by category</p>
      </div>

      <div class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <router-link :to="category.link" class="category-link">
            <div class="category-icon">
              <i :class="category.icon"></i>
            </div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.count }} Recipes</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    id: 1,
    name: 'Main Dishes',
    icon: 'fas fa-utensils',
    count: 120,
    link: '/category/main-dishes'
  },
  {
    id: 2,
    name: 'Desserts',
    icon: 'fas fa-cookie',
    count: 85,
    link: '/category/desserts'
  },
  {
    id: 3,
    name: 'Breakfast',
    icon: 'fas fa-egg',
    count: 65,
    link: '/category/breakfast'
  },
  {
    id: 4,
    name: 'Healthy',
    icon: 'fas fa-carrot',
    count: 95,
    link: '/category/healthy'
  },
  {
    id: 5,
    name: 'Turkish',
    icon: 'fas fa-moon',
    count: 75,
    link: '/category/turkish'
  },
  {
    id: 6,
    name: 'Vegetarian',
    icon: 'fas fa-leaf',
    count: 60,
    link: '/category/vegetarian'
  }
]
</script>

<style scoped>
.categories-section {
  padding: 5rem 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2D3748;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #718096;
  font-size: 1.1rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #6C63FF;
}

.category-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 2rem;
  text-align: center;
}

.category-icon {
  width: 70px;
  height: 70px;
  background: #6C63FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1);
  background: #FF6B6B;
}

.category-icon i {
  font-size: 1.8rem;
  color: white;
}

.category-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2D3748;
  margin-bottom: 0.5rem;
}

.category-card p {
  color: #718096;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .categories-section {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .category-link {
    padding: 1.5rem;
  }

  .category-icon {
    width: 60px;
    height: 60px;
  }

  .category-icon i {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style> 