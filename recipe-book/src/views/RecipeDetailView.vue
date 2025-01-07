<template>
  <div class="recipe-detail">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading recipe...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
    </div>

    <div v-else class="recipe-content">
      <div class="recipe-hero">
        <img :src="recipe.imageUrl" :alt="recipe.title" class="hero-image">
        <div class="hero-overlay">
          <div class="hero-content">
            <div class="recipe-category">{{ recipe.category?.name }}</div>
            <h1>{{ recipe.title }}</h1>
            <p class="description">{{ recipe.description }}</p>
            <div class="recipe-meta">
              <div class="meta-item">
                <i class="fas fa-clock"></i>
                <div class="meta-details">
                  <span class="meta-label">Prep Time</span>
                  <span class="meta-value">{{ recipe.prepTime }}m</span>
                </div>
              </div>
              <div class="meta-item">
                <i class="fas fa-fire"></i>
                <div class="meta-details">
                  <span class="meta-label">Cook Time</span>
                  <span class="meta-value">{{ recipe.cookTime }}m</span>
                </div>
              </div>
              <div class="meta-item">
                <i class="fas fa-signal"></i>
                <div class="meta-details">
                  <span class="meta-label">Difficulty</span>
                  <span class="meta-value">{{ recipe.difficulty }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="recipe-author">
        <img :src="recipe.author?.profilePhoto" :alt="recipe.author?.name" class="author-avatar">
        <div class="author-details">
          <span class="author-name">{{ recipe.author?.name }}</span>
          <span class="publish-date">{{ formatDate(recipe.createdAt) }}</span>
        </div>
      </div>

      <div class="recipe-body">
        <div class="ingredients-section">
          <div class="section-header">
            <i class="fas fa-shopping-basket"></i>
            <h2>Ingredients</h2>
          </div>
          <ul class="ingredients-list">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
              <span class="ingredient-name">{{ ingredient.name }}</span>
              <span class="ingredient-quantity">{{ ingredient.quantity }}</span>
            </li>
          </ul>
        </div>

        <div class="instructions-section">
          <div class="section-header">
            <i class="fas fa-list-ol"></i>
            <h2>Instructions</h2>
          </div>
          <ol class="instructions-list">
            <li v-for="instruction in sortedInstructions" :key="instruction.id">
              <div class="instruction-step">
                <div class="step-number">{{ instruction.order }}</div>
                <p>{{ instruction.step }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="tags-section">
          <div class="section-header">
            <i class="fas fa-tags"></i>
            <h2>Tags</h2>
          </div>
          <div class="tags-list">
            <span v-for="tag in recipe.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const recipe = ref({})
const loading = ref(true)
const error = ref(null)

const sortedInstructions = computed(() => {
  if (!recipe.value.instructions) return []
  return [...recipe.value.instructions].sort((a, b) => a.order - b.order)
})

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

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

onMounted(fetchRecipe)
</script>

<style scoped>
.recipe-detail {
  min-height: 100vh;
  background: #f8fafc;
}

.recipe-hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
  display: flex;
  align-items: flex-end;
  padding: 4rem;
}

.hero-content {
  max-width: 800px;
  color: white;
}

.recipe-category {
  display: inline-block;
  background: #6366f1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.recipe-meta {
  display: flex;
  gap: 2.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meta-item i {
  font-size: 1.5rem;
  color: #6366f1;
  background: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meta-details {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.meta-value {
  font-size: 1.125rem;
  font-weight: 600;
}

.recipe-author {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #1f2937;
}

.publish-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.recipe-body {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-header i {
  font-size: 1.5rem;
  color: #6366f1;
  background: #f3f4f6;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.ingredients-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.ingredients-list li:last-child {
  border-bottom: none;
}

.ingredient-name {
  font-weight: 500;
  color: #1f2937;
}

.ingredient-quantity {
  color: #6b7280;
  font-size: 0.875rem;
}

.instructions-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.instruction-step {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.step-number {
  width: 36px;
  height: 36px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.instruction-step p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.tags-section {
  grid-column: 1 / -1;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: #f3f4f6;
  color: #4b5563;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #6366f1;
  color: white;
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

@media (max-width: 1024px) {
  .recipe-hero {
    height: 60vh;
  }

  .hero-overlay {
    padding: 2rem;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .recipe-body {
    grid-template-columns: 1fr;
  }

  .recipe-meta {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .recipe-hero {
    height: 50vh;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1.1rem;
  }

  .recipe-author {
    margin: -1rem 1rem 0;
  }

  .recipe-body {
    padding: 0 1rem;
    margin: 2rem auto;
  }

  .meta-item {
    flex: 1;
    min-width: 120px;
  }
}
</style> 