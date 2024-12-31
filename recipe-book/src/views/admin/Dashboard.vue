<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="stat-info">
          <h3>Total Recipes</h3>
          <p>1,234</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <h3>Total Users</h3>
          <p>5,678</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="stat-info">
          <h3>Total Reviews</h3>
          <p>9,012</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-eye"></i>
        </div>
        <div class="stat-info">
          <h3>Total Views</h3>
          <p>45,678</p>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3>Recent Recipes</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Author</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="recipe in recentRecipes" :key="recipe.id">
                <td>{{ recipe.name }}</td>
                <td>{{ recipe.author }}</td>
                <td>{{ recipe.category }}</td>
                <td>{{ recipe.date }}</td>
                <td>
                  <span :class="['status', recipe.status]">
                    {{ recipe.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="dashboard-card">
        <h3>Popular Categories</h3>
        <div class="category-list">
          <div v-for="category in popularCategories" :key="category.id" class="category-item">
            <div class="category-info">
              <h4>{{ category.name }}</h4>
              <p>{{ category.count }} recipes</p>
            </div>
            <div class="category-progress">
              <div class="progress-bar" :style="{ width: category.percentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentRecipes = [
  {
    id: 1,
    name: 'Turkish Kebab',
    author: 'John Doe',
    category: 'Main Course',
    date: '2024-03-15',
    status: 'published'
  },
  // ... diğer tarifler
]

const popularCategories = [
  {
    id: 1,
    name: 'Main Course',
    count: 234,
    percentage: 85
  },
  // ... diğer kategoriler
]
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: #6C63FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-info h3 {
  color: #64748B;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-info p {
  color: #1E293B;
  font-size: 1.8rem;
  font-weight: 600;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.dashboard-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.dashboard-card h3 {
  color: #1E293B;
  margin-bottom: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
}

th {
  color: #64748B;
  font-weight: 600;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.85rem;
}

.status.published {
  background: #DEF7EC;
  color: #03543F;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-info h4 {
  color: #1E293B;
  font-weight: 600;
}

.category-info p {
  color: #64748B;
  font-size: 0.9rem;
}

.category-progress {
  height: 6px;
  background: #E2E8F0;
  border-radius: 100px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #6C63FF;
  border-radius: 100px;
}

@media (max-width: 991px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style> 