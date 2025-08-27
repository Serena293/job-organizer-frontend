<script setup>
import MainNavbar from './components/MainNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import FooterComponent from './components/FooterComponent.vue'
import CalendarComponent from './components/CalendarComponent.vue'
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <MainNavbar />
    </header>
    <!-- props in Hero -->
    <HeroSection />
    <main class="flex-grow ">
      <CalendarComponent/>
    </main>
    <FooterComponent />
  </div>
</template>
