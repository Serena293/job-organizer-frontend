<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)

const saveDocument  = () => {
    console.log('Document Saved')
}

const onFileSelected = (event) => 
 {
  selectedFile.value = event.target.files[0] || null
}
</script>

<template>
  <form @submit.prevent="saveDocument">
    <fieldset class="space-y-3">
      <div class="flex flex-col">
        <label for="document-name">Document Name</label>
        <input id="document-name" name="document-name" placeholder="Eg. Curriculum Vitae" class="border rounded px-2 py-1 text-sm w-80"/>
      </div>

      <div class="flex flex-col">
        <label for="document-description">Document Description</label>
        <textarea id="document-description" name="document-description" placeholder="Eg. CV for FrontEnd roles" class="border rounded px-2 py-1 text-sm w-80"></textarea>
      </div>

      <div class="flex flex-col">
        <label for="document-path" class="underline cursor-pointer">
          Select Document
        </label>
      
        <input id="document-path" name="document-path" type="file" class="hidden" @change="onFileSelected"/>
        
        <span v-if="selectedFile" class="text-sm text-gray-700 mt-1">
          Selezionato: {{ selectedFile.name }}
        </span>
      </div>

      <button class="border rounded px-3 py-1 mt-2 bg-blue-500 text-white hover:bg-blue-600 transition">
        Save
      </button>
    </fieldset>
  </form>
</template>
