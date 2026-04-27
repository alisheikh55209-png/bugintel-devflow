/**
 * Enhanced API Client for BugIntel
 * Supports both Next.js and Django backends
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || 'http://localhost:8000/api'

interface FetchOptions extends RequestInit {
  timeout?: number
}

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status?: number
}

/**
 * Fetcher function for SWR with error handling
 */
async function fetcher<T = any>(url: string, options?: FetchOptions): Promise<T> {
  const timeout = options?.timeout || 8000
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = new Error('API request failed')
      error.status = response.status
      throw error
    }

    const data = await response.json()
    return data
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

/**
 * Next.js Backend API Client (for mock data)
 */
const nextjsApi = {
  async login(email: string, password: string) {
    return fetcher(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  },

  async getMetrics() {
    return fetcher(`${API_BASE_URL}/dashboard/metrics`)
  },

  async getBugs(page = 1, limit = 10) {
    return fetcher(`${API_BASE_URL}/bugs?page=${page}&limit=${limit}`)
  },

  async getProjects(page = 1, limit = 10) {
    return fetcher(`${API_BASE_URL}/projects?page=${page}&limit=${limit}`)
  },

  async getDevelopers() {
    return fetcher(`${API_BASE_URL}/developers`)
  },
}

/**
 * Django Backend API Client (for production)
 */
const djangoApi = {
  async login(email: string, password: string) {
    return fetcher(`${DJANGO_API_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  },

  async getCurrentUser() {
    return fetcher(`${DJANGO_API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getMetrics() {
    return fetcher(`${DJANGO_API_URL}/metrics/team_statistics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getBugs(page = 1, filters = {}) {
    const params = new URLSearchParams({
      page: String(page),
      ...filters,
    })
    return fetcher(`${DJANGO_API_URL}/bugs/?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getProjectBugs(projectId: string) {
    return fetcher(`${DJANGO_API_URL}/projects/${projectId}/bugs/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getProjects(page = 1) {
    return fetcher(`${DJANGO_API_URL}/projects/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getProjectStats(projectId: string) {
    return fetcher(`${DJANGO_API_URL}/projects/${projectId}/statistics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getDevelopers() {
    return fetcher(`${DJANGO_API_URL}/users/team_members/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getDeveloperMetrics() {
    return fetcher(`${DJANGO_API_URL}/metrics/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async getTopPerformers() {
    return fetcher(`${DJANGO_API_URL}/metrics/top_performers/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },

  async reportBug(bugData: any) {
    return fetcher(`${DJANGO_API_URL}/bugs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(bugData),
    })
  },

  async updateBugStatus(bugId: string, status: string) {
    return fetcher(`${DJANGO_API_URL}/bugs/${bugId}/change_status/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    })
  },

  async assignBug(bugId: string, userId: string) {
    return fetcher(`${DJANGO_API_URL}/bugs/${bugId}/assign/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user_id: userId }),
    })
  },

  async addComment(bugId: string, content: string) {
    return fetcher(`${DJANGO_API_URL}/bugs/${bugId}/add_comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ content, author: localStorage.getItem('userId') }),
    })
  },
}

/**
 * Adaptive API Client
 * Switches between Next.js and Django based on environment
 */
export const apiClient = {
  fetcher,
  
  // Use Django API in production, Next.js in development
  ...(process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_DJANGO === 'true'
    ? djangoApi
    : nextjsApi),
  
  // Utility methods
  setToken(token: string) {
    localStorage.setItem('token', token)
  },

  getToken() {
    return localStorage.getItem('token')
  },

  clearToken() {
    localStorage.removeItem('token')
  },

  setUserId(userId: string) {
    localStorage.setItem('userId', userId)
  },

  getUserId() {
    return localStorage.getItem('userId')
  },

  isAuthenticated() {
    return !!this.getToken()
  },
}

export default apiClient
