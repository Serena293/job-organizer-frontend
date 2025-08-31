import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJobStore = defineStore('jobStore', () => {
  const jobs = ref([])
  const selectedJob = ref(null)
  const isLoading = ref(false)

  const fetchJobs = async () => {
    isLoading.value = true
    try {
      const response = await fetch('http://localhost:8080/jobs/all')
      jobs.value = await response.json()
    } finally {
      isLoading.value = false
    }
  }

  const fetchJobById = async (id) => {
    isLoading.value = true
    try {
      // prima prova a trovarlo nei jobs già caricati
      let job = jobs.value.find(j => j.id === Number(id))
      if (!job) {
        // se non c’è, fai una fetch singola
        const response = await fetch(`http://localhost:8080/jobs/${id}`)
        job = await response.json()
      }
      selectedJob.value = job
      return job
    } finally {
      isLoading.value = false
    }
  }

  const deleteJob = async (id) => {
    const response = await fetch(`http://localhost:8080/jobs/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      jobs.value = jobs.value.filter(job => job.id !== id)
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
    const response = await fetch(`http://localhost:8080/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      throw new Error('Failed to update job')
    }

    const updatedJob = await response.json()

    // aggiorna la lista jobs se il job era già presente
    const index = jobs.value.findIndex(job => job.id === id)
    if (index !== -1) {
      jobs.value[index] = updatedJob
    }

    // aggiorna selectedJob se è il job corrente
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
    updateJob
  }
})
