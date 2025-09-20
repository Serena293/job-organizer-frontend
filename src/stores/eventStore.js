import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'

export const useEventStore = defineStore('eventStore', () => {
  const events = ref([])
  const selectedEvent = ref(null)
  const isLoading = ref(false)
  const authStore = useAuthStore()
  const token = authStore.token

  const fetchEvents = async () => {
    if (!authStore.isLoggedIn || !authStore.token) {
      return []
    }
    isLoading.value = true
    try {
      const response = await fetch('http://localhost:8080/events', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Fetch failed')
      events.value = await response.json()
    } finally {
      isLoading.value = false
    }
  }

  const fetchEventsByDate = async (date) => {
    if (!authStore.isLoggedIn || !authStore.token) {
      return []
    }
    isLoading.value = true
    try {
      const response = await fetch(`http://localhost:8080/events/by-date?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

    const response = await fetch('http://localhost:8080/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) throw new Error('Failed to create event')
    const newEvent = await response.json()
    events.value.push(newEvent)
    return newEvent
  }

  const updateEvent = async (id, updatedData) => {
    if (!authStore.isLoggedIn || !authStore.token) {
      return []
    }

    const response = await fetch(`http://localhost:8080/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
    if (!authStore.isLoggedIn || !authStore.token) {
      return []
    }

    const response = await fetch(`http://localhost:8080/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
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
