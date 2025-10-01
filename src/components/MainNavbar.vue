<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { useThemeStore } from '@/stores/themeStore.js'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const route = useRoute()

const isActiveLink = (routePath) => {
  return route.path === routePath
}

const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>


<template>
  <nav class="navbar">
    <div class="navbar-logo"> <RouterLink
          to="/"
          :class="[isActiveLink('/') ? 'link-active' : 'link-default']"
        >
          Home
        </RouterLink></div>

    <ul class="navbar-links">
     
      <li>
        <RouterLink
          to="/jobs"
          :class="[isActiveLink('/jobs') ? 'link-active' : 'link-default']"
        >
          Jobs
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/jobs/add"
          :class="[isActiveLink('/jobs/add') ? 'link-active md:whitespace-nowrap' : 'link-default md:whitespace-nowrap']"
        >
          Add Job
        </RouterLink>
      </li>
      <li v-if="isLoggedIn">
        <RouterLink
          to="/profile"
          :class="[isActiveLink('/profile') ? 'link-active' : 'link-default']"
        >
          Profile
        </RouterLink>
      </li>
      <li v-else>
        <RouterLink
          to="/login"
          :class="[isActiveLink('/login') ? 'link-active' : 'link-default']"
        >
          Profile
        </RouterLink>
      </li>

      <!-- dark mode -->
      <li>
        <button 
          @click="themeStore.toggleTheme"
          class="btn-toggle-theme"
          :aria-pressed="themeStore.isDark"
          aria-label="Toggle dark mode"
        >
          <i v-if="themeStore.isDark" class="pi pi-sun"></i>
          <i v-else class="pi pi-moon"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>
