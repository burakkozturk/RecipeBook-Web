<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>Recipe Book</h2>
        <span class="admin-badge">Admin Panel</span>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-item">
          <i class="fas fa-chart-line"></i>
          Dashboard
        </router-link>
        <router-link to="/admin/recipes" class="nav-item">
          <i class="fas fa-utensils"></i>
          Recipes
        </router-link>
        <router-link to="/admin/categories" class="nav-item">
          <i class="fas fa-tags"></i>
          Categories
        </router-link>
        <router-link to="/admin/users" class="nav-item">
          <i class="fas fa-users"></i>
          Users
        </router-link>
        <router-link to="/admin/comments" class="nav-item">
          <i class="fas fa-comments"></i>
          Comments
        </router-link>
        <router-link to="/admin/settings" class="nav-item">
          <i class="fas fa-cog"></i>
          Settings
        </router-link>
      </nav>
    </aside>

    <main class="admin-main">
      <header class="admin-header">
        <div class="header-search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search...">
        </div>
        
        <div class="header-actions">
          <button class="notification-btn">
            <i class="fas fa-bell"></i>
            <span class="badge">3</span>
          </button>
          <div class="admin-profile">
            <img src="https://via.placeholder.com/40" alt="Admin">
            <div class="profile-info">
              <span class="name">John Doe</span>
              <span class="role">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div class="admin-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 280px;
  background: #1E293B;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

.sidebar-header h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.admin-badge {
  background: #6C63FF;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.8rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.nav-item:hover, .nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item i {
  font-size: 1.2rem;
  width: 24px;
}

.admin-main {
  flex: 1;
  background: #F1F5F9;
}

.admin-header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-search {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #F1F5F9;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 300px;
}

.header-search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.notification-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  color: #64748B;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #FF6B6B;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.admin-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-info .name {
  font-weight: 600;
  color: #1E293B;
}

.profile-info .role {
  font-size: 0.85rem;
  color: #64748B;
}

.admin-content {
  padding: 2rem;
}

@media (max-width: 991px) {
  .admin-sidebar {
    width: 80px;
    padding: 1rem;
  }

  .sidebar-header h2, .admin-badge, .nav-item span {
    display: none;
  }

  .nav-item {
    justify-content: center;
    padding: 1rem;
  }

  .nav-item i {
    margin: 0;
    font-size: 1.4rem;
  }

  .header-search {
    width: 200px;
  }

  .profile-info {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-search {
    display: none;
  }
}
</style> 