<template>
  <div class="admin-page">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <router-link to="/" class="logo">
          <span class="logo-text">Recipe<span class="highlight">Book</span></span>
        </router-link>
      </div>
      
      <div class="admin-profile">
        <img src="https://via.placeholder.com/80" alt="Admin">
        <div class="profile-info">
          <h3>John Doe</h3>
          <span class="role">Admin</span>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <a href="#dashboard" class="nav-item active">
          <i class="fas fa-chart-pie"></i>
          <span>Dashboard</span>
        </a>
        <a href="#recipes" class="nav-item">
          <i class="fas fa-utensils"></i>
          <span>Recipes</span>
        </a>
        <a href="#categories" class="nav-item">
          <i class="fas fa-tags"></i>
          <span>Categories</span>
        </a>
        <a href="#users" class="nav-item">
          <i class="fas fa-users"></i>
          <span>Users</span>
        </a>
        <a href="#comments" class="nav-item">
          <i class="fas fa-comments"></i>
          <span>Comments</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <a href="#settings" class="nav-item">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </a>
        <a href="#logout" class="nav-item">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>

    <main class="admin-main">
      <header class="admin-header">
        <div class="header-left">
          <h1>Dashboard</h1>
          <p>Welcome back, John Doe</p>
        </div>
        
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search...">
          </div>
          
          <button class="notification-btn">
            <i class="fas fa-bell"></i>
            <span class="badge">3</span>
          </button>
        </div>
      </header>

      <div class="admin-content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon recipes">
              <i class="fas fa-utensils"></i>
            </div>
            <div class="stat-info">
              <p>Total Recipes</p>
              <h3>1,234</h3>
              <span class="trend up">
                <i class="fas fa-arrow-up"></i> 12.5%
              </span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon users">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
              <p>Total Users</p>
              <h3>5,678</h3>
              <span class="trend up">
                <i class="fas fa-arrow-up"></i> 8.2%
              </span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon reviews">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-info">
              <p>Total Reviews</p>
              <h3>9,012</h3>
              <span class="trend up">
                <i class="fas fa-arrow-up"></i> 5.7%
              </span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon views">
              <i class="fas fa-eye"></i>
            </div>
            <div class="stat-info">
              <p>Total Views</p>
              <h3>45.6K</h3>
              <span class="trend down">
                <i class="fas fa-arrow-down"></i> 3.2%
              </span>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="chart-card">
            <h3>Activity Overview</h3>
            <!-- Chart gelecek -->
          </div>
          
          <div class="recent-card">
            <h3>Recent Activities</h3>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon">
                  <i class="fas fa-plus-circle"></i>
                </div>
                <div class="activity-info">
                  <p>New recipe added: <strong>Turkish Kebab</strong></p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <!-- Diğer aktiviteler -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-page {
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;
}

.admin-sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.logo {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.highlight {
  color: #6366f1;
}

.admin-profile {
  margin: 2rem 0;
  text-align: center;
}

.admin-profile img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.profile-info h3 {
  font-size: 1.1rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.role {
  font-size: 0.875rem;
  color: #6b7280;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-item:hover, .nav-item.active {
  background: #f3f4f6;
  color: #6366f1;
}

.nav-item i {
  font-size: 1.25rem;
}

.admin-main {
  flex: 1;
  padding: 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left h1 {
  font-size: 1.875rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.header-left p {
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.search-box input {
  border: none;
  outline: none;
  font-size: 0.875rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.recipes { background: #6366f1; }
.users { background: #10b981; }
.reviews { background: #f59e0b; }
.views { background: #ef4444; }

.stat-info p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.stat-info h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.trend {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend.up { color: #10b981; }
.trend.down { color: #ef4444; }

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.chart-card, .recent-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.activity-list {
  margin-top: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.activity-icon {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
}

.activity-info p {
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.activity-info span {
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 80px;
    padding: 1rem;
  }

  .logo-text, .profile-info, .nav-item span {
    display: none;
  }

  .admin-profile img {
    width: 40px;
    height: 40px;
  }

  .nav-item {
    justify-content: center;
    padding: 1rem;
  }

  .nav-item i {
    margin: 0;
  }

  .admin-main {
    padding: 1rem;
  }
}
</style> 