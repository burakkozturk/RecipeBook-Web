import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const loading = ref(false)
  const error = ref(null)

  const login = async (username, password) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await axios.post('http://localhost:9191/auth/login', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const receivedToken = response.data
      token.value = receivedToken
      localStorage.setItem('token', receivedToken)

      // Login başarılı olduğunda kullanıcı bilgilerini set edelim
      const userData = {
        username,
        // Diğer bilgileri de ekleyebiliriz
      }
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))

      console.log('Login successful:', {
        token: receivedToken,
        user: userData
      })
      
      return true
    } catch (err) {
      console.error('Login error:', err)
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = () => !!token.value

  return {
    token,
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated
  }
}) 