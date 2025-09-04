<script setup>
import JobListings from '@/components/JobListings.vue'
import { useAuthStore } from '@/stores/authStore'
import { useJobStore } from '@/stores/jobStore'
// import { useRouter } from 'vue-router';
// import AddJob from './AddJob.vue';
import BackButton from '@/components/BackButton.vue'

const authStore = useAuthStore()
const jobStore = useJobStore()
console.log(jobStore.jobs.value)
</script>

<template>
  <section class="bg-blue-50 min-h-screen">
  <BackButton />
  <div
    v-if="authStore.isLoggedIn && jobStore.jobs.length > 0"
    class="flex justify-center align-center py-10"
  >
    <JobListings />
  </div>
  <div v-else class="flex justify-center align-center py-10">
    <div>
      <h2 class="text-2xl font-bold text-blue-800">No Jobs Present</h2>

      <p class="pt-5 text-center">
       Add a new job
        <span class="underline text-blue-500"><RouterLink to="/jobs/add">here</RouterLink></span>
      .</p>
    </div>
  </div>
  
  </section>


</template>
