import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  const initTheme = () => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme,
    initTheme,
  }
})
