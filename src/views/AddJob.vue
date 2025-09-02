<script setup>
import router from '@/router'
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/AuthStore'

const form = reactive({
  type: 'Full-Time',
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

    console.log('Current token:', authStore.token) // ← Debug
  console.log('Is logged in:', authStore.isLoggedIn) // ← Debug


  
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
      headers: { 'Content-Type': 'application/json',
         'Authorization': `Bearer ${authStore.token}` 
       },
      body: JSON.stringify(newJob),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // console.log('Job saved:', data)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Job added to Job Listening',
      life: 3000,
    },

  )

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
    },
    console.log('toast error') 
)
  }
}
</script>

<template>
  <section class="bg-blue-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Title</label>
            <input
              type="text"
              v-model="form.title"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Status</label>
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
            <label class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select v-model="form.type" class="border rounded w-full py-2 px-3" required>
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              v-model="form.description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add job duties, expectations, requirements, or copy and paste job description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">URL</label>
            <input
              type="text"
              v-model="form.url"
              class="border rounded w-full py-2 px-3"
              placeholder="www.example.com"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Salary</label>
            <input
              type="text"
              v-model="form.salary"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. $50K - $70K"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Location</label>
            <input
              type="text"
              v-model="form.location"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Location"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Starting Date</label>
            <input
              type="date"
              v-model="form.startingDate"
              class="border rounded w-full py-2 px-3"
            />
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-gray-700 font-bold mb-2">Pros</label>
              <textarea
                v-model="form.pros"
                class="border rounded w-full py-2 px-3"
                rows="3"
                placeholder="List the benefits of this job"
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 font-bold mb-2">Cons</label>
              <textarea
                v-model="form.cons"
                class="border rounded w-full py-2 px-3"
                rows="3"
                placeholder="List the downsides of this job"
              ></textarea>
            </div>
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Company Name</label>
            <input
              type="text"
              v-model="form.company"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
              required
            />
          </div>

          <div>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
