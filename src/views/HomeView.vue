<script setup>
import HeroSection from '@/components/HeroSection.vue'
import CalendarComponent from '@/components/CalendarComponent.vue'

import {computed} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NoteSection from '@/components/NoteSection.vue'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)

</script>

<template>
  <main role="main" class="bg-primary">
    <HeroSection />

    <section class="container py-12">
      <div :class="{'grid grid-cols-1 lg:grid-cols-2 gap-8' : isLoggedIn}">

        <div :class="{' min-screen-height ': !isLoggedIn}">
          <CalendarComponent class="mx-auto" />
        </div>

        <div
          v-if="isLoggedIn"
          role="complementary" 
          aria-label="Personal notes"
          class="section-card "
        >
          <NoteSection/>
        </div>
      </div>
    </section>
  </main>
</template>
