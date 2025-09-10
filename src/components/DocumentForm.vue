<script setup>
import { reactive } from 'vue'
import { useProfileStore } from '@/stores/profileStore'

const profileStore = useProfileStore()

const form = reactive({
  documentName: '',
  documentDescription: '',
  documentPath: '', // al momento solo stringa
})

const saveDocument = async () => {
  const newDocument = {
    documentName: form.documentName,
    documentDescription: form.documentDescription,
    documentPath: form.documentPath, // puoi metterci un placeholder tipo "cv.pdf"
  }

  try {
    await profileStore.addDocument(newDocument)

    // reset campi
    form.documentName = ''
    form.documentDescription = ''
    form.documentPath = ''
  } catch (error) {
    console.error(error)
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
        <label for="document-path">Document Path (temporaneo)</label>
        <input
          v-model="form.documentPath"
          id="document-path"
          name="document-path"
          placeholder="Eg. cv.pdf"
          class="border rounded px-2 py-1 text-sm w-80"
        />
      </div>

      <button
        class="border rounded px-3 py-1 mt-2 bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        Save
      </button>
    </fieldset>
  </form>
</template>
