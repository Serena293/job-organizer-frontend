<script setup>
import { ref, computed } from 'vue'

// Date corrente
const now = new Date()
const currentYear = now.getFullYear()
const currentMonthIndex = now.getMonth()

// Nomi mesi e giorni
const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Mese corrente come stringa
const month = ref(monthNames[currentMonthIndex])

// Numero di giorni nel mese
function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

// Calcola i giorni da mostrare
const days = computed(() => {
  const numDays = getDaysInMonth(currentYear, currentMonthIndex)
  return Array.from({ length: numDays }, (_, i) => i + 1)
})
</script>

<template>
  <section class="p-6 max-w-md mx-auto">
    <!-- Mese -->
    <h1 class="text-2xl font-bold mb-4 text-center">{{ month }} {{ currentYear }}</h1>

    <!-- Giorni della settimana -->
    <div class="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
      <div v-for="day in daysOfTheWeek" :key="day">{{ day }}</div>
    </div>

    <!-- Giorni del mese -->
    <div class="grid grid-cols-7 gap-2 text-center">
      <div v-for="day in days" :key="day" class="p-2 border rounded">
        {{ day }}
      </div>
    </div>
  </section>
</template>
