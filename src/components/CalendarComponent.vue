<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useEventStore } from '@/stores/eventStore.js'
import { useAuthStore } from '@/stores/authStore.js'
import EventItem from './EventItem.vue'

const eventStore = useEventStore()
const authStore = useAuthStore()
const selectedDayEvents = ref([])
// const isLoggedIn = authStore.isLoggedIn

const now = new Date()
const currentYear = now.getFullYear()
const currentMonthIndex = now.getMonth()
const today = now.getDate()

const firstDayIndex = new Date(currentYear, currentMonthIndex, 1).getDay()
const adjustedFirstDay = (firstDayIndex + 6) % 7

const days = computed(() => {
  const numDays = getDaysInMonth(currentYear, currentMonthIndex)
  const blanks = Array.from({ length: adjustedFirstDay }, () => null)
  const monthDays = Array.from({ length: numDays }, (_, i) => i + 1)
  return [...blanks, ...monthDays]
})

// const classToday = (day) => {
//   if (!day) return 'bg-white'
//   if (
//     day === today &&
//     currentMonthIndex === now.getMonth() &&
//     currentYear === now.getFullYear()
//   ) {
//     return 'bg-gray-300'
//   }
//   return 'bg-white'
// }


const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const month = ref(monthNames[currentMonthIndex])
const selectedDay = ref(null)
const newEventTitle = ref('')
const newEventDetails = ref('')
const daysWithEvents = ref([])

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

const eventsForDay = async (day) => {
  if (!day) return []
  const dateStr = `${String(day).padStart(2, '0')}-${String(currentMonthIndex + 1).padStart(2, '0')}-${currentYear}`
  const events = await eventStore.fetchEventsByDate(dateStr)
  return events
}

const handleDayClick = async (day) => {
  if (!authStore.isLoggedIn || !day) return

  if (selectedDay.value === day) {
    selectedDay.value = null
    newEventTitle.value = ''
    newEventDetails.value = ''
  } else {
    selectedDay.value = day
    newEventTitle.value = ''
    newEventDetails.value = ''
    selectedDayEvents.value = await eventsForDay(day)
  }
}
const saveEvent = async () => {
  if (!newEventTitle.value || !selectedDay.value) return

  const dateStr = `${String(selectedDay.value).padStart(2, '0')}-${String(currentMonthIndex + 1).padStart(2, '0')}-${currentYear}`
  const newEvent = {
    eventTitle: newEventTitle.value,
    eventDescription: newEventDetails.value,
    eventDate: dateStr,
  }
  const savedEvent = await eventStore.addEvent(newEvent)

  selectedDayEvents.value.push(savedEvent)

  selectedDay.value = null
  newEventTitle.value = ''
  newEventDetails.value = ''
}

onMounted(() => {
  if (authStore.isLoggedIn) {
    eventStore.fetchEvents()
  }
})
const fetchAllEvents = async () => {
  await eventStore.fetchEvents()
  daysWithEvents.value = eventStore.events
    .filter((e) => e.eventDate)
    .filter((e) => {
      const [day, month, year] = e.eventDate.split('-').map(Number)
      return month === currentMonthIndex + 1 && year === currentYear
    })
    .map((e) => Number(e.eventDate.split('-')[0]))
}
onMounted(fetchAllEvents)

const updateDaysWithEvents = () => {
  daysWithEvents.value = eventStore.events
    .filter((e) => e.eventDate)
    .filter((e) => {
      const [day, month, year] = e.eventDate.split('-').map(Number)
      return month === currentMonthIndex + 1 && year === currentYear
    })
    .map((e) => Number(e.eventDate.split('-')[0]))
}
watch(
  () => eventStore.events,
  () => {
    updateDaysWithEvents()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <section class="calendar-container">
    <h1 class="heading-medium text-center mb-6 text-black-static">{{ month }} {{ currentYear }}</h1>

    <!-- Days of the week -->
    <div class="calendar-grid mb-4">
      <div v-for="day in daysOfTheWeek" :key="day" class="font-semibold text-gray-700 dark:text-gray-300">
        {{ day }}
      </div>
    </div>

    <!-- Days -->
    <div class="calendar-grid">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="calendar-day"
  :class="[
  !day ? 'calendar-day-empty' : 'calendar-day-default',
  day && day === today && currentMonthIndex === now.getMonth() && currentYear === now.getFullYear()
    ? 'calendar-day-today'
    : '',
  selectedDay && selectedDay.value === day
    ? 'calendar-day-selected'
    : ''
]"

        @click="handleDayClick(day)"
        :aria-label="day ? `Select day ${day}` : 'Empty day'"
        role="button"
        tabindex="0"
        @keyup.enter="handleDayClick(day)"
        @keyup.space="handleDayClick(day)"
      >
        {{ day || '' }}
        <span v-if="day && daysWithEvents.includes(day)" class="event-indicator"></span>
      </div>
    </div>

    <!-- Selected day events -->
    <div v-if="selectedDay" class="mt-6 p-6 section-card relative">
      <button
        @click="selectedDay = null"
        class="btn-small-danger absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
        aria-label="Close event panel"
      >
        ✕
      </button>

      <h3 class="heading-small mb-4 text-black-static">
        Add Event for {{ selectedDay }}/{{ currentMonthIndex + 1 }}/{{ currentYear }}
      </h3>

      <div class="mb-6 space-y-3">
        <EventItem v-for="event in selectedDayEvents" :key="event.id" :event="event" />
        <p v-if="selectedDayEvents.length === 0" class="text-muted italic">No events for this day</p>
      </div>

      <div class="form-group mb-4">
        <label for="event-title" class="form-label">Event Title</label>
        <input
          v-model="newEventTitle"
          placeholder="Event title"
          class="form-input"
          aria-label="New event title"
          id="event-title"
          required
        />
      </div>

      <div class="form-group mb-6">
        <label for="event-details" class="form-label">Details</label>
        <textarea
          v-model="newEventDetails"
          placeholder="Event details"
          class="form-input resize-none"
          rows="3"
          aria-label="New event details"
          id="event-details"
        ></textarea>
      </div>
      
      <button @click="saveEvent" class="btn-primary w-full py-3" aria-label="Save new event">
        Save Event
      </button>
    </div>
  </section>
</template>
