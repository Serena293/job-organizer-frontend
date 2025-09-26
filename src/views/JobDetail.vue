<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'
import { useToast } from 'primevue/usetoast'
import BackButton from '@/components/BackButton.vue'

const store = useJobStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

onMounted(async () => {
  await store.fetchJobById(route.params.id)
})

const deleteJob = async () => {
  if (confirm(`Are you sure you want to delete ${store.selectedJob?.title}?`)) {
    const ok = await store.deleteJob(store.selectedJob.id)
    if (ok) {
      toast.add({ severity: 'success', summary: 'Deleted', detail: 'Job deleted', life: 3000 })
      router.push('/jobs')
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Job not deleted', life: 3000 })
    }
  }
}
const editJob = () => {
  router.push(`/job/edit/${store.selectedJob.id}`)
}
</script>

<template>
  <div v-if="store.isLoading" class="text-center py-24">
    <p class="text-gray-600 dark:text-gray-400">Loading...</p>
  </div>

  <main v-else-if="store.selectedJob" class="min-screen-height bg-primary pb-5 ">
    <BackButton />

    <section class="section-card max-w-3xl mx-auto space-y-6">
      <header class="flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-4">
        <div class="flex items-center gap-4 flex-1 min-w-0">
          <h1 class="heading-large text-black-static truncate">
            {{ store.selectedJob.title }}
          </h1>

          <span
            class="job-status"
          >
            {{ store.selectedJob.status }}
          </span>
        </div>

        <div class="flex gap-2 flex-shrink-0">
          <button
            @click="editJob"
            class="btn-small-warning flex items-center gap-2"
            aria-label="Edit job"
          >
            <i class="pi pi-pen-to-square"></i> 
          </button>
          <button
            @click="deleteJob"
            class="btn-small-danger flex items-center gap-2"
            aria-label="Delete job"
          >
            <i class="pi pi-trash"></i> 
          </button>
        </div>
      </header>

      <dl class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="form-group">
          <dt class="form-label mb-1">Company</dt>
          <dd class="text-gray-900 dark:text-gray-100">{{ store.selectedJob.company }}</dd>
        </div>
        <div class="form-group">
          <dt class="form-label mb-1">Location</dt>
          <dd class="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <i class="fas fa-map-pin text-blue-500 dark:text-blue-400"></i>
            {{ store.selectedJob.location }}
          </dd>
        </div>
        <div class="form-group">
          <dt class="form-label mb-1">Salary</dt>
          <dd class="text-gray-900 dark:text-gray-100">{{ store.selectedJob.salary }}</dd>
        </div>
      </dl>

      <!-- Job description -->
      <div class="form-group">
        <h3 class="form-label mb-3">Description</h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ store.selectedJob.description }}
        </p>
        <time
          :datetime="store.selectedJob.startingDate"
          class="block mt-3 text-muted text-sm text-right"
        >
          Start: {{ store.selectedJob.startingDate }}
        </time>
      </div>

  
      <div class="section-card !p-0 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                class="p-4 font-semibold text-green-600 dark:text-green-400 text-center"
              >
                Pros
              </th>
              <th scope="col" class="p-4 font-semibold text-red-600 dark:text-red-400 text-center">
                Cons
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="p-4 border-t border-gray-200 dark:border-gray-600 text-green-600 dark:text-green-400 text-center"
              >
                {{ store.selectedJob.pros }}
              </td>
              <td
                class="p-4 border-t border-gray-200 dark:border-gray-600 text-red-600 dark:text-red-400 text-center"
              >
                {{ store.selectedJob.cons }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
