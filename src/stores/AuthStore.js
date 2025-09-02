import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt') || null,
    email: null,
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  
  actions: {
    login(token, email) {
      this.token = token
      this.email = email
      localStorage.setItem('jwt', token)
    },
    
    logout() {
       
      this.token = null
      this.email = null
      localStorage.removeItem('jwt')
    
    }
  }
})