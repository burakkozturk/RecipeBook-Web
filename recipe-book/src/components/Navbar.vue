<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/">
        <span class="brand-text">Recipe</span>
        <span class="brand-text-alt">Book</span>
      </router-link>

      <!-- Hamburger Menu -->
      <button 
        class="navbar-toggler border-0" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Content -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active">
              <i class="fas fa-home"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/categories" class="nav-link">Categories</router-link>
          </li>
          <li class="nav-item search-item">
            <div class="search-box">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search recipes..."
              >
              <button class="search-btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </li>
        </ul>

        <!-- Auth Buttons -->
        <div class="d-flex gap-3 auth-buttons">
          <!-- Giriş yapılmamışsa -->
          <template v-if="!authStore.isAuthenticated()">
            <router-link to="/login" class="btn btn-login">
              Login
            </router-link>
            <router-link to="/register" class="btn btn-register">
              Register
            </router-link>
          </template>

          <!-- Giriş yapılmışsa -->
          <template v-else>
            <router-link to="/profile" class="btn btn-profile" :title="authStore.user.username">
              <i class="fas fa-user"></i>
              <span class="username-tooltip">{{ authStore.user.username }}</span>
            </router-link>
            <button @click="handleLogout" class="btn btn-logout">
              <i class="fas fa-sign-out-alt"></i>
              Sign Out
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #6C63FF;
  padding: 0.8rem 0;
  box-shadow: 0 4px 20px rgba(108, 99, 255, 0.15);
}

.navbar-brand {
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand-text {
  color: #fff;
}

.brand-text-alt {
  color: #FF6B6B;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  padding: 0.6rem 1.2rem !important;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin: 0 0.2rem;
}

.nav-link:hover,
.nav-link.active {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-link i {
  font-size: 1.2rem;
}

.btn {
  padding: 0.6rem 1.8rem;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-login {
  color: #fff;
  background-color: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
}

.btn-login:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-register {
  background-color: #fff;
  color: #6C63FF;
}

.btn-register:hover {
  background-color: #f8f9fa;
  color: #6C63FF;
}

.search-item {
  margin: 0 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 0.3rem;
  min-width: 300px;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background-color: rgba(255, 255, 255, 0.2);
}

.search-box .form-control {
  border: none;
  background: transparent;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
}

.search-box .form-control::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-box .form-control:focus {
  box-shadow: none;
}

.search-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  color: #fff;
}

.btn-profile {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.6rem;
  width: 42px;
  height: 42px;
}

.btn-profile:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.username-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  bottom: -40px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(-5px);
}

.username-tooltip::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 5px 5px 5px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
}

.btn-profile:hover .username-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.btn-logout {
  background-color: #FF6B6B;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-logout:hover {
  background-color: #ff5252;
  color: #fff;
}

.btn i {
  font-size: 1rem;
}

@media (max-width: 991px) {
  .navbar-collapse {
    background-color: #6C63FF;
    padding: 1rem;
    border-radius: 12px;
    margin-top: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .nav-item {
    text-align: center;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    gap: 0.8rem !important;
    margin-top: 1rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .search-box {
    min-width: 100%;
    margin: 1rem 0;
  }
}
</style> 