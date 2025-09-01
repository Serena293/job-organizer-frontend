<script setup>
import BackButton from '@/components/BackButton.vue'
</script>
<template>
  <section class="bg-blue-50 min-h-screen flex items-center justify-center p-10">
    <div class="grid grid-cols-3 gap-6 w-full max-w-6xl">
      
      <!-- LEFT COLUMN: Profile info -->
      <div class="col-span-2 flex flex-col gap-6">
        
        <!-- Actions -->
        <div class="flex justify-between items-center">
          <BackButton />
          <div class="flex gap-3">
            <button class="text-blue-700 font-semibold border border-blue-700 px-4 py-1 rounded-full hover:bg-blue-100">
              Edit Profile
            </button>
            <button class="text-red-600 font-semibold border border-red-600 px-4 py-1 rounded-full hover:bg-red-100">
              Delete Profile
            </button>
          </div>
        </div>

        <!-- Profile Details -->
        <fieldset class="bg-white shadow rounded-2xl p-6">
          <h1 class="font-bold text-2xl">Serena Ferraro</h1>
          <h2 class="text-gray-600 text-lg">Job Title</h2>
        </fieldset>

        <!-- Documents -->
        <fieldset class="bg-white shadow rounded-2xl p-6">
          <legend class="font-semibold text-gray-700">Documents</legend>
          <p class="text-sm text-gray-500">Upload and manage your documents here.</p>
        </fieldset>
      </div>

      <!-- RIGHT COLUMN: Notes -->
      <div class="col-span-1">
        <fieldset class="bg-white shadow rounded-2xl p-6 h-full flex flex-col">
          <legend class="font-semibold text-gray-700 mb-2">Note to self</legend>
          <textarea 
            placeholder="Write your notes here..."
            class="flex-grow border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </fieldset>
      </div>
    </div>
  </section>
</template>

