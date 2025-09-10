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
  <div class="bg-blue-50 border border-blue-200 rounded-lg shadow p-4 flex flex-col justify-between">
    <div class="mb-2">
      <h3 class="font-semibold text-blue-800 text-lg">{{ note.noteTitle }}</h3>
      <p class="text-blue-700 text-sm mt-1">{{ note.noteContent }}</p>
    </div>
    <div class="flex justify-end gap-2 mt-3">
      <button
        @click="handleEdit"
        class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium transition"
      >
        Edit
      </button>
      <button
        @click="handleDelete"
        class="px-3 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 text-sm font-medium transition"
      >
        Delete
      </button>
    </div>
  </div>
</template>
