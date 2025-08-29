<script setup>
import { RouterLink, useRoute } from 'vue-router'

const isActiveLink = (routePath) => {
  const route = useRoute()

  return route.path === routePath
}
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
    </ul>
  </nav>
</template>
