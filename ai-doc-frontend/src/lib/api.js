// src/api.js
import axios from 'axios'

// Base URL
// - In dev: use '/api' to leverage Vite's dev proxy (configure it in vite.config.js).
// - In prod: use VITE_API_URL (e.g., https://api.example.com/api).
const BASE_URL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL || '/api')

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

// Attach auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.assign('/login')
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/users/me'),
}

// Reports API
export const reportsAPI = {
  // IMPORTANT: do NOT set Content-Type manually for FormData
  // axios will set multipart/form-data with proper boundary
  upload: (formData) => api.post('/reports/upload', formData),
  getAll: () => api.get('/reports'),
  getById: (id) => api.get(`/reports/${id}`),
  delete: (id) => api.delete(`/reports/${id}`),
}

// AI Processing API
export const aiAPI = {
  translate: (data) => api.post('/process/translate', data),
  explain: (data) => api.post('/process/explain', data),
  getTips: (data) => api.post('/process/tips', data),
}

// Chat API
export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  getHistory: (reportId) => api.get(`/chat/history/${reportId}`),
}

export default api
