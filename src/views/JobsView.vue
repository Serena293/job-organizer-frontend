<script setup>
import JobListings from '@/components/JobListings.vue'
import { useAuthStore } from '@/stores/authStore'
import { useJobStore } from '@/stores/jobStore'
import BackButton from '@/components/BackButton.vue'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const jobStore = useJobStore()

onMounted(() => {
  jobStore.fetchJobs()
})
</script>

<template>
  <main class="min-screen-height bg-primary">
    <BackButton class="mb-6" />
    <div class="container-responsive">
      <div v-if="authStore.isLoggedIn && jobStore.jobs.length > 0" class="center-content">
        <JobListings />
      </div>

      <div v-else class="center-content min-screen-height">
        <div class="section-card text-center max-w-md mx-auto">
          <h2 class="heading-medium text-black-static mb-4">No Jobs Present</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Add a new job
            <RouterLink to="/jobs/add" class="btn-text" aria-label="Add a new job">here</RouterLink
            >.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
