<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useJobStore } from '@/stores/jobStore'
import BackButton from '@/components/BackButton.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const store = useJobStore()

const jobId = Number(route.params.id)

const form = reactive({
  title: '',
  company: '',
  location: '',
  description: '',
  status: 'PENDING',
  type: 'FULL_TIME',
  salary: '',
  startingDate: '',
  pros: '',
  cons: '',
  url: ''
})

onMounted(async () => {
  let job = store.selectedJob
  if (!job || job.id !== jobId) {
    job = await store.fetchJobById(jobId)
  }

  // Popola il form
  form.title = job.title
  form.company = job.company
  form.location = job.location
  form.description = job.description
  form.status = job.status
  form.type = job.type
  form.salary = job.salary
  form.startingDate = job.startingDate
  form.pros = job.pros
  form.cons = job.cons
  form.url = job.url
})

const handleSubmit = async () => {
  const ok = await store.updateJob(jobId, { ...form })

  if (ok) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Job updated',
      life: 3000
    })
    router.push(`/jobs/${jobId}`)
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Job not updated',
      life: 3000
    })
  }
}
</script>

<template>
  <section class="bg-blue-50 min-h-screen py-12">
    <div class="container max-w-2xl mx-auto">
      <BackButton/>
      <div class="bg-white px-6 py-8 rounded-md shadow-md">
        <h2 class="text-3xl font-semibold mb-6 text-center">Edit Job</h2>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block font-medium mb-1">Job Title</label>
            <input type="text" v-model="form.title" class="border rounded w-full py-2 px-3" required />
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">Status</label>
            <select v-model="form.status" class="border rounded w-full py-2 px-3" required>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="PENDING">Pending</option>
              <option value="AWAITING_RESPONSE">Awaiting Response</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">Job Type</label>
            <select v-model="form.type" class="border rounded w-full py-2 px-3" required>
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">Description</label>
            <textarea v-model="form.description" class="border rounded w-full py-2 px-3" rows="4"></textarea>
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">URL</label>
            <input type="text" v-model="form.url" class="border rounded w-full py-2 px-3" />
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">Salary</label>
            <input type="text" v-model="form.salary" class="border rounded w-full py-2 px-3" />
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">Location</label>
            <input type="text" v-model="form.location" class="border rounded w-full py-2 px-3" />
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-1">Starting Date</label>
            <input type="date" v-model="form.startingDate" class="border rounded w-full py-2 px-3" />
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block font-medium mb-1">Pros</label>
              <textarea v-model="form.pros" class="border rounded w-full py-2 px-3" rows="3"></textarea>
            </div>
            <div>
              <label class="block font-medium mb-1">Cons</label>
              <textarea v-model="form.cons" class="border rounded w-full py-2 px-3" rows="3"></textarea>
            </div>
          </div>

          <div class="mb-6">
            <label class="block font-medium mb-1">Company</label>
            <input type="text" v-model="form.company" class="border rounded w-full py-2 px-3" />
          </div>

          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full font-semibold">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
