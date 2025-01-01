<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-left">
        <div class="auth-header">
          <router-link to="/" class="logo">
            Recipe<span class="highlight">Book</span>
          </router-link>
          <h1>Welcome Back!</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div v-if="authStore.error" class="error-message">
            {{ authStore.error }}
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                placeholder="Username"
                required
                :disabled="authStore.loading"
              >
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <i class="fas fa-lock"></i>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password"
                placeholder="Password"
                required
                :disabled="authStore.loading"
              >
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            class="submit-btn"
            :disabled="authStore.loading"
          >
            <span v-if="!authStore.loading">Sign In</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i>
              Loading...
            </span>
          </button>

          <div class="social-login">
            <p>Or continue with</p>
            <div class="social-buttons">
              <button type="button" class="social-btn google">
                <i class="fab fa-google"></i>
              </button>
              <button type="button" class="social-btn facebook">
                <i class="fab fa-facebook-f"></i>
              </button>
              <button type="button" class="social-btn apple">
                <i class="fab fa-apple"></i>
              </button>
            </div>
          </div>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <router-link to="/register">Sign Up</router-link></p>
        </div>
      </div>
      
      <div class="auth-right">
        <div class="overlay">
          <div class="overlay-content">
            <div class="overlay-icon">
              <i class="fas fa-utensils"></i>
            </div>
            <h2>Discover Amazing Recipes</h2>
            <p>Join our community and share your culinary creations with food lovers around the world.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const handleLogin = async () => {
  try {
    const success = await authStore.login(username.value, password.value)
    
    if (success) {
      // Login başarılı - ana sayfaya yönlendir
      router.push('/')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  margin-top: 4rem;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.auth-left {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
}

.auth-right {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.auth-right::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  transform: rotate(-45deg);
  top: -25%;
  left: -25%;
}

.overlay {
  position: relative;
  padding: 3rem;
  text-align: center;
  color: white;
  z-index: 1;
}

.overlay-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.overlay-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.overlay-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1f2937;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2rem;
}

.highlight {
  color: #6366f1;
}

.auth-header h1 {
  font-size: 2.25rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.auth-header p {
  color: #6b7280;
  font-size: 1.1rem;
  
}

.auth-form {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 1.25rem;
  color: #9ca3af;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.input-wrapper input {
  width: 100%;
  padding: 1rem 1.25rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.input-wrapper input:focus {
  border-color: #6366f1;
  background: white;
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.input-wrapper input:focus + i {
  color: #6366f1;
}

.toggle-password {
  position: absolute;
  right: 1.25rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 8px;
  width: 36px;
  height: 36px;
}

.input-wrapper input:focus ~ .toggle-password {
  color: #6366f1;
}

.toggle-password:hover i {
  transform: scale(1.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
}

.forgot-password {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.submit-btn {
  background: #6366f1;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.submit-btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

.social-login {
  text-align: center;
  margin-top: 1rem;
}

.social-login p {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #e5e7eb;
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  color: #4b5563;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
  transform: translateY(-2px);
}

.auth-footer {
  margin-top: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
}

.auth-footer a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .auth-right {
    display: none;
  }
  
  .auth-container {
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .auth-left {
    padding: 2rem;
  }
  
  .auth-header h1 {
    font-size: 2rem;
  }
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.fa-spinner {
  margin-right: 0.5rem;
}
</style> 