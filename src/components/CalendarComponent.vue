<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useEventStore } from '@/stores/eventStore'
import { useAuthStore } from '@/stores/authStore'
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

const classToday = (day) => {
  if (day === today && currentMonthIndex === now.getMonth() && currentYear === now.getFullYear()) {
    return 'bg-gray-300'
  }
  return 'bg-white'
}

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
    <h1 class="heading-medium text-center mb-4">{{ month }} {{ currentYear }}</h1>

    <!-- Days of the week -->
    <div class="calendar-grid mb-2">
      <div v-for="day in daysOfTheWeek" :key="day">{{ day }}</div>
    </div>

    <!-- Days -->
    <div class="calendar-grid">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="calendar-day"
        :class="[
          day ? classToday(day) : 'calendar-day-empty',
          selectedDay === day ? 'bg-blue-200 border-blue-400' : 'hover:bg-gray-200',
        ]"
        @click="handleDayClick(day)"
        :aria-label="day ? `Select day ${day}` : ''"
      >
        {{ day || '' }}
        <span
          v-if="day && daysWithEvents.includes(day)"
          class="event-indicator"
        ></span>
      </div>
    </div>

    <!-- Selected day events -->
    <div v-if="selectedDay" class="mt-4 p-4 section-card relative">
      <button
        @click="selectedDay = null"
        class="btn-text absolute top-2 right-2"
        aria-label="Close event panel"
      >
        ✕
      </button>

      <h3 class="heading-medium mb-2">
        Add Event for {{ selectedDay }}/{{ currentMonthIndex + 1 }}/{{ currentYear }}
      </h3>

      <div class="mb-4">
        <EventItem v-for="event in selectedDayEvents" :key="event.id" :event="event" />
      </div>

      <h4 class="heading-medium mb-1">Add New Event</h4>
      <input
        v-model="newEventTitle"
        placeholder="Event title"
        class="form-input mb-2"
        aria-label="New event title"
      />
      <textarea
        v-model="newEventDetails"
        placeholder="Event Details"
        class="form-input resize-none mb-2"
        aria-label="New event details"
      ></textarea>

      <button
        @click="saveEvent"
        class="btn-primary"
        aria-label="Save new event"
      >
        Save
      </button>
    </div>
  </section>
</template>

