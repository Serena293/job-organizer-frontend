<script setup>
import { reactive, ref } from 'vue'
import { useProfileStore } from '@/stores/profileStore.js'
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
    profileStore.fetchDocuments()
    toast.add({
      severity: 'success',
      summary: 'Upload successful',
      detail: fileName,
      life: 3000
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Upload failed',
      detail: error.message || 'Check console.',
      life: 3000
    })
  }
}
</script>

<template>
  <form @submit.prevent="saveDocument" aria-label="Upload document form">
    <fieldset class="space-y-3 form-fieldset">
      <div class="form-group">
        <label for="document-name" class="form-label">Document Name</label>
        <input
          v-model="form.documentName"
          id="document-name"
          name="document-name"
          placeholder="Eg. Curriculum Vitae"
          class="form-input"
          aria-required="true"
        />
      </div>

      <div class="form-group">
        <label for="document-description" class="form-label">Document Description</label>
        <textarea
          v-model="form.documentDescription"
          id="document-description"
          name="document-description"
          placeholder="Eg. CV for FrontEnd roles"
          class="form-input"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="file" class="form-label">Select File</label>
        <input
          type="file"
          @change="handleFileChange"
          id="file"
          name="file"
          class="form-input"
        />

        <p v-if="selectedFile" class="text-sm text-gray-600 mt-1">
          Selected file: {{ selectedFile.documentName }}
        </p>
      </div>

      <button
        class="btn-primary"
        aria-label="Upload document"
        type="submit"
      >
        Upload
      </button>
    </fieldset>
  </form>
</template>
