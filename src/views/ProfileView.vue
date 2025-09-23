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
  file: null,
})

const handleFileChange = (event) => {
  editingDoc.file = event.target.files[0] || null
}

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
  const formData = new FormData()
  formData.append('documentName', editingDoc.documentName)
  formData.append('documentDescription', editingDoc.documentDescription)
  
  if (editingDoc.file) {
    formData.append('file', editingDoc.file)
  }
   
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
  editingDoc.file= null
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
  <main class="profile-container bg-primary">
    <header class="profile-header">
          <div class="profile-actions">
            <BackButton aria-label="Go back" />
            <div class="profile-action-buttons">
              <button
                @click="showEditProfile = !showEditProfile"
                class="btn-edit"
                :aria-label="showEditProfile ? 'Close edit profile' : 'Edit profile'"
              >
                {{ showEditProfile ? 'Close Edit' : 'Edit Profile' }}
              </button>
              <button
                @click="handleLogout"
                class="btn-logout"
                aria-label="Log out"
              >
                Log out
              </button>
            </div>
          </div>

          <div>
            <h1 class="heading-large text-gray-900 dark:text-white">
              {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
            </h1>
            <h2 class="text-muted text-lg">
              {{ authStore.user?.username }}
            </h2>
            <p class="text-muted">
              {{ authStore.user?.email }}
            </p>
          </div>

          <EditProfile
            v-if="showEditProfile"
            :user="authStore.user"
            @save="handleSaveProfile"
            @cancel="showEditProfile = false"
          />
        </header>

    <div class="profile-grid">
      <div class="profile-main-content">
       
        <!-- Documents Section -->
        <fieldset class="section-card">
          <legend class="section-legend">Documents</legend>

          <div class="section-content">
            <div
              v-for="doc in profileStore.documents"
              :key="doc.id"
              class="document-item"
            >
              <div class="document-info">
                <i
                  :class="getDocumentIcon(doc.documentPath)"
                  class="text-blue-600 dark:text-blue-400 text-xl"
                  aria-hidden="true"
                ></i>
                <div>
                  <p class="font-medium text-gray-800 dark:text-gray-200">
                    {{ doc.documentName }}
                  </p>
                  <p class="text-sm text-muted">
                    {{ doc.documentDescription }}
                  </p>
                </div>
              </div>

              <div class="document-actions">
                <button
                  @click="startEdit(doc)"
                  class="btn-small-warning"
                  aria-label="Edit document"
                >
                  Edit
                </button>
                <button
                  @click="deleteDoc(doc.id)"
                  class="btn-small-danger"
                  aria-label="Delete document"
                >
                  Delete
                </button>
              </div>
            </div>

            <p
              v-if="profileStore.documents.length === 0"
              class="empty-state"
            >
              No documents uploaded yet.
            </p>
          </div>

          <button
            @click="toggleForm"
            class="toggle-button"
            :aria-label="editMode ? 'Cancel edit' : 'Upload document'"
          >
            {{ editMode ? 'Cancel edit' : 'Upload document' }}
            <i
              class="pi pi-plus text-sm pl-2"
              v-if="!editMode"
              aria-hidden="true"
            ></i>
          </button>

          <div v-if="showUploadForm" class="mt-4">
            <DocumentForm v-if="!editMode" mode="create" />
            <form
              v-else
              @submit.prevent="saveEdit"
              class="space-y-3"
              aria-label="Edit document form"
            >
              <div>
                <label for="name" class="form-label">Document Name</label>
                <input
                  v-model="editingDoc.documentName"
                  id="name"
                  class="form-input"
                  aria-required="true"
                />
              </div>
              <div>
                <label for="desc" class="form-label">Description</label>
                <textarea
                  v-model="editingDoc.documentDescription"
                  id="desc"
                  class="form-input resize-none"
                  aria-required="false"
                ></textarea>
              </div>
              <div>
                <label for="file" class="form-label">Change File</label>
                <input
                  type="file"
                  @change="handleFileChange"
                  id="file"
                  class="form-input"
                />
                <p
                  v-if="editingDoc.file"
                  class="text-sm text-muted mt-1"
                >
                  New file: {{ editingDoc.file.name }}
                </p>
                <p
                  v-else
                  class="text-sm text-muted mt-1"
                >
                  Current file: {{ editingDoc.documentPath }}
                </p>
              </div>
              <button
                type="submit"
                class="btn-small-primary"
                aria-label="Save document changes"
              >
                Save Changes
              </button>
            </form>
          </div>
        </fieldset>
      </div>

      <!-- Notes Section -->
      <NoteSection />
    </div>
  </main>
</template>


