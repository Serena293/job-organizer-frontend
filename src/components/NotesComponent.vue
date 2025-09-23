<script setup>
import { onMounted, ref } from 'vue'
import { useProfileStore } from '@/stores/profileStore'
import NoteCard from './NoteCard.vue'

const profileStore = useProfileStore()
// const noteBeingEdited = ref(null)
onMounted(() => {
  profileStore.fetchNotes()
})

const deleteNote = async (note) => {
  if (confirm('Are you sure you want to delete this note?')) {
    await profileStore.deleteNote(note.id)
  }
}
</script>

<template>
  <main class="profile-main-content" role="main" aria-label="Notes">
    <NoteCard
      v-for="note in profileStore.notes"
      :key="note.id"
      :note="note"
      @edit="$emit('editNote', $event)"
      @delete="deleteNote"
    />
  </main>
</template>

