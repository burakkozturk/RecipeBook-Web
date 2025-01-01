<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Sol Taraf - Form -->
      <div class="auth-left">
        <div class="auth-header">
          <router-link to="/" class="logo">
            Recipe<span class="highlight">Book</span>
          </router-link>
          <h1>Create Account</h1>
          <p>Join our amazing cooking community</p>
        </div>

        <form class="auth-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <label>
              <i class="fas fa-user"></i>
              Full Name
            </label>
            <input 
              type="text" 
              v-model="formData.name"
              :class="{ 'error': errors.name }"
              placeholder="Enter your full name"
            >
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label>
              <i class="fas fa-at"></i>
              Username
            </label>
            <input 
              type="text" 
              v-model="formData.username"
              :class="{ 'error': errors.username }"
              placeholder="Choose a username"
            >
            <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
          </div>

          <div class="form-group">
            <label>
              <i class="fas fa-envelope"></i>
              Email
            </label>
            <input 
              type="email" 
              v-model="formData.email"
              :class="{ 'error': errors.email }"
              placeholder="Enter your email"
            >
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label>
              <i class="fas fa-lock"></i>
              Password
            </label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                :class="{ 'error': errors.password }"
                placeholder="Create a password"
              >
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
            <span class="password-hint">Must be at least 8 characters</span>
          </div>

          <div class="form-group terms-group">
            <div class="terms-checkbox">
              <input 
                type="checkbox" 
                id="terms" 
                v-model="agreeToTerms"
                class="custom-checkbox"
              >
              <label for="terms" class="terms-label">
                <div class="checkbox-wrapper">
                  <div class="checkbox-custom">
                    <i class="fas fa-check"></i>
                  </div>
                </div>
                <div class="terms-text">
                  I agree to the <a href="#" class="terms-link">Terms of Service</a> and 
                  <a href="#" class="terms-link">Privacy Policy</a>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading || !agreeToTerms">
            <i class="fas fa-user-plus"></i>
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div class="divider">or continue with</div>

          <div class="social-buttons">
            <button type="button" class="social-btn">
              <i class="fab fa-google"></i>
              Google
            </button>
            <button type="button" class="social-btn">
              <i class="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>

          <div class="auth-footer">
            Already have an account? <router-link to="/login">Sign In</router-link>
          </div>
        </form>
      </div>

      <!-- Sağ Taraf - İllüstrasyon -->
      <div class="auth-right">
        <div class="feature-list">
          <div class="feature-item">
            <i class="fas fa-utensils"></i>
            <h3>Share Your Recipes</h3>
            <p>Share your favorite recipes with our growing community</p>
          </div>
          <div class="feature-item">
            <i class="fas fa-users"></i>
            <h3>Join the Community</h3>
            <p>Connect with food lovers from around the world</p>
          </div>
          <div class="feature-item">
            <i class="fas fa-star"></i>
            <h3>Get Inspired</h3>
            <p>Discover new recipes and cooking techniques</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast/Notification komponenti -->
    <div class="toast-container" v-if="notification.show">
      <div class="toast" :class="notification.type">
        <div class="toast-icon">
          <i :class="getNotificationIcon"></i>
        </div>
        <div class="toast-content">
          <h4>{{ notification.title }}</h4>
          <p>{{ notification.message }}</p>
        </div>
        <button class="toast-close" @click="closeNotification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  authorities: ['ROLE_USER']
})

const errors = reactive({
  name: '',
  username: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const agreeToTerms = ref(false)
const isLoading = ref(false)

const notification = reactive({
  show: false,
  type: 'error', // 'error' | 'success'
  title: '',
  message: '',
  timeout: null
})

const getNotificationIcon = computed(() => {
  return {
    'fas fa-exclamation-circle': notification.type === 'error',
    'fas fa-check-circle': notification.type === 'success'
  }
})

const showNotification = (type, title, message, duration = 8000) => {
  if (notification.timeout) {
    clearTimeout(notification.timeout)
  }
  
  notification.show = true
  notification.type = type
  notification.title = title
  notification.message = message
  
  notification.timeout = setTimeout(() => {
    closeNotification()
  }, duration)
}

const closeNotification = () => {
  notification.show = false
}

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.username = ''
  errors.email = ''
  errors.password = ''

  if (!formData.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  if (!formData.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  } else if (formData.username.length < 5) {
    errors.username = 'Username must be at least 5 characters'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}
/* 
const handleRegister = async () => {
  if (!validateForm()) return

  if (!agreeToTerms.value) {
    showNotification(
      'error',
      'Terms Required',
      'Please agree to the Terms and Privacy Policy to continue'
    )
    return
  }

  try {
    isLoading.value = true
    const response = await axios.post('http://localhost:9191/auth/register', formData)
    
    if (response.data) {
      showNotification(
        'success',
        'Registration Successful',
        'Your account has been created successfully. Redirecting to login...'
      )
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (error) {
    let errorMessage = 'Registration failed. Please try again.'
    let errorTitle = 'Registration Error'

    if (error.response?.data) {
      // Backend'den gelen JSON hata mesajını işle
      const backendError = error.response.data
      
      // Eğer username property'si varsa (password hatası durumu)
      if (backendError.username) {
        errorTitle = 'Password Error'
        errorMessage = backendError.username
      } 
      // Diğer hata durumları
      else if (typeof backendError === 'string') {
        errorMessage = backendError
      } else if (backendError.message) {
        errorMessage = backendError.message
      }
    }

    showNotification('error', errorTitle, errorMessage)
    console.error('Registration error details:', error.response?.data)
  } finally {
    isLoading.value = false
  }
}*/

const handleRegister = async () => {
  if (!validateForm()) return

  if (!agreeToTerms.value) {
    showNotification(
      'error',
      'Terms Required',
      'Please agree to the Terms and Privacy Policy to continue'
    )
    return
  }

  try {
    isLoading.value = true
    const response = await axios.post('http://localhost:9191/auth/register', formData)
    
    if (response.data) {
      showNotification(
        'success',
        'Registration Successful',
        'Your account has been created successfully. Redirecting to login...'
      )
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (error) {
    if (error.response?.data) {
      // Sadece password hata mesajını göster
      const errorMessage = error.response.data.password || error.response.data.username || 'Registration failed'
      
      showNotification(
        'error',
        'Password Error',
        errorMessage
      )
    }
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #f3f4f6;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.auth-right {
  flex: 1;
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
  margin-bottom: 2rem;
}

.highlight {
  color: #6366f1;
}

.auth-header h1 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group label i {
  color: #6366f1;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  outline: none;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
}

.password-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  position: relative;
}

.checkbox-label input:checked + .checkbox-custom {
  background: #6366f1;
  border-color: #6366f1;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #4f46e5;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  color: #6b7280;
  margin: 1.5rem 0;
  position: relative;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  padding: 0.75rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.feature-list {
  text-align: center;
}

.feature-item {
  margin-bottom: 2.5rem;
}

.feature-item i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.feature-item p {
  opacity: 0.9;
  line-height: 1.5;
}

.auth-footer {
  text-align: center;
  color: #6b7280;
}

.auth-footer a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .auth-right {
    display: none;
  }
  
  .auth-container {
    max-width: 500px;
  }
}

@media (max-width: 640px) {
  .auth-page {
    padding: 1rem;
  }

  .auth-left {
    padding: 2rem;
  }

  .social-buttons {
    grid-template-columns: 1fr;
  }
}

.terms-group {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.terms-checkbox {
  position: relative;
}

.custom-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.terms-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-wrapper {
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-custom {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.checkbox-custom i {
  color: white;
  font-size: 0.75rem;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s ease;
}

.custom-checkbox:checked ~ .terms-label .checkbox-custom {
  background: #6366f1;
  border-color: #6366f1;
}

.custom-checkbox:checked ~ .terms-label .checkbox-custom i {
  opacity: 1;
  transform: scale(1);
}

.custom-checkbox:focus ~ .terms-label .checkbox-custom {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.terms-text {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.5;
}

.terms-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.2s ease;
}

.terms-link:hover {
  color: #4f46e5;
}

.terms-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.terms-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.submit-btn {
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px rgba(99, 102, 241, 0.3);
}

.submit-btn:disabled {
  background: #9ca3af;
  transform: none;
  box-shadow: none;
}

.divider {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #9ca3af;
  letter-spacing: 1px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider::before {
  margin-right: 1rem;
}

.divider::after {
  margin-left: 1rem;
}

.social-buttons {
  margin-bottom: 2rem;
}

.social-btn {
  font-weight: 500;
  letter-spacing: 0.5px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.social-btn:hover {
  background: #f9fafb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.auth-footer {
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

.auth-footer a {
  font-weight: 600;
  margin-left: 0.5rem;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.toast-container {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 9999;
  pointer-events: auto;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 350px;
  max-width: 450px;
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease;
  border: 1px solid #e5e7eb;
}

.toast.error {
  border-left: 5px solid #ef4444;
  background: #fef2f2;
}

.toast.success {
  border-left: 5px solid #22c55e;
  background: #f0fdf4;
}

.toast-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast.error .toast-icon {
  color: #dc2626;
}

.toast.success .toast-icon {
  color: #16a34a;
}

.toast-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.35rem 0;
}

.toast-content p {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
}

.toast-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
}

.toast-close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1f2937;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .toast-container {
    top: 80px;
    right: 16px;
    left: 16px;
  }

  .toast {
    width: 100%;
    min-width: 0;
    margin-bottom: 0.75rem;
  }
}
</style> 