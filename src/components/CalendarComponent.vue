<script setup>
import { ref, computed } from 'vue'
import { useEventStore } from '@/stores/eventStore'
import { useAuthStore } from '@/stores/authStore'

const eventStore = useEventStore()
const authStore = useAuthStore()

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

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

const eventsForDay = (day) => {
  const dateStr = `${currentYear}-${currentMonthIndex + 1}-${day}`
  return eventStore.events.filter((e) => e.date === dateStr)
}

const handleDayClick = (day) => {
  if (!authStore.isLoggedIn || !day) return
  if (selectedDay.value === day) {
    selectedDay.value = null
    newEventTitle.value = ''
  } else {
    selectedDay.value = day
    newEventTitle.value = ''
  }
}

const saveEvent = () => {
  if (!newEventTitle.value || !selectedDay.value) return
  const dateStr = `${currentYear}-${currentMonthIndex + 1}-${selectedDay.value}`
  eventStore.addEvent({ title: newEventTitle.value, date: dateStr })
  selectedDay.value = null
  newEventTitle.value = ''
}
</script>

<template>
  <section class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-center">{{ month }} {{ currentYear }}</h1>

    <div class="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
      <div v-for="day in daysOfTheWeek" :key="day">{{ day }}</div>
    </div>

    <div class="grid grid-cols-7 gap-2 text-center">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="p-2 border rounded text-center relative cursor-pointer transition-colors"
        :class="[
          day ? classToday(day) : 'bg-transparent border-none',
          selectedDay === day ? 'bg-blue-200 border-blue-400' : 'hover:bg-gray-200',
        ]"
        @click="handleDayClick(day)"
      >
        {{ day || '' }}
        <span
          v-if="day && eventsForDay(day).length > 0"
          class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
        ></span>
      </div>
    </div>
    <div v-if="selectedDay" class="mt-4 p-4 bg-white rounded shadow relative">
      <button
        @click="selectedDay = null"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h3 class="font-semibold mb-2">
        Add Event for {{ selectedDay }}/{{ currentMonthIndex + 1 }}/{{ currentYear }}
      </h3>
      <input
        v-model="newEventTitle"
        placeholder="Event title"
        class="border rounded px-2 py-1 w-full mb-2"
      />
      <button @click="saveEvent" class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        Save
      </button>
    </div>
  </section>
</template>
