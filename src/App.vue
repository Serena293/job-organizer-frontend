<script setup>
import MainNavbar from './components/MainNavbar.vue'
import FooterComponent from './components/FooterComponent.vue'
import { RouterView } from 'vue-router'

import Toast from 'primevue/toast'
import 'primeicons/primeicons.css'

</script>
<template>
  <Toast position="bottom-right"/>
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

