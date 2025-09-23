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
  <div class="job-card">
    <div class="p-4">
      <div class="job-card-header">
        <span class="job-type">{{ job.type }}</span>
        <div class="document-actions">
          <button 
            @click="deleteJob" 
            class="btn-small-danger" 
            aria-label="Delete job">
            <i class="pi pi-trash" aria-hidden="true"></i>
          </button>
          <button 
            @click="goToEdit" 
            class="btn-small-warning" 
            aria-label="Edit job">
            <i class="pi pi-pen-to-square" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <h3 class="job-title">{{ job.title }}</h3>

      <div class="job-description">
        <div>{{ truncatedDescription }}</div>
        <button 
          @click="toggleFullDescription" 
          class="job-toggle" 
          :aria-expanded="showFullDescription"
          :aria-controls="'job-desc-' + job.id">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <h3 class="job-salary">{{ job.salary }} / Year</h3>

      <div class="job-divider"></div>

      <div class="job-footer">
        <div class="job-location">
          <i class="pi pi-map-marker" aria-hidden="true"></i>
          {{ job.location }}
        </div>
        <RouterLink
          :to="{ name: 'job-detail', params: { id: job.id } }"
          class="job-readmore"
          aria-label="Read more about job: {{ job.title }}"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
