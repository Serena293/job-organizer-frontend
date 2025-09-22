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
    password: form.value.password || undefined, 
  })
}

const cancelEdit = () => {
  emit('cancel')
}
</script>

<template>
  <!-- <section class="section-card"> -->
    
   

    <fieldset class=" form-fieldset space-y-3">
 <legend class="section-legend">Edit Profile</legend>
      <!-- First Name (disabled) -->
      <div class="form-group">
        <label class="form-label">First Name</label>
        <input
          v-model="form.firstName"
          disabled
          class="form-input bg-gray-100 text-gray-500"
          aria-label="First Name"
        />
      </div>

      <!-- Last Name (disabled) -->
      <div class="form-group">
        <label class="form-label">Last Name</label>
        <input
          v-model="form.lastName"
          disabled
          class="form-input bg-gray-100 text-gray-500"
          aria-label="Last Name"
        />
      </div>

      <!-- Username -->
      <div class="form-group">
        <label class="form-label">Username</label>
        <input
          v-model="form.username"
          class="form-input"
          aria-label="Username"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label class="form-label">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="form-input"
          aria-label="Email"
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Enter new password"
            class="form-input pr-10"
            aria-label="Password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 px-2 text-gray-500"
            aria-label="Toggle password visibility"
          >
            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
      </div>
   

    <!-- Actions -->
    <div class="flex justify-end gap-2 mt-4">
      <button
        @click="cancelEdit"
        class="btn-secondary"
        aria-label="Cancel editing profile"
      >
        Cancel
      </button>
      <button
        @click="saveChanges"
        class="btn-primary"
        aria-label="Save profile changes"
      >
        Save
      </button>
    </div> 
  </fieldset>
  <!-- </section> -->
</template>
