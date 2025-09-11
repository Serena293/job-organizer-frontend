import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('eventStore', () => {
  const events = ref([])

  const addEvent = (event) => {
    const id = Date.now()
    events.value.push({ id, ...event })
  }

  const removeEvent = (id) => {
    events.value = events.value.filter(e => e.id !== id)
  }

  const getEventsByDate = (date) => {
    return events.value.filter(e => e.date === date)
  }

  return { events, addEvent, removeEvent, getEventsByDate }
})
