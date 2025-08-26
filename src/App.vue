<script setup>
import { ref, onMounted } from 'vue'

const title = ref('titolo')
const jobsList = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/jobs/all')
    // console.log(response)
    const data = await response.json()
    console.log(data)
    jobsList.value = data.map((jobsList) => jobsList.title)
  } catch (error) {
    console.log('ERRORE FETCH:', error)
  }
})
</script>
<template>
  <h1>{{ title }}</h1>
  <ul>
    <li v-for="job in jobsList" :key="job.id">{{ job }}</li>
  </ul>
</template>
