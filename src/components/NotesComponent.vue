<script setup>
import { onMounted, ref } from 'vue'
import { useProfileStore } from '@/stores/profileStore'
import NoteCard from './NoteCard.vue'
import NoteForm from './NoteForm.vue'

const profileStore = useProfileStore()
const noteBeingEdited = ref(null)
onMounted(() => {
  profileStore.fetchNotes()
})

// const editNote = (note) => {
//   noteBeingEdited.value = note
// //   console.log('Edit note:', note)
// }

const deleteNote = async (note) => {
  if (confirm('Are you sure you want to delete this note?')) {
    await profileStore.deleteNote(note.id)
  }
}
</script>

<template>
  <section class="space-y-4 overflow-y-auto max-h-[70vh]">
 

   <NoteCard
  v-for="note in profileStore.notes"
  :key="note.id"
  :note="note"
  @edit="$emit('editNote', $event)"
  @delete="deleteNote"
/>

  </section>
</template>
