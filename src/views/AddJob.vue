<script setup>
import router from '@/router'
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/authStore'
// import { useInputClasses } from '@/utilities/useInputClasses'
import BackButton from '@/components/BackButton.vue'

const form = reactive({
  type: 'FULL_TIME',
  title: '',
  status: 'PENDING',
  description: '',
  url: '',
  salary: '',
  location: '',
  startingDate: '',
  pros: '',
  cons: '',
  company: '',
})

const toast = useToast()
const authStore = useAuthStore()

const handleSubmit = async () => {
  if (!authStore.token) {
    toast.add({
      severity: 'error',
      summary: 'Errore',
      detail: 'Need to login.',
      life: 3000,
    })
    return
  }

  const newJob = {
    title: form.title,
    company: form.company,
    location: form.location,
    description: form.description,
    status: form.status,
    type: form.type,
    salary: form.salary,
    startingDate: form.startingDate,
    pros: form.pros,
    cons: form.cons,
    url: form.url,
  }

  try {
    const response = await fetch('http://localhost:8080/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` },
      body: JSON.stringify(newJob),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Job added to Job Listening',
      life: 3000,
    })

    router.push('/jobs')
  } catch (error) {
    if (error.response) {
      console.log('Response status:', error.response.status)
      const errorText = await error.response.text()
      console.log('Response text:', errorText)
    }

    toast.add({
      severity: 'error',
      summary: 'Errore',
      detail: 'Error: ' + error,
      life: 3000,
    })
  }
}
</script>

<template>
  <section class="bg-primary min-screen-height pb-5">
    <BackButton />
    <div class="container-responsive">
      <form
        @submit.prevent="handleSubmit"
        role="form"
        aria-label="Add job application form"
        class="form-container max-w-2xl mx-auto"
      >
        <fieldset class="form-fieldset">
          <legend class="section-legend">Add Job</legend>

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
              required
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
              required
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
              required
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

          <h3 class="heading-medium mb-5 text-black-static">Company Info</h3>
          <div class="form-group">
            <label class="form-label">Company Name</label>
            <input
              type="text"
              v-model="form.company"
              class="form-input"
              placeholder="Company Name"
              required
              aria-label="Company name"
            />
          </div>

          <div>
            <button class="btn-primary w-full py-3 mt-5" type="submit" aria-label="Save job application">
              Save Job
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
</template>
