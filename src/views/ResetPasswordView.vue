<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const token = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const error = ref('')


onMounted(() => {
  token.value = route.query.token || ''
  if (!token.value) {
    error.value = 'Invalid or missing token.'
  }
})

const resetPassword = async () => {
  error.value = ''
  message.value = ''

  if (!newPassword.value || !confirmPassword.value) {
    error.value = 'Please fill all fields.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  try {
    const response = await fetch('http://localhost:8080/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
      })
      
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(errText)
    }

    message.value = 'Password successfully updated! Redirecting to login...'
    setTimeout(() => router.push('/login'), 2000)
  } catch (err) {
    console.error(err)
    error.value = err.message || 'Something went wrong.'
  }
}
</script>

<template>
  <section class="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
    <form @submit.prevent="resetPassword" class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Reset Password</h2>

      <div class="flex flex-col mb-4">
        <label class="mb-2 font-medium">New Password:</label>
        <input type="password" v-model="newPassword"
               class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 font-medium">Confirm Password:</label>
        <input type="password" v-model="confirmPassword"
               class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Reset Password
      </button>

      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </form>
  </section>
</template>
