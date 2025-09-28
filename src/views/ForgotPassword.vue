<script setup>
import BackButton from '@/components/BackButton.vue'
import { ref } from 'vue'
import { API_BASE_URL } from '@/config/api'

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
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
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
  <main class="min-screen-height bg-primary">
    <BackButton />
    <div class="container-responsive">     
      
      <form @submit.prevent="sendEmail" role="form" aria-label="Forgot password form" class="form-container max-w-md mx-auto"> 
        <fieldset class="form-fieldset">
          <legend class="section-legend text-center">Forgot Password</legend>

          <div class="form-group">
            <label for="find-email" class="form-label">
              Type the email associated with your account:
            </label>
            <input 
              type="email" 
              id="find-email" 
              v-model="email"
              placeholder="email@example.com"
              class="form-input"
              required
              aria-describedby="message error"
              aria-label="Email address for password recovery"
            />
          </div>

          <button type="submit" class="btn-primary w-full py-3 my-3" aria-label="Send password reset email">
            Send Email
          </button>

          <p v-if="message" id="message" class="mt-4 text-green-600 dark:text-green-400">
            {{ message }}
          </p>
          <p v-if="error" id="error" class="form-error mt-2">
            {{ error }}
          </p>
        </fieldset>
      </form>
    </div>
  </main>
</template>
