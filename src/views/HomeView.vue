<script setup>
import HeroSection from '@/components/HeroSection.vue'
import CalendarComponent from '@/components/CalendarComponent.vue'

import {computed} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NoteSection from '@/components/NoteSection.vue'
import Column from 'primevue/column'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)

</script>

<template>
  <main role="main">
  <HeroSection />

  <section class="container-responsive section-spacing">
    <div :class="{'grid-two-column' : isLoggedIn}">

      <div :class="{'center-content min-screen-height': !isLoggedIn}">
        <CalendarComponent />
      </div>

      <div
        v-if="isLoggedIn"
        role="complementary" aria-label="Personal notes"
      >
        <NoteSection/>
      </div>
    </div>
  </section>
</main>
</template>
