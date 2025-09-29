import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore.js'
import { API_BASE_URL } from '@/config/api'

export const useJobStore = defineStore('jobStore', () => {
  const jobs = ref([])
  const selectedJob = ref(null)
  const isLoading = ref(false)

  const fetchJobs = async () => {
    isLoading.value = true
    try {
      const authStore = useAuthStore()
      const token = authStore.token
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }   
  ) 
      if (!response.ok) throw new Error('Fetch failed')
      jobs.value = await response.json()
      // console.log("Jobs", jobs.value)
    } finally {
      isLoading.value = false
     
    }
  }

  const fetchJobById = async (id) => {
    isLoading.value = true
    try {
      const authStore = useAuthStore()
      const token = authStore.token

      let job = jobs.value.find((j) => j.id === Number(id))
      if (!job) {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        job = await response.json()
      }
      selectedJob.value = job
      return job
    } finally {
      isLoading.value = false
    }
  }

  const deleteJob = async (id) => {
    const authStore = useAuthStore()
    const token = authStore.token

    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      jobs.value = jobs.value.filter((job) => job.id !== id)
      if (selectedJob.value?.id === id) {
        selectedJob.value = null
      }
      return true
    } else {
      return false
    }
  }

  const updateJob = async (id, updatedData) => {
    isLoading.value = true
    try {
      const authStore = useAuthStore()
      const token = authStore.token
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error('Failed to update job')
      }

      const updatedJob = await response.json()

      const index = jobs.value.findIndex((job) => job.id === id)
      if (index !== -1) {
        jobs.value[index] = updatedJob
      }

      if (selectedJob.value?.id === id) {
        selectedJob.value = updatedJob
      }

      return true
    } catch (error) {
      console.error('Error updating job:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    jobs,
    selectedJob,
    isLoading,
    fetchJobs,
    fetchJobById,
    deleteJob,
    updateJob,
  }
})
