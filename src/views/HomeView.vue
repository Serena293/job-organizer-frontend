<script setup>
import HeroSection from '@/components/HeroSection.vue'
import CalendarComponent from '@/components/CalendarComponent.vue'

import { useAuthStore } from '@/stores/authStore'
import NoteSection from '@/components/NoteSection.vue'

const authStore = useAuthStore()

</script>

<template>
  <HeroSection />

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
      <div class="p-6">
        <CalendarComponent />
      </div>

      <div
        v-if="authStore.isLoggedIn"
      
      >
        <NoteSection/>
      </div>
    </div>
  </div>
</template>
