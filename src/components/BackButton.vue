<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const goBack = () => {
  router.back()
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
