<script setup>
import { defineProps } from 'vue'
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

defineProps({
  title: {
    type: String,
    default: 'Welcome',
  },
  subtitle: {
    type: String,
    default: 'Choose a job you love, and you will never have to work a day in your life.',
  },
  author: {
    type: String,
    default: '- Confucio',
  },
})
</script>

<template>
  <section class="text-center bg-gray-900 mx-5 text-white p-5">
    <h1 v-if="authStore.isLoggedIn && authStore.user" class="text-3xl">Hello {{ authStore.user.firstName }}</h1>
    <h1 v-else class="text-3xl">{{ title }}</h1>

    <blockquote class="my-5">
      
      <p class="text-xl italic">"{{ subtitle }}"</p>
      <footer class="mt-2 text-sm text-gray-300">
        — <cite>{{ author }}</cite>
      </footer>
    </blockquote>
  </section>
</template>
