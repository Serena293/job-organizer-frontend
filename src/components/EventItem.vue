<script setup>
import { ref } from 'vue'
import { useEventStore } from '@/stores/eventStore'
import Button from 'primevue/button/Button.vue';
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
  <div class="bg-white shadow rounded p-2 mb-2 border border-gray-200">
    <div class="flex justify-between items-start">
      <div>
        <h4 class="font-semibold">{{ eventData.eventTitle }}</h4>
        <p class="text-sm text-gray-600" v-if="eventData.eventDescription">{{ event.eventDescription }}</p>
      </div>
      <div class="flex space-x-1">
        <Button icon="pi pi-pencil" class="p-button-text p-button-sm" @click="openEdit" />
        <Button icon="pi pi-trash" class="p-button-text p-button-sm text-red-600" @click="deleteEvent" />
      </div>
    </div>

    <Dialog header="Edit Event" v-model:visible="editDialog" modal :closable="true" :draggable="false" >
      <div class="flex flex-col space-y-2 p-4">
        <InputText v-model="editedTitle" placeholder="Event Title" />
        <Textarea v-model="editedDescription" placeholder="Event Description" rows="3" />
        <div class="flex justify-end space-x-2 mt-2">
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="editDialog = false" />
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveEdit" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
