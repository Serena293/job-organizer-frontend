<script setup>
import { ref, computed } from 'vue'

// Date corrente
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

// Nomi mesi e giorni
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

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate()
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
        class="p-2 border rounded text-center"
        :class="day ? classToday(day) : 'bg-transparent'"
      >
        {{ day || '' }}
      </div>
    </div>
  </section>
</template>
