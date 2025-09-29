<script setup>
import {ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore.js';
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
  <section class="hero-section" role="region" aria-label="Welcome section">
    <h1 
      v-if="authStore.isLoggedIn && authStore.user" 
      class="hero-title">
      Hello {{ authStore.user.firstName }}
    </h1>
 
    <blockquote class="my-5">
      <p class="quote-text">"{{ quote }}"</p>
      <footer class="quote-footer">
        — <cite>{{ authorName }}</cite>
      </footer>
    </blockquote>
  </section>
</template>

