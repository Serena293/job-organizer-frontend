<script setup>
import NoteForm from '@/components/NoteForm.vue'
import NotesComponent from '@/components/NotesComponent.vue'
import { ref } from 'vue'

const showNoteForm = ref(false)
const noteBeingEdited = ref(null)

const toggleNoteForm = () => {
  if (noteBeingEdited.value) return
  showNoteForm.value = !showNoteForm.value
}

const editNoteHandler = (note) => {
  noteBeingEdited.value = note
  showNoteForm.value = true
}

const cancelNoteEdit = () => {
  noteBeingEdited.value = null
  showNoteForm.value = false
}
</script>

<template>
  <fieldset class="form-fieldset" role="region" aria-label="Notes Section">
<legend class="form-legend flex justify-between items-center w-full mb-4">
  <span class="text-black-static">Notes</span>
  <button
    @click="toggleNoteForm"
class="btn-small-primary  flex items-center gap-2"
    :disabled="noteBeingEdited"
    :aria-label="showNoteForm && !noteBeingEdited ? 'Cancel adding note' : 'Add new note'"
  >
    <i class="pi" :class="showNoteForm && !noteBeingEdited ? 'pi-times' : 'pi-plus'"></i>
    {{ showNoteForm && !noteBeingEdited ? 'Cancel' : 'Add note' }}
  </button>
</legend>


    <div class="mt-4">
      <NoteForm
        v-if="showNoteForm || noteBeingEdited"
        :editNote="noteBeingEdited"
        @cancelEdit="cancelNoteEdit"
        @saved="showNoteForm = false, noteBeingEdited = null"
        class="mb-4"
      />
      <NotesComponent
        @editNote="editNoteHandler"
        :class="{ 'opacity-50': showNoteForm || noteBeingEdited }"
      />
    </div>
  </fieldset>
</template>

