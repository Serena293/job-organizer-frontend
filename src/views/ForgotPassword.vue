<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')
const error = ref('')

const sendEmail = async () => {
  error.value = ''
  message.value = ''
  if (!email.value) {
    error.value = 'Please enter your email.'
    return
  }

  try {
    const response = await fetch('http://localhost:8080/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
     
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
   console.log(response.data)
    message.value = 'If this email exists, you will receive a reset link.'
  } catch (error) {
    error.value = 'Something went wrong. Try again later.'
  }
}
</script>

<template>
  <section class="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
    <form @submit.prevent="sendEmail" class="bg-white rounded-lg shadow-md p-8 w-full max-w-md"> 
      <h2 class="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

      <div class="flex flex-col mb-4">
        <label for="find-email" class="mb-2 font-medium">
          Type the email associated with your account:
        </label>
        <input type="email" id="find-email" v-model="email"
               placeholder="email@example.com"
               class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Send Email
      </button>

      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
      <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    </form>
  </section>
</template>
