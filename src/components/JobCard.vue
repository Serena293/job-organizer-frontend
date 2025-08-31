<script setup>
import { RouterLink} from 'vue-router'
import { defineProps, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
})
const showFullDescription = ref(false)

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const truncatedDescription = computed(() => {
  let description = props.job.description
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...'
  }
  return description
})
const deleteJob = () => {
  if (confirm(`Are you sure you want to delere ${props.job.title}?`)) {
    props.onDelete(props.job.id)
  }
}

const goToEdit = () => {
  router.push(`/job/edit/${props.job.id}`)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="flex w-full justify-between items-center">
          <span class="text-gray-600 my-2">{{ job.type }}</span>
          <button @click="deleteJob"><i class="pi pi-trash text-red-500"></i></button>
          <button @click="goToEdit"><i class="pi pi-pen-to-square text-orange-500"></i></button>
        </div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDescription }}
        </div>
        <button @click="toggleFullDescription" class="text-blue-500 hover:text-blue-600 mb-5">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <h3 class="text-blue-500 mb-2">{{ job.salary }} / Year</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ job.location }}
        </div>
        <RouterLink
          :to="{ name: 'job-detail', params: { id: job.id } }"
          class="h-[36px] bg-blue-500 hover:bg-grey-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
