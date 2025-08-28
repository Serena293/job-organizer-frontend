<script setup>
import { onMounted, ref } from 'vue'
import JobCard from "./JobCard.vue"

const jobs = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/jobs/all')
    const data = await response.json()
    jobs.value = data
  } catch (error) {
    console.log('Error: ' + error)
  }
})
</script>

<template>
  <section class="px-4 py-10 bg-blue-50">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-500 text-center mb-6">Jobs</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobCard v-for="job in jobs" :key="job.id" :job="job"/>
        
      </div>
    </div>
  </section>
</template>
