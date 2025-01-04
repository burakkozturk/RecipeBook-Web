<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <router-link to="/" class="logo-link">
            Recipe<span>Book</span>
          </router-link>
        </div>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item" exact-active-class="active">
          <i class="fas fa-chart-line"></i>
          Dashboard
        </router-link>
        <router-link to="/admin/users" class="nav-item" active-class="active">
          <i class="fas fa-users"></i>
          Users
        </router-link>
        <router-link to="/admin/categories" class="nav-item" active-class="active">
          <i class="fas fa-th-large"></i>
          Categories
        </router-link>
        <router-link to="/admin/recipes" class="nav-item" active-class="active">
          <i class="fas fa-utensils"></i>
          Recipes
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

/* Navbar'ı gizle */
.admin-layout :deep(.navbar) {
  display: none !important;
}

.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.logo-link {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1f2937;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.logo-link span {
  color: #6366f1;
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sidebar-nav {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item i {
  font-size: 1.1rem;
  width: 24px;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.nav-item.active {
  background: #818cf8;
  color: white;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }

  .sidebar-header {
    padding: 1rem;
  }

  .logo-link {
    font-size: 1.2rem;
  }

  .nav-item span {
    display: none;
  }

  .main-content {
    margin-left: 80px;
  }
}
</style> 