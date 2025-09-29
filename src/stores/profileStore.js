import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from  '@/stores/authStore'
import { API_BASE_URL } from '@/config/api'

export const useProfileStore = defineStore('profileStore', () => {
  const authStore = useAuthStore()

  const documents = ref([])
  const notes = ref([])
  const isLoading = ref(false)
  const error = ref(null)

const fetchWithAuth = async (url, options = {}) => {
  const token = authStore.token
  if (!token) {
    throw new Error('Missing Token')
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  if (!(options.body instanceof FormData) && !options.headers?.['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers, 
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
  }

  return response
}
  //NOTES
  const fetchNotes = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/notes`)
      notes.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Fetch notes error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addNote = async (newNote) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/notes`, {
        method: 'POST',
        body: JSON.stringify(newNote),
      })

      const savedNote = await response.json()

      notes.value.push(savedNote)

      return savedNote
    } catch (err) {
      error.value = err.message
      console.error('Add note error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateNote = async (id, updatedNote) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedNote),
      })

      const savedNote = await response.json()

      const index = notes.value.findIndex((note) => note.id === id)
      if (index !== -1) {
        notes.value[index] = savedNote
      }
      return savedNote
    } catch (err) {
      error.value = err.message
      console.error('Update note error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteNote = async (id) => {
    isLoading.value = true
    error.value = null
    try {
      await fetchWithAuth(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      })
      notes.value = notes.value.filter((note) => note.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Delete note error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // DOCUMENTS
  const fetchDocuments = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/documents`)
      documents.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Fetch documents error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addDocument = async (formData) => {
    isLoading.value = true
    error.value = null
    try {
      const token = authStore.token
      if (!token) throw new Error('Missing Token')

      const response = await fetchWithAuth(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',

        body: formData,
      })
      const savedDoc = await response.json()
      documents.value.push(savedDoc)
      return savedDoc
    } catch (err) {
      error.value = err.message
      console.error('Add document error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateDocument = async (id, updatedDocument) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/documents/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedDocument),
      })

      const savedDoc = await response.json()
      const index = documents.value.findIndex((doc) => doc.id === id)
      if (index !== -1) {
        documents.value[index] = savedDoc
      }
      return savedDoc
    } catch (err) {
      error.value = err.message
      console.error('Update document error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteDocument = async (id) => {
    isLoading.value = true
    error.value = null
    try {
      await fetchWithAuth(`${API_BASE_URL}/documents/${id}`, {
        method: 'DELETE',
      })
      documents.value = documents.value.filter((doc) => doc.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Delete document error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Reset error
  const clearError = () => {
    error.value = null
  }

  return {
    documents,
    notes,
    isLoading,
    error,

    fetchNotes,
    addNote,
    updateNote,
    deleteNote,

    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,

    clearError,
  }
})
