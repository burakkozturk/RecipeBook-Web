<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon recipes">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="stat-info">
          <h3>Total Recipes</h3>
          <p class="stat-value">1,234</p>
          <span class="stat-change positive">
            <i class="fas fa-arrow-up"></i> 12.5%
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon users">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <h3>Total Users</h3>
          <p class="stat-value">5,678</p>
          <span class="stat-change positive">
            <i class="fas fa-arrow-up"></i> 8.2%
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon reviews">
          <i class="fas fa-star"></i>
        </div>
        <div class="stat-info">
          <h3>Total Reviews</h3>
          <p class="stat-value">9,012</p>
          <span class="stat-change positive">
            <i class="fas fa-arrow-up"></i> 5.7%
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon views">
          <i class="fas fa-eye"></i>
        </div>
        <div class="stat-info">
          <h3>Total Views</h3>
          <p class="stat-value">45.6K</p>
          <span class="stat-change negative">
            <i class="fas fa-arrow-down"></i> 3.2%
          </span>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="activity-section">
        <h2>Recent Activities</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-plus-circle"></i>
            </div>
            <div class="activity-details">
              <p>New recipe added: Turkish Kebab</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <!-- Diğer aktiviteler buraya eklenebilir -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 1.5rem;
  color: white;
}

.stat-icon.recipes {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
}

.stat-icon.users {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
}

.stat-icon.reviews {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
}

.stat-icon.views {
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
}

.stat-info h3 {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.stat-change {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.dashboard-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.activity-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.activity-section h2 {
  font-size: 1.25rem;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
}

.activity-details {
  flex: 1;
}

.activity-details p {
  margin: 0;
  color: #1f2937;
  font-weight: 500;
}

.activity-details span {
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style> 