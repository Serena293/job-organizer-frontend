<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  firstName: props.user.firstName,
  lastName: props.user.lastName,
  username: props.user.username,
  email: props.user.email,
  password: '',
})

const showPassword = ref(false)

const saveChanges = () => {
  emit('save', {
    email: form.value.email,
    username: form.value.username,
    password: form.value.password || undefined, // solo se cambiata
  })
}

const cancelEdit = () => {
  emit('cancel')
}
</script>

<template>
  <div class="border border-gray-300 rounded-lg p-4 mt-4 bg-white shadow">
    <h3 class="font-semibold text-lg mb-3">Edit Profile</h3>

    <div class="space-y-3">

      <div>
        <label class="block text-sm font-medium text-gray-600">First Name</label>
        <input
          v-model="form.firstName"
          disabled
          class="border rounded px-2 py-1 w-full bg-gray-100 text-gray-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600">Last Name</label>
        <input
          v-model="form.lastName"
          disabled
          class="border rounded px-2 py-1 w-full bg-gray-100 text-gray-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600">Username</label>
        <input v-model="form.username" class="border rounded px-2 py-1 w-full" />
      </div>

   
      <div>
        <label class="block text-sm font-medium text-gray-600">Email</label>
        <input type="email" v-model="form.email" class="border rounded px-2 py-1 w-full" />
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-gray-600">Password</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Enter new password"
            class="border rounded px-2 py-1 w-full pr-10"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 px-2 text-gray-500"
          >
            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2 mt-4">
      <button
        @click="cancelEdit"
        class="px-4 py-1 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        @click="saveChanges"
        class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  </div>
</template>
