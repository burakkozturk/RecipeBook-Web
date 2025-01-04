<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <div class="nav-header">
        <h1>Admin Panel</h1>
        <router-link to="/" class="home-link">
          <i class="fas fa-home"></i>
          Ana Sayfaya Dön
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
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.nav-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.nav-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.home-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  color: #4b5563;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.home-link:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-1px);
}

.home-link i {
  font-size: 1.25rem;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link i {
  font-size: 1.25rem;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #4f46e5;
}

.nav-link.router-link-active {
  background: #e0e7ff;
  color: #4f46e5;
}

.admin-content {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .admin-nav {
    width: 80px;
    padding: 1rem;
  }

  .nav-header h1,
  .nav-link span,
  .home-link span {
    display: none;
  }

  .nav-link,
  .home-link {
    justify-content: center;
    padding: 0.75rem;
  }

  .nav-link i,
  .home-link i {
    margin: 0;
    font-size: 1.5rem;
  }
}
</style> 