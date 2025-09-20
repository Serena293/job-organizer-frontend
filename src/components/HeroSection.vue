<script setup>
import {ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import motivational from '@/assets/motivational.json'

const authStore = useAuthStore();

const quote = ref('Choose a job you love, and you will never have to work a day in your life.')
const authorName = ref('')

onMounted(() => {
  if (motivational && motivational.length > 0) {
    const randomIndex = Math.floor(Math.random() * motivational.length)
    const randomQuote = motivational[randomIndex]
    quote.value = randomQuote.text
    authorName.value = randomQuote.author || '' 
  }
})

</script>

<template>
  <section class="text-center bg-gray-900 mx-5 text-white p-5">
    <h1 v-if="authStore.isLoggedIn && authStore.user" class="text-3xl">Hello {{ authStore.user.firstName }}</h1>
    <!-- <h1 v-else class="text-3xl">{{ title }}</h1> -->

    <blockquote class="my-5">
      
      <p class="text-xl italic">"{{ quote }}"</p>
      <footer class="mt-2 text-sm text-gray-300">
        — <cite>{{ authorName }}</cite>
      </footer>
    </blockquote>
  </section>
</template>
