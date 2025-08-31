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
  <div v-if="store.isLoading" class="text-center py-10">Loading...</div>
  <section  v-else-if="store.selectedJob">
  <div class="flex w-full justify-between px-6 items-center" >
    <BackButton/>
    <div>
      <button @click="deleteJob"><i class="pi pi-trash text-red-500 px-3"></i></button>
      <button @click="editJob"><i class=" pi
pi-pen-to-square text-orange-500"></i></button>
    </div>
    
  </div>
  <section class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
    
    <header class="flex items-center justify-between">
      <h1  class="text-2xl font-bold text-blue-700">
        {{ store.selectedJob.title }}
      </h1>
    
      <span
        class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600"
      >
        {{ store.selectedJob.status }}
      </span>
    </header>

    
    <dl class="grid grid-cols-3 gap-4 text-gray-600 text-sm">
      <div>
        <dt class="font-medium text-gray-800">Company</dt>
        <dd>{{ store.selectedJob.company }}</dd>
      </div>
      <div>
        <dt class="font-medium text-gray-800">Location</dt>
        <dd class="flex items-center gap-1">
          <i class="fas fa-map-pin text-blue-500"></i> {{ store.selectedJob.location }}
        </dd>
      </div>
      <div>
        <dt class="font-medium text-gray-800">Salary</dt>
        <dd>{{ store.selectedJob.salary }}</dd>
      </div>
    </dl>

 
    <div>
      <p class="text-gray-700 leading-relaxed">
        {{ store.selectedJob.description }}
      </p>
      <time
        :datetime="store.selectedJob.startingDate"
        class="block mt-2 text-gray-500 italic text-sm text-right"
      >
        Start: {{ store.selectedJob.startingDate }}
      </time>
    </div>

    <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
      <thead class="bg-blue-50">
        <tr>
          <th scope="col" class="p-3 text-blue-700 font-semibold text-center">
            Pros
          </th>
          <th scope="col" class="p-3 text-blue-700 font-semibold text-center">
            Cons
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-4 border-t border-gray-200 text-green-600 text-center">
            {{ store.selectedJob.pros }}
          </td>
          <td class="p-4 border-t border-gray-200 text-red-600 text-center">
            {{ store.selectedJob.cons }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  </section>
</template>
