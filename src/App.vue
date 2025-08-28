<script setup>
import MainNavbar from './components/MainNavbar.vue'
import FooterComponent from './components/FooterComponent.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <MainNavbar />
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

