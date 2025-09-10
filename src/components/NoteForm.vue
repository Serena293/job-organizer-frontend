<script setup>
import { useToast } from 'primevue/usetoast'
import { useProfileStore } from '@/stores/profileStore'
import { reactive, watch } from 'vue'

const props = defineProps({
  editNote: {
    type: Object,
    default: null,
  },
})

const emits = defineEmits(['cancelEdit'])

const profileStore = useProfileStore()
const toast = useToast()

const newNote = reactive({
  noteTitle: '',
  noteContent: '',
})

// Precompila form se editNote cambia
watch(
  () => props.editNote,
  (note) => {
    if (note) {
      newNote.noteTitle = note.noteTitle
      newNote.noteContent = note.noteContent
    } else {
      newNote.noteTitle = ''
      newNote.noteContent = ''
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  // if (!newNote.noteTitle.trim() || !newNote.noteContent.trim()) {
  //   toast.add({ severity: 'warn', summary: 'Warning', detail: 'Insert title and content', life: 3000 })
  //   return
  // }

  try {
    if (props.editNote) {
    
      await profileStore.updateNote(props.editNote.id, {
        noteTitle: newNote.noteTitle,
        noteContent: newNote.noteContent,
      })
      toast.add({ severity: 'success', summary: 'Success', detail: 'Note updated', life: 3000 })
    } else {
   
      await profileStore.addNote({
        noteTitle: newNote.noteTitle,
        noteContent: newNote.noteContent,
      })
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Note Saved',
        life: 3000,
      })
    }

    // Reset form
    newNote.noteTitle = ''
    newNote.noteContent = ''
  } catch (error) {
    console.error('Error saving note:', error)
    toast.add({
      severity: 'error',
      summary: 'Errore',
      detail: error.message || 'Error saving note',
      life: 5000,
    })
  }
}

const cancelEditForm = () => {
  newNote.noteTitle = ''
  newNote.noteContent = ''
  emits('cancelEdit')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col">
    <fieldset class="bg-white shadow rounded-2xl p-6 flex flex-col">
      <legend class="font-semibold text-gray-700 mb-2">
        {{ editNote ? 'Edit Note' : 'Note to self' }}
      </legend>

      <input
        v-model="newNote.noteTitle"
        placeholder="Title"
        class="border border-gray-300 rounded mb-3 px-3"
      />

      <textarea
        v-model="newNote.noteContent"
        placeholder="Write your notes here..."
        class="flex-grow border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <div class="mt-3 flex gap-3">
        <button
          type="submit"
          class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {{ editNote ? 'Save Changes' : 'Save Note' }}
        </button>

        <button
          v-if="editNote"
          type="button"
          @click="cancelEditForm"
          class="px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </fieldset>
  </form>
</template>
