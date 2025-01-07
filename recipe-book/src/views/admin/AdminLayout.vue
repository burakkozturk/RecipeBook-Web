<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <div class="nav-header">
        <h1>Admin Panel</h1>
        <router-link to="/" class="home-link">
          <i class="fas fa-home"></i>
          Back to Site
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/admin" class="nav-link" exact>
          <i class="fas fa-chart-line"></i>
          Dashboard
        </router-link>
        <router-link to="/admin/users" class="nav-link">
          <i class="fas fa-users"></i>
          Users
        </router-link>
        <router-link to="/admin/recipes" class="nav-link">
          <i class="fas fa-utensils"></i>
          Recipes
        </router-link>
        <router-link to="/admin/categories" class="nav-link">
          <i class="fas fa-tags"></i>
          Categories
        </router-link>
        <router-link to="/admin/featured" class="nav-link">
          <i class="fas fa-star"></i>
          Featured
        </router-link>
      </div>
    </nav>
    <main class="admin-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;
}

.admin-nav {
  width: 280px;
  background: white;
  padding: 2rem;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.nav-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.home-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.home-link:hover {
  background: #f3f4f6;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link i {
  font-size: 1.25rem;
  width: 24px;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #6366f1;
}

.nav-link.router-link-active {
  background: #6366f1;
  color: white;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .admin-nav {
    width: 80px;
    padding: 1rem;
  }

  .nav-header h1,
  .home-link span,
  .nav-link span {
    display: none;
  }

  .home-link,
  .nav-link {
    justify-content: center;
    padding: 0.75rem;
  }

  .nav-link i {
    margin: 0;
    font-size: 1.5rem;
  }
}
</style> 