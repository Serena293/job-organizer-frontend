<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const route = useRoute()

const isActiveLink = (routePath) => {
  return route.path === routePath
}

const isLoggedIn = computed(() => authStore.isLoggedIn)
</script>

<template>
  <nav class="flex justify-between bg-gray-900 p-5 text-white">
    <div>Logo</div>
    <ul class="flex space-x-6">
      <li>
        <RouterLink
          to="/"
          :class="[
            isActiveLink('/') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-whiet',
            'text-white',
            'px-3',
            'py-2',
            'rounded-md',
          ]"
          >Home</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/jobs"
          :class="[
            isActiveLink('/jobs') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-whiet',
            'text-white',
            'px-3',
            'py-2',
            'rounded-md',
          ]"
          >Jobs</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/jobs/add"
          :class="[
            isActiveLink('/jobs/add') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-whiet',
            'text-white',
            'px-3',
            'py-2',
            'rounded-md',
          ]"
          >Add Job</RouterLink
        >
      </li>
      <li v-if="isLoggedIn">
        <RouterLink
          to="/profile"
          :class="[
            isActiveLink('/profile') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-whiet',
            'text-white',
            'px-3',
            'py-2',
            'rounded-md',
          ]"
          >Profile</RouterLink
        >
      </li>
      <li v-else>
        <RouterLink
          to="/login"
          :class="[
            isActiveLink('/login') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-whiet',
            'text-white',
            'px-3',
            'py-2',
            'rounded-md',
          ]"
          >Profile</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
