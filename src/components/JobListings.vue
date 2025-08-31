<script setup>
import { onMounted} from 'vue'
import JobCard from "./JobCard.vue"
import { useToast } from 'primevue/usetoast'
import { useJobStore } from '@/stores/jobStore'


const store = useJobStore();
const toast = useToast();

onMounted(() => {
  store.fetchJobs()
})

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
  <section class="px-4 py-10 bg-blue-50">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-500 text-center mb-6">Jobs</h2>
      <div class="grid grid-cols-3 md:grid-cols-3 gap-6">
        <JobCard v-for="job in store.jobs" :key="job.id" :job="job"
         :onDelete="handleDelete"
         :onEdit="handleUpdate"/>
        
      </div>
    </div>
  </section>
</template>
