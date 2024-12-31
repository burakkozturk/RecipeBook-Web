<template>
  <section class="featured-section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Recipes</h2>
        <p>Discover our most popular and trending recipes</p>
      </div>

      <div class="row g-4">
        <!-- Recipe Card -->
        <div class="col-md-4" v-for="recipe in featuredRecipes" :key="recipe.id">
          <div class="recipe-card">
            <div class="recipe-image" :style="{ backgroundImage: `url(${recipe.image})` }">
              <span class="recipe-tag">{{ recipe.tag }}</span>
            </div>
            <div class="recipe-content">
              <h3>{{ recipe.title }}</h3>
              <p>{{ recipe.description }}</p>
              <div class="recipe-meta">
                <span><i class="far fa-clock"></i> {{ recipe.time }} mins</span>
                <span><i class="fas fa-signal"></i> {{ recipe.difficulty }}</span>
              </div>
              <router-link :to="recipe.link" class="view-recipe">
                View Recipe <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const featuredRecipes = [
  {
    id: 1,
    title: 'Turkish Kebab',
    description: 'Traditional Turkish kebab with special spices and sauce',
    image: new URL('@/assets/food.jpg', import.meta.url).href,
    tag: 'Popular',
    time: 45,
    difficulty: 'Medium',
    link: '/recipe/turkish-kebab'
  },
  {
    id: 2,
    title: 'Carbonara Pasta',
    description: 'Classic Italian pasta with creamy sauce and bacon',
    image: new URL('@/assets/pasta.webp', import.meta.url).href,
    tag: 'Trending',
    time: 30,
    difficulty: 'Easy',
    link: '/recipe/carbonara'
  },
  {
    id: 3,
    title: 'Mediterranean Salad',
    description: 'Fresh and healthy Mediterranean style salad',
    image: new URL('@/assets/food.jpg', import.meta.url).href,
    tag: 'Healthy',
    time: 15,
    difficulty: 'Easy',
    link: '/recipe/mediterranean-salad'
  }
]
</script>

<style scoped>
.featured-section {
  padding: 5rem 0;
  background-color: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2D3748;
  margin-bottom: 1rem;
}

.section-header p {
  color: #718096;
  font-size: 1.1rem;
}

.recipe-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.3s ease;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.05);
}

.recipe-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #FF6B6B;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
}

.recipe-content {
  padding: 1.5rem;
}

.recipe-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #2D3748;
}

.recipe-content p {
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  color: #718096;
  font-size: 0.9rem;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.recipe-meta i {
  color: #6C63FF;
}

.view-recipe {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6C63FF;
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s ease;
}

.view-recipe:hover {
  gap: 0.8rem;
}

@media (max-width: 768px) {
  .featured-section {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }
}
</style> 