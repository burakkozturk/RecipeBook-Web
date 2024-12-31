<template>
  <section class="featured-section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Recipes</h2>
        <p>Discover our most popular and trending recipes</p>
      </div>

      <div class="recipes-grid">
        <div v-for="recipe in featuredRecipes" :key="recipe.id" class="recipe-card">
          <div class="recipe-image" :style="{ backgroundImage: `url(${recipe.image})` }">
            <div class="recipe-overlay">
              <div class="recipe-time">
                <i class="far fa-clock"></i>
                {{ recipe.cookTime }} mins
              </div>
              <div class="recipe-difficulty">
                {{ recipe.difficulty }}
              </div>
            </div>
          </div>
          <div class="recipe-content">
            <div class="recipe-category">{{ recipe.category }}</div>
            <h3 class="recipe-title">{{ recipe.title }}</h3>
            <p class="recipe-description">{{ recipe.description }}</p>
            <div class="recipe-footer">
              <div class="recipe-stats">
                <span><i class="fas fa-heart"></i> {{ recipe.likes }}</span>
                <span><i class="fas fa-comment"></i> {{ recipe.comments }}</span>
              </div>
              <router-link :to="recipe.link" class="view-recipe">
                View Recipe
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
    title: 'Classic Margherita Pizza',
    description: 'Traditional Italian pizza with fresh basil, mozzarella, and tomato sauce',
    image: '/src/assets/recipes/pizza.jpg',
    category: 'Italian',
    cookTime: 30,
    difficulty: 'Medium',
    likes: 245,
    comments: 18,
    link: '/recipe/margherita-pizza'
  },
  {
    id: 2,
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a molten center',
    image: '/src/assets/recipes/chocolate-cake.jpg',
    category: 'Desserts',
    cookTime: 25,
    difficulty: 'Easy',
    likes: 189,
    comments: 12,
    link: '/recipe/chocolate-lava-cake'
  },
  {
    id: 3,
    title: 'Asian Stir-Fry Noodles',
    description: 'Quick and flavorful noodles with vegetables and your choice of protein',
    image: '/src/assets/recipes/noodles.jpg',
    category: 'Asian',
    cookTime: 20,
    difficulty: 'Easy',
    likes: 167,
    comments: 15,
    link: '/recipe/stir-fry-noodles'
  }
]
</script>

<style scoped>
.featured-section {
  padding: 5rem 0;
  background-color: white;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
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

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.recipe-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  height: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.recipe-overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
}

.recipe-time, .recipe-difficulty {
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.recipe-content {
  padding: 1.5rem;
}

.recipe-category {
  color: #6C63FF;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.recipe-title {
  font-size: 1.4rem;
  color: #1e293b;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.recipe-description {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.recipe-stats {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.9rem;
}

.recipe-stats span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.recipe-stats i {
  color: #6C63FF;
}

.view-recipe {
  background: #6C63FF;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-recipe:hover {
  background: #5B52E5;
  transform: translateY(-2px);
}

@media (max-width: 1200px) {
  .recipes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .featured-section {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .recipe-image {
    height: 240px;
  }
}
</style> 