<script setup>
import { reactive, ref } from 'vue'
import { useProfileStore } from '@/stores/profileStore'
import { useToast } from 'primevue/usetoast'

const profileStore = useProfileStore()
const toast = useToast()

const selectedFile = ref(null)

const form = reactive({
  documentName: '',
  documentDescription: '',
})

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0] || null
}
const saveDocument = async () => {
  if (!selectedFile.value) {
    toast.add({
      severity: 'warn',
      summary: 'No file selected',
      detail: 'Please select a file before uploading.',
    })
    return
  }

  try {
    const formData = new FormData()
    formData.append('files', selectedFile.value)
    formData.append('documentName', form.documentName)
    formData.append('documentDescription', form.documentDescription)

    await profileStore.addDocument(formData)

    const fileName = selectedFile.value.name
    form.documentName = ''
    form.documentDescription = ''
    selectedFile.value = null
    const fileInput = document.getElementById('file')
    if (fileInput) fileInput.value = ''

    toast.add({
      severity: 'success',
      summary: 'Upload successful',
      detail: fileName,
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Upload failed',
      detail: error.message || 'Check console.',
    })
  }
}
</script>

<template>
  <form @submit.prevent="saveDocument">
    <fieldset class="space-y-3">
      <div class="flex flex-col">
        <label for="document-name">Document Name</label>
        <input
          v-model="form.documentName"
          id="document-name"
          name="document-name"
          placeholder="Eg. Curriculum Vitae"
          class="border rounded px-2 py-1 text-sm w-80"
        />
      </div>

      <div class="flex flex-col">
        <label for="document-description">Document Description</label>
        <textarea
          v-model="form.documentDescription"
          id="document-description"
          name="document-description"
          placeholder="Eg. CV for FrontEnd roles"
          class="border rounded px-2 py-1 text-sm w-80"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <label for="file">Select File</label>
        <input
          type="file"
          @change="handleFileChange"
          id="file"
          name="file"
          class="border rounded px-2 py-1 text-sm w-80"
        />

        <p v-if="selectedFile" class="text-sm text-gray-600 mt-1">
          Selected file: {{ selectedFile.documentName }}
        </p>
      </div>

      <button
        class="border rounded px-3 py-1 mt-2 bg-blue-500 text-white hover:bg-blue-600 transition"
        type="submit"
      >
        Upload
      </button>
    </fieldset>
  </form>
</template>
