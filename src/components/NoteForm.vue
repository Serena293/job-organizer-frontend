<script setup>
import { useToast } from 'primevue/usetoast'
import { useProfileStore } from '@/stores/profileStore.js'
import { reactive, watch } from 'vue'

const props = defineProps({
  editNote: {
    type: Object,
    default: null,
  },
})

const emits = defineEmits(['cancelEdit', 'saved'])

const profileStore = useProfileStore()
const toast = useToast()

const newNote = reactive({
  noteTitle: '',
  noteContent: '',
})

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
        life: 2000,
      })
    }

    // Reset form
    newNote.noteTitle = ''
    newNote.noteContent = ''

    emits('saved')
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
  <form @submit.prevent="handleSubmit" role="form" aria-label="Form to create or edit notes">
    <fieldset class="flex flex-col gap-3">
     
      <input
        v-model="newNote.noteTitle"
        placeholder="Title"
        class="form-input"
        aria-label="Note title"
        required
      />

      <textarea
        v-model="newNote.noteContent"
        placeholder="Write your notes here..."
        class="form-input"
        aria-label="Note content"
        rows="4"
        required
      ></textarea>

      <div class="flex-end-space mt-3">
        <button
          type="submit"
          class="btn-small-primary"
          :aria-label="editNote ? 'Save changes' : 'Save new note'"
        >
          {{ editNote ? 'Save Changes' : 'Save Note' }}
        </button>

        <button
          v-if="editNote"
          type="button"
          @click="cancelEditForm"
          class="btn-small-danger"
          aria-label="Cancel editing"
        >
          Cancel
        </button>
      </div>
    </fieldset>
  </form>
</template>
