<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter()
const authStore = useAuthStore()

const goBack = () => {
  if (authStore.isLoggedIn) {
   
    const from = router.options.history.state.back
    if (from && (from.includes('/login') || from.includes('/register'))) {
      router.push({ name: 'home' })
    } else {
      router.back()
    }
  } else {
    router.back()
  }
}
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <button
        @click="goBack"
        class="btn-back"
        aria-label="Go back"
      >
        <i class="pi pi-arrow-circle-left" aria-hidden="true"></i>
        Back
      </button>
    </div>
  </section>
</template>
