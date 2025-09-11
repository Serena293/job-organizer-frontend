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
  <fieldset class="bg-white shadow rounded-2xl p-6">
    <legend class="font-semibold text-gray-700 flex justify-between items-center w-full mb-4">
      <span>Notes</span>
      <button
        @click="toggleNoteForm"
        class="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
        :disabled="noteBeingEdited"
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
        @saved="
          showNoteForm = false,
          noteBeingEdited = null
        "
        class="mb-4"
      />
      <NotesComponent
        @editNote="editNoteHandler"
        :class="{ 'opacity-50': showNoteForm || noteBeingEdited }"
      />
    </div>
  </fieldset>
</template>
