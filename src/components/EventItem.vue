<script setup>
import { ref } from 'vue'
import { useEventStore } from '@/stores/eventStore'
// import BackButton from 'primevue/button/BackButton.vue';
import Dialog from 'primevue/dialog/Dialog.vue';
import InputText from 'primevue/inputtext/InputText.vue';
import Textarea from 'primevue/textarea/Textarea.vue';


const { event: eventData } = defineProps({
  event: Object
})
const eventStore = useEventStore()

const editDialog = ref(false)
const editedTitle = ref('')
const editedDescription = ref('')


const openEdit = () => {
  editedTitle.value = eventData.eventTitle
  editedDescription.value = eventData.eventDescription
  editDialog.value = true
}


const saveEdit = async () => {
  const updatedEvent = {
    eventTitle: editedTitle.value,
    eventDescription: editedDescription.value,
    eventDate: eventData.eventDate
  }
  await eventStore.updateEvent(eventData.id, updatedEvent)
  editDialog.value = false
}


const deleteEvent = async () => {
  if (confirm('Are you sure you want to delete this event?')) {
    await eventStore.deleteEvent(eventData.id)
  }
}
</script>

<template>
  <div class="section-card">
    <div class="flex-between-start">
      <div>
        <h4 class="heading-small">{{ eventData.eventTitle }}</h4>
        <p class="text-small-muted" v-if="eventData.eventDescription">
          {{ eventData.eventDescription }}
        </p>
      </div>
      <div class="document-actions">
        <button 
          class="btn-small-primary" 
          aria-label="Edit event" 
          @click="openEdit">
          <i class="pi pi-pencil" aria-hidden="true"></i>
        </button>
        <button 
          class="btn-small-danger" 
          aria-label="Delete event" 
          @click="deleteEvent">
          <i class="pi pi-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <Dialog 
      header="Edit Event" 
      v-model:visible="editDialog" 
      modal 
      :closable="true" 
      :draggable="false"
      aria-label="Edit event dialog">

      <div class="flex-col-space p-4">
        <InputText 
          v-model="editedTitle" 
          placeholder="Event Title" 
          aria-label="Event title" />
        <Textarea 
          v-model="editedDescription" 
          placeholder="Event Description" 
          rows="3" 
          aria-label="Event description" />
        <div class="flex-end-space mt-2">
          <button 
            class="btn-small-warning" 
            aria-label="Cancel editing" 
            @click="editDialog = false">
            <i class="pi pi-times" aria-hidden="true"></i> Cancel
          </button>
          <button 
            class="btn-small-primary" 
            aria-label="Save changes" 
            @click="saveEdit">
            <i class="pi pi-check" aria-hidden="true"></i> Save
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
