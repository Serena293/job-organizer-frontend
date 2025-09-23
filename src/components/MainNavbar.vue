<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
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
    <div class="navbar-logo">Logo</div>

    <ul class="navbar-links">
      <li>
        <RouterLink
          to="/"
          :class="[isActiveLink('/') ? 'link-active' : 'link-default']"
        >
          Home
        </RouterLink>
      </li>
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
          :class="[isActiveLink('/jobs/add') ? 'link-active' : 'link-default']"
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

      <!-- Toggle dark mode -->
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
