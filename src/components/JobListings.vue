<script setup>
import JobCard from "./JobCard.vue"
import { useToast } from 'primevue/usetoast'
import { useJobStore } from '@/stores/jobStore.js'


const store = useJobStore();
const toast = useToast();


const handleDelete = async (id) => {
  const ok = await store.deleteJob(id)
  if (ok) {
    toast.add({ severity: 'success', summary: 'Deleted', detail: 'Job deleted', life: 3000 })
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Job not deleted', life: 3000 })
  }
}

const handleUpdate = async (id, updatedData) => {
  const ok = await store.updateJob(id, updatedData)
  if (ok) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Job updated', life: 3000 })
  } else {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Job not updated', life: 3000 })
  }
}

</script>

<template>
  <section class="jobs-section" role="region" aria-label="Job listings">
    <div class="container m-auto">
      <h2 class="jobs-title">Jobs</h2>
      <div class="jobs-grid">
        <JobCard 
          v-for="job in store.jobs" 
          :key="job.id" 
          :job="job"
          :onDelete="handleDelete"
          :onEdit="handleUpdate"
        />
      </div>
    </div>
  </section>
</template>

