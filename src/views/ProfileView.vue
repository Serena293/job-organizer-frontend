<script setup>
import BackButton from '@/components/BackButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'
import { useRouter } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import DocumentForm from '@/components/DocumentForm.vue'
import NoteSection from '@/components/NoteSection.vue'
import EditProfile from '@/components/EditProfile.vue'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const showEditProfile = ref(false)
const showUploadForm = ref(false)
const editMode = ref(false)

const editingDoc = reactive({
  id: null,
  documentName: '',
  documentDescription: '',
  documentPath: '',
})

const toggleForm = () => {
  showUploadForm.value = !showUploadForm.value
  editMode.value = false
  resetEditingDoc()
}

onMounted(() => {
  authStore.fetchProfile()
  profileStore.fetchDocuments()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  console.log('logout')
}

const getDocumentIcon = (path) => {
  if (!path) return 'pi pi-file'
  if (path.endsWith('.pdf')) return 'pi pi-file-pdf'
  if (path.endsWith('.doc') || path.endsWith('.docx')) return 'pi pi-file-word'
  if (path.endsWith('.jpg') || path.endsWith('.png')) return 'pi pi-image'
  return 'pi pi-file'
}


const startEdit = (doc) => {
  editingDoc.id = doc.id
  editingDoc.documentName = doc.documentName
  editingDoc.documentDescription = doc.documentDescription
  editingDoc.documentPath = doc.documentPath
  editMode.value = true
  showUploadForm.value = true
}

const saveEdit = async () => {
  await profileStore.updateDocument(editingDoc.id, {
    documentName: editingDoc.documentName,
    documentDescription: editingDoc.documentDescription,
    documentPath: editingDoc.documentPath,
  })
  resetEditingDoc()
  editMode.value = false
  showUploadForm.value = false
}

const resetEditingDoc = () => {
  editingDoc.id = null
  editingDoc.documentName = ''
  editingDoc.documentDescription = ''
  editingDoc.documentPath = ''
}

const deleteDoc = async (id) => {
  if (confirm('Are you sure you want to delete this document?')) {
    await profileStore.deleteDocument(id)
  }
}

const handleSaveProfile = async (updatedData) => {
  try {
    await authStore.updateProfile(updatedData)
    showEditProfile.value = false
  } catch (err) {
    console.error('Errore aggiornamento profilo:', err)
    alert('Update failed, check console.')
  }
}
</script>

<template>
  <section class="bg-blue-50 min-h-screen flex items-center justify-center p-10">
    <div class="grid grid-cols-3 gap-6 w-full max-w-6xl">
      <div class="col-span-2 flex flex-col gap-6">
        <div class="flex justify-between flex-col">
          <div class="flex justify-between">
            <BackButton />
            <div class="flex gap-3">
              <button
                @click="showEditProfile = !showEditProfile"
                class="sm:py-0 sm:h-10 sm:self-center text-blue-700 font-semibold border border-blue-700 px-2 py-1 rounded-full hover:bg-blue-100"
              >
                 {{ showEditProfile ? 'Close Edit' : 'Edit Profile' }}
              </button>
              <button
                @click="handleLogout"
                class="sm:py-0 sm:h-10 sm:self-center text-red-600 font-semibold border border-red-600 px-4 py-1 rounded-full hover:bg-red-100"
              >
                Log out
              </button>
            </div>
          </div>
          <div>
            <h1 class="font-bold text-2xl">
              {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
            </h1>
            <h2 class="text-gray-600 text-lg">{{ authStore.user?.username }}</h2>
            <p class="text-gray-500">{{ authStore.user?.email }}</p>
          </div>
           <EditProfile
            v-if="showEditProfile"
            :user="authStore.user"
            @save="handleSaveProfile"
            @cancel="showEditProfile = false"
          />
        </div>

        <!-- Documents Section -->
        <fieldset class="bg-white shadow rounded-2xl p-6">
          <legend class="font-semibold text-gray-700 flex justify-between items-center">
            Documents
          </legend>

          <div class="mt-4 space-y-3">
            <div
              v-for="doc in profileStore.documents"
              :key="doc.id"
              class="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <i :class="getDocumentIcon(doc.documentPath)" class="text-blue-600 text-xl"></i>
                <div>
                  <p class="font-medium text-gray-800">{{ doc.documentName }}</p>
                  <p class="text-sm text-gray-500">{{ doc.documentDescription }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="startEdit(doc)"
                  class="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                >
                  Edit
                </button>
                <button
                  @click="deleteDoc(doc.id)"
                  class="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <p v-if="profileStore.documents.length === 0" class="text-sm text-gray-500">
              No documents uploaded yet.
            </p>
          </div>

          <button @click="toggleForm" class="text-sm text-gray-500 hover:text-gray-700 flex mt-4">
            {{ editMode ? 'Cancel edit' : 'Upload document' }}
            <i class="pi pi-plus text-sm pl-2" v-if="!editMode"></i>
          </button>

          <div v-if="showUploadForm" class="mt-4">
            <DocumentForm v-if="!editMode" mode="create" />
            <form v-else @submit.prevent="saveEdit" class="space-y-3">
              <div>
                <label for="name" class="block text-sm font-medium">Document Name</label>
                <input
                  v-model="editingDoc.documentName"
                  id="name"
                  class="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label for="desc" class="block text-sm font-medium">Description</label>
                <textarea
                  v-model="editingDoc.documentDescription"
                  id="desc"
                  class="border rounded px-2 py-1 w-full"
                ></textarea>
              </div>
              <div>
                <label for="path" class="block text-sm font-medium">Path</label>
                <input
                  v-model="editingDoc.documentPath"
                  id="path"
                  class="border rounded px-2 py-1 w-full"
                />
              </div>
              <button
                type="submit"
                class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </fieldset>
      </div>
      <!-- notes -->
      <NoteSection/>
    </div>
  </section>
 


</template>
