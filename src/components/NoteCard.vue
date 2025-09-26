<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['edit', 'delete'])

const handleEdit = () => emits('edit', props.note)
const handleDelete = () => emits('delete', props.note)
</script>


<template>
  <div class="section-card flex flex-col justify-between mt-6" role="region" :aria-label="`Note: ${note.noteTitle}`">
    <div class="mb-2">
      <h3 class="heading-medium text-blue-800 dark:text-blue-400">{{ note.noteTitle }}</h3>
      <p class="text-small-muted dark:text-gray-300 mt-1">{{ note.noteContent }}</p>
    </div>
    <div class="flex-end-space mt-3">
      <button 
        @click="handleEdit" 
        class="btn-small-primary"
        aria-label="Edit note"
      >
        Edit
      </button>
      <button 
        @click="handleDelete" 
        class="btn-small-danger"
        aria-label="Delete note"
      >
        Delete
      </button>
    </div>
  </div>
</template>

