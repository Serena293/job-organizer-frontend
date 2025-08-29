<script setup>
import BackButton from '@/components/BackButton.vue';
import { onMounted, ref} from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const jobDet = ref([])
const route= useRoute();

const jobId = route.params.id;

 onMounted(async () => {
    try{
        const response = await fetch(`http://localhost:8080/jobs/${jobId}`)
        const data = await response.json()
        jobDet.value = data
    } catch (error){
        console.log('Error: ' + error)
    }
 })

</script>
<template>
    <BackButton/>
  <section class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
    
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-blue-700">
        {{ jobDet.title }}
      </h1>
      <span
        class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600"
      >
        {{ jobDet.status }}
      </span>
    </header>

    
    <dl class="grid grid-cols-3 gap-4 text-gray-600 text-sm">
      <div>
        <dt class="font-medium text-gray-800">Company</dt>
        <dd>{{ jobDet.company }}</dd>
      </div>
      <div>
        <dt class="font-medium text-gray-800">Location</dt>
        <dd class="flex items-center gap-1">
          <i class="fas fa-map-pin text-blue-500"></i> {{ jobDet.location }}
        </dd>
      </div>
      <div>
        <dt class="font-medium text-gray-800">Salary</dt>
        <dd>{{ jobDet.salary }}</dd>
      </div>
    </dl>

 
    <div>
      <p class="text-gray-700 leading-relaxed">
        {{ jobDet.description }}
      </p>
      <time
        :datetime="jobDet.startingDate"
        class="block mt-2 text-gray-500 italic text-sm text-right"
      >
        Start: {{ jobDet.startingDate }}
      </time>
    </div>

    <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
      <thead class="bg-blue-50">
        <tr>
          <th scope="col" class="p-3 text-blue-700 font-semibold text-center">
            Pros
          </th>
          <th scope="col" class="p-3 text-blue-700 font-semibold text-center">
            Cons
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="p-4 border-t border-gray-200 text-green-600 text-center">
            {{ jobDet.pros }}
          </td>
          <td class="p-4 border-t border-gray-200 text-red-600 text-center">
            {{ jobDet.cons }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
