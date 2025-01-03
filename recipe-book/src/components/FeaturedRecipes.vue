<template>
  <section class="featured-section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Recipes</h2>
        <p>Discover our most popular and trending recipes</p>
      </div>

      <div class="recipes-grid">
        <div v-for="recipe in featuredRecipes" :key="recipe.id" class="recipe-card">
          <div class="recipe-image-wrapper">
            <div class="recipe-image" :style="{ backgroundImage: `url(${recipe.image})` }">
              <div class="recipe-badges">
                <span class="badge difficulty">{{ recipe.difficulty }}</span>
                <span class="badge time">{{ recipe.cookTime }}m</span>
              </div>
            </div>
          </div>
          <div class="recipe-content">
            <div class="recipe-tags">
              <span class="tag">{{ recipe.category }}</span>
            </div>
            <h3 class="recipe-title">{{ recipe.title }}</h3>
            <p class="recipe-description">{{ recipe.description }}</p>
          </div>
          <div class="recipe-footer">
            <div class="recipe-times">
              <div class="time-item">
                <span class="time-label">COOK TIME</span>
                <span class="time-value">{{ recipe.cookTime }}m</span>
              </div>
            </div>
            <div class="recipe-actions">
              <div class="recipe-stats">
                <button class="stat-button" @click.prevent="toggleLike(recipe)">
                  <i class="fas fa-heart" :class="{ 'liked': recipe.isLiked }"></i>
                  <span>{{ recipe.likes }}</span>
                </button>
                <div class="stat-item">
                  <i class="fas fa-comment"></i>
                  <span>{{ recipe.comments }}</span>
                </div>
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
    image: '/images/recipes/pizza.jpg',
    category: 'Italian',
    cookTime: 30,
    difficulty: 'Medium',
    likes: 245,
    comments: 18,
    link: '/recipe/1',
    isLiked: false
  },
  {
    id: 2,
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a molten center',
    image: '/images/recipes/chocolate-cake.jpg',
    category: 'Desserts',
    cookTime: 25,
    difficulty: 'Easy',
    likes: 189,
    comments: 12,
    link: '/recipe/2',
    isLiked: false
  },
  {
    id: 3,
    title: 'Asian Stir-Fry Noodles',
    description: 'Quick and flavorful noodles with vegetables and your choice of protein',
    image: '/images/recipes/noodles.jpg',
    category: 'Asian',
    cookTime: 20,
    difficulty: 'Easy',
    likes: 167,
    comments: 15,
    link: '/recipe/3',
    isLiked: false
  }
]

const toggleLike = (recipe) => {
  recipe.isLiked = !recipe.isLiked
  recipe.likes += recipe.isLiked ? 1 : -1
}
</script>

<style scoped>
.featured-section {
  padding: 4rem 0;
  background-color: #f8fafc;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #6b7280;
  font-size: 1.1rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.recipe-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
}

.recipe-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}

.recipe-image-wrapper {
  position: relative;
  padding-top: 55%;
  flex-shrink: 0;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.05);
}

.recipe-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.badge {
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recipe-content {
  padding: 1.5rem;
  flex: 1;
}

.recipe-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #6366f1;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #6366f1;
  color: white;
}

.recipe-title {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: .3rem;
  color: #1f2937;
}

.recipe-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3em;
  height: auto;
  max-height: 4.8em;
}

.recipe-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  margin-top: auto;
}

.recipe-times {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1.2rem;
}

.time-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.time-label {
  font-size: 0.7rem;
  color: #6b7280;
  letter-spacing: 0.5px;
  margin-bottom: 0.2rem;
}

.time-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.recipe-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e5e7eb;
}

.recipe-stats {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.stat-button, .stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.stat-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-button:hover {
  color: #ef4444;
  background: #f3f4f6;
}

.stat-button i.liked {
  color: #ef4444;
}

.view-recipe {
  background: #6366f1;
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-recipe:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }

  .recipe-image-wrapper {
    padding-top: 50%;
  }

  .recipe-content {
    padding: 1.25rem;
  }

  .recipe-footer {
    padding: 1.25rem;
  }

  .time-value {
    font-size: 1rem;
  }

  .recipe-title {
    font-size: 1.3rem;
  }

  .recipe-description {
    font-size: 0.95rem;
  }

  .recipe-times {
    gap: 2rem;
  }

  .recipe-stats {
    gap: 0.8rem;
  }

  .stat-button, .stat-item {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
  }

  .view-recipe {
    padding: 0.5rem 1rem;
    min-width: 100px;
  }
}
</style> 