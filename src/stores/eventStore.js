import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './authStore'

export const useEventStore = defineStore('eventStore', () => {
  const events = ref([])
  const selectedEvent = ref(null)
  const isLoading = ref(false)
  const authStore = useAuthStore()

  const token = computed(() => authStore.token)
  const isAuthenticated = computed(() => authStore.isLoggedIn && !!token.value)
  
  const API_BASE_URL = 'http://localhost:8080'

  const fetchEvents = async () => {
        if (!isAuthenticated.value)  return
      
    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Fetch failed')
      events.value = await response.json()
    } catch(error){
      console.error('Error fetching events: ', error)
      throw error
    }  
    finally {
      isLoading.value = false
    }
  }

  const fetchEventsByDate = async (date) => {
    if (!authStore.isLoggedIn || !authStore.token) {
      return []
    }
    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE_URL}/events/by-date?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Fetch failed')
      return await response.json()
    } finally {
      isLoading.value = false
    }
  }

  const addEvent = async (eventData) => {
    if (!authStore.isLoggedIn || !authStore.token) {
      return []
    }

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) throw new Error('Failed to create event')
    const newEvent = await response.json()
    events.value.push(newEvent)
    return newEvent
  }

  const updateEvent = async (id, updatedData) => {
     if (!isAuthenticated.value) {
      throw new Error('User not logged in')
    }

    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(updatedData),
    })

    if (!response.ok) throw new Error('Failed to update event')
    const updatedEvent = await response.json()

    const index = events.value.findIndex((e) => e.id === id)
    if (index !== -1) {
      events.value[index] = updatedEvent
    }
    if (selectedEvent.value?.id === id) {
      selectedEvent.value = updatedEvent
    }

    return updatedEvent
  }

  const deleteEvent = async (id) => {
      if (!isAuthenticated.value) {
      throw new Error('User not logged in')
    }

    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (response.ok) {
      events.value = events.value.filter((e) => e.id !== id)
      if (selectedEvent.value?.id === id) {
        selectedEvent.value = null
      }
      return true
    } else {
      return false
    }
  }

  return {
    events,
    selectedEvent,
    isLoading,
    fetchEvents,
    fetchEventsByDate,
    addEvent,
    updateEvent,
    deleteEvent,
  }
})
