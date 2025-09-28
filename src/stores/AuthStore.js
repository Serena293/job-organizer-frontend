import { defineStore } from 'pinia'
import { API_BASE_URL } from '@/config/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt') || null,
    email: null,
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    login(token, email) {
      this.token = token
      this.email = email
      localStorage.setItem('jwt', token)

      this.fetchProfile()
    },

    logout() {
      this.token = null
      this.email = null
      this.user = null
      localStorage.removeItem('jwt')
    },

    async fetchProfile() {
      if (!this.token) return

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Error fetching profile')
        }

        const data = await response.json()
        this.user = data
        this.email = data.email
      } catch (error) {
        console.error('Errore fetchProfile:', error)
        // this.logout()
        // console.log(this.token)
      }
    },
    async updateProfile(updatedData) {
      if (!this.token) throw new Error('Missing token')

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify(updatedData),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Update failed: ${errorText}`)
        }

        const data = await response.json()
        this.user = data
        this.email = data.email
        return data
      } catch (error) {
        console.error('Errore updateProfile:', error)
        throw error
      }
    },
  },
})
