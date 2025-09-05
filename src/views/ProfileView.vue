<script setup>
import BackButton from '@/components/BackButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import DocumentForm from '@/components/DocumentForm.vue'


const router = useRouter()
const authStore = useAuthStore()
const showUploadForm = ref(false)

const toggleForm = () => {
  showUploadForm.value = !showUploadForm.value
}

onMounted(() => {
  authStore.fetchProfile()
})


const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  console.log('logout')
}
</script>
<template>
  <section class="bg-blue-50 min-h-screen flex items-center justify-center p-10">
    <div class="grid grid-cols-3 gap-6 w-full max-w-6xl">
      <div class="col-span-2 flex flex-col gap-6">
        <div class="flex justify-between items-center">
          <BackButton />
          <div class="flex gap-3">
            <button
              class="text-blue-700 font-semibold border border-blue-700 px-4 py-1 rounded-full hover:bg-blue-100"
            >
              Edit Profile
            </button>
            <button
              @click="handleLogout"
              class="text-red-600 font-semibold border border-red-600 px-4 py-1 rounded-full hover:bg-red-100"
            >
              Log out
            </button>
          </div>
        </div>
<fieldset class="bg-white shadow rounded-2xl p-6">
  <legend class="font-semibold text-gray-700 flex justify-between items-center">
    Documents
    </legend>


  <div class="mt-4 space-y-2">
    <!-- qui farai il v-for per i documenti -->
  </div>

    <button 
      @click="toggleForm" 
      class="text-sm text-gray-500 hover:text-gray-700 flex ">
      Upload document 
      <i class="pi pi-plus text-sm pl-2"></i>
    </button>
  
  <div v-if="showUploadForm" class="mt-4">
    <DocumentForm mode="create" />
  </div>
</fieldset>
      </div>

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
