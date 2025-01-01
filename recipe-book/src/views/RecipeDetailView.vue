<template>
  <div class="recipe-detail">
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading recipe...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else class="recipe-content">
      <!-- Hero Section -->
      <div class="recipe-hero" :style="{ backgroundImage: `url(${recipe.imageUrl})` }">
        <div class="hero-overlay">
          <div class="container">
            <div class="recipe-info">
              <div class="recipe-meta">
                <span class="difficulty">
                  <i class="fas fa-signal"></i> {{ recipe.difficulty }}
                </span>
                <span class="time">
                  <i class="far fa-clock"></i> {{ recipe.cookTime + recipe.prepTime }} mins
                </span>
              </div>
              <h1>{{ recipe.title }}</h1>
              <p class="description">{{ recipe.description }}</p>
              <div class="tags">
                <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container">
        <div class="recipe-grid">
          <!-- Left Column -->
          <div class="recipe-details">
            <div class="time-info">
              <div class="time-card">
                <div class="time-icon">
                  <i class="fas fa-hourglass-start"></i>
                </div>
                <div class="time-details">
                  <span class="time-value">{{ recipe.prepTime }}m</span>
                  <span class="time-label">Prep Time</span>
                </div>
              </div>
              <div class="time-card">
                <div class="time-icon">
                  <i class="fas fa-fire"></i>
                </div>
                <div class="time-details">
                  <span class="time-value">{{ recipe.cookTime }}m</span>
                  <span class="time-label">Cook Time</span>
                </div>
              </div>
              <div class="time-card">
                <div class="time-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="time-details">
                  <span class="time-value">{{ recipe.prepTime + recipe.cookTime }}m</span>
                  <span class="time-label">Total Time</span>
                </div>
              </div>
            </div>

            <div class="ingredients-section">
              <h2>Ingredients</h2>
              <ul class="ingredients-list">
                <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                  <span class="ingredient-name">{{ ingredient.name }}</span>
                  <span class="ingredient-quantity">{{ ingredient.quantity }}</span>
                </li>
              </ul>
            </div>

            <div class="instructions-section">
              <h2>Instructions</h2>
              <div class="instructions-list">
                <div v-for="instruction in recipe.instructions" 
                     :key="instruction.id" 
                     class="instruction-step">
                  <div class="step-number">{{ instruction.order }}</div>
                  <p>{{ instruction.step }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="recipe-sidebar">
            <div class="recipe-actions">
              <button class="like-button" @click="toggleLike">
                <i class="fas fa-heart" :class="{ 'liked': recipe.isLiked }"></i>
                <span>{{ recipe.likes || 0 }} likes</span>
              </button>
              <div class="action-buttons">
                <button class="action-button share-button">
                  <i class="fas fa-share"></i>
                  Share
                </button>
                <button class="action-button print-button" @click="printRecipe">
                  <i class="fas fa-print"></i>
                  PDF
                </button>
              </div>
            </div>

            <div class="recipe-category">
              <h3>Category</h3>
              <router-link :to="`/category/${recipe.category.id}`" class="category-link">
                {{ recipe.category.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const recipe = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchRecipe = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`http://localhost:9191/api/recipe/${route.params.id}`)
    recipe.value = response.data
  } catch (err) {
    error.value = 'Failed to load recipe. Please try again later.'
    console.error('Error fetching recipe:', err)
  } finally {
    loading.value = false
  }
}

const toggleLike = async () => {
  try {
    const response = await axios.post(`http://localhost:9191/api/recipe/${recipe.value.id}/like`)
    recipe.value.likes = response.data.likes
    recipe.value.isLiked = !recipe.value.isLiked
  } catch (err) {
    console.error('Error liking recipe:', err)
  }
}

const printRecipe = () => {
  window.print()
}

onMounted(fetchRecipe)
</script>

<style scoped>
.recipe-detail {
  background-color: #f8fafc;
  min-height: 100vh;
}

.recipe-hero {
  height: 60vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
  display: flex;
  align-items: flex-end;
  padding-bottom: 4rem;
}

.recipe-info {
  color: white;
  max-width: 800px;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.difficulty, .time {
  background: rgba(255,255,255,0.9);
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.recipe-info h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.description {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.tags {
  display: flex;
  gap: 0.8rem;
}

.tag {
  background: rgba(255,255,255,0.9);
  color: #6366f1;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.recipe-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  padding: 3rem 0;
}

.time-info {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.time-card {
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.time-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0,0,0,0.1);
}

.time-icon {
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.time-card:hover .time-icon {
  background: #6366f1;
  color: white;
  transform: scale(1.1);
}

.time-details {
  display: flex;
  flex-direction: column;
}

.time-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
}

.time-label {
  font-size: 0.9rem;
  color: #64748b;
}

.ingredients-section, .instructions-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.ingredients-list {
  list-style: none;
  padding: 0;
}

.ingredients-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.ingredient-name {
  color: #1e293b;
  font-weight: 500;
}

.ingredient-quantity {
  color: #6b7280;
}

.instruction-step {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.step-number {
  width: 32px;
  height: 32px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.recipe-sidebar {
  position: sticky;
  top: 2rem;
}

.recipe-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.like-button, .share-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.like-button {
  background: #ef4444;
  color: white;
  margin-bottom: 1rem;
}

.like-button:hover {
  background: #dc2626;
}

.like-button.liked {
  background: #dc2626;
}

.share-button {
  background: #f3f4f6;
  color: #4b5563;
}

.share-button:hover {
  background: #e5e7eb;
}

.recipe-category {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.recipe-category h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.category-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #6366f1;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.category-link:hover {
  background: #6366f1;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.print-button {
  background: #f3f4f6;
  color: #4b5563;
}

.print-button:hover {
  background: #e5e7eb;
  color: #1f2937;
}

@media (max-width: 1024px) {
  .recipe-grid {
    grid-template-columns: 1fr;
  }

  .recipe-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .recipe-hero {
    height: 50vh;
  }

  .hero-overlay {
    padding-bottom: 2rem;
  }

  .recipe-info h1 {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.1rem;
  }

  .time-info {
    flex-direction: column;
    gap: 1rem;
  }

  .time-card {
    padding: 1.2rem;
  }

  .time-icon {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .time-value {
    font-size: 1.3rem;
  }

  .time-label {
    font-size: 0.85rem;
  }

  .ingredients-section, .instructions-section {
    padding: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }

  .action-button {
    padding: 0.8rem;
  }
}

@media print {
  .recipe-actions,
  .recipe-sidebar {
    display: none;
  }

  .recipe-grid {
    display: block;
  }

  .recipe-hero {
    height: 300px;
  }

  .recipe-details {
    margin-top: 2rem;
  }
}
</style> 