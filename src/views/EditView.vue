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
  url: '',
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
      life: 3000,
    })
    router.push(`/jobs/${jobId}`)
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Job not updated',
      life: 3000,
    })
  }
}
</script>

<template>
  <main class="bg-primary min-screen-height">
    <BackButton />
    <div class="container max-w-2xl mx-auto">
      <form @submit.prevent="handleSubmit" role="form" aria-label="Edit job application form">
        <fieldset class="form-fieldset">
          <legend class="section-legend">Edit Job</legend>

          <div class="form-group">
            <label class="form-label">Job Title</label>
            <input
              type="text"
              v-model="form.title"
              class="form-input"
              placeholder="e.g. Frontend Developer"
              required
              aria-label="Job title"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <select
              v-model="form.status"
              class="form-input"
              required
              aria-label="Application status"
            >
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

          <div class="form-group">
            <label class="form-label">Job Type</label>
            <select v-model="form.type" class="form-input" required aria-label="Job type">
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              v-model="form.description"
              class="form-input resize-none"
              rows="4"
              placeholder="Add job duties, expectations, requirements, or copy and paste job description"
              aria-label="Job description"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">URL</label>
            <input
              type="text"
              v-model="form.url"
              class="form-input"
              placeholder="www.example.com"
              aria-label="Job application URL"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Salary</label>
            <input
              type="text"
              v-model="form.salary"
              class="form-input"
              placeholder="e.g. $50K - $70K"
              aria-label="Salary range"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Location</label>
            <input
              type="text"
              v-model="form.location"
              class="form-input"
              placeholder="Company Location"
              aria-label="Job location"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Starting Date</label>
            <input
              type="date"
              v-model="form.startingDate"
              class="form-input"
              aria-label="Expected starting date"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="form-group">
              <label class="form-label">Pros</label>
              <textarea
                v-model="form.pros"
                class="form-input resize-none"
                rows="3"
                placeholder="List the benefits of this job"
                aria-label="Job advantages"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Cons</label>
              <textarea
                v-model="form.cons"
                class="form-input resize-none"
                rows="3"
                placeholder="List the downsides of this job"
                aria-label="Job disadvantages"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Company</label>
            <input
              type="text"
              v-model="form.company"
              class="form-input"
              placeholder="Company Name"
              aria-label="Company name"
            />
          </div>

          <button type="submit" class="btn-primary w-full py-2 mt-3" aria-label="Save job changes">
            Save Changes
          </button>
        </fieldset>
      </form>
    </div>
  </main>
</template>
