<script setup>
import BackButton from '@/components/BackButton.vue'
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
// import { useInputClasses } from '@/utilities/useInputClasses'
import { API_BASE_URL } from '@/config/api.js'
const toast = useToast()
const router = useRouter()

const serverError = ref('')
const errors = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// const { normal, error } = useInputClasses()
// const inputClass = (field) => (errors[field] ? error : normal)

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)

const validateForm = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  serverError.value = ''

  if (!form.firstName.trim()) errors.firstName = 'First name is required'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required'
  if (!form.username.trim() || form.username.length < 3)
    errors.username = 'Username must be at least 3 characters'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email format is invalid'
  if (!form.password.trim() || form.password.length < 8)
    errors.password = 'Password must be at least 8 characters'
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match'

  return Object.keys(errors).every((key) => !errors[key])
}

const createNewUser = async (event) => {
  event.preventDefault()
  loading.value = true
  if (!validateForm()) {
    loading.value = false
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (response.ok) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User registered successfully',
        life: 3000,
      })
      Object.keys(form).forEach((key) => (form[key] = ''))

       await router.push('/login')
    } else {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { error: await response.text() }
      }

      if (errorData.error && errorData.error.toLowerCase().includes('email')) {
        errors.email = errorData.error
        serverError.value = ''
      } else {
        serverError.value = errorData.error || 'Registration failed'
      }

      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: serverError.value || errors.email || 'Registration failed',
        life: 3000,
      })

      console.error('Server error:', errorData)
    }
  } catch (error) {
    serverError.value = 'Server connection error'
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: serverError.value,
      life: 3000,
    })
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <main class="min-screen-height bg-primary">
    <BackButton class="mb-6" />

    <form
      @submit.prevent="createNewUser"
      class="form-container max-w-md mx-auto"
      role="form"
      aria-label="Create account form"
    >
      <fieldset class="form-fieldset">
        <legend class="section-legend">Create Account</legend>

        <!-- First Name -->
        <div class="form-group">
          <label for="first-name" class="form-label">First Name</label>
          <input
            id="first-name"
            v-model="form.firstName"
            placeholder="Your name"
            class="form-input"
            required
            aria-describedby="firstName-error"
            aria-label="First Name"
          />
          <p v-if="errors.firstName" id="firstName-error" class="form-error">
            {{ errors.firstName }}
          </p>
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label for="last-name" class="form-label">Last Name</label>
          <input
            id="last-name"
            v-model="form.lastName"
            placeholder="Your last name"
            class="form-input"
            required
            aria-describedby="lastName-error"
            aria-label="Last Name"
          />
          <p v-if="errors.lastName" id="lastName-error" class="form-error">{{ errors.lastName }}</p>
        </div>

        <!-- Username -->
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="form.username"
            placeholder="Username"
            class="form-input"
            required
            aria-describedby="username-error"
            aria-label="Username"
          />
          <p v-if="errors.username" id="username-error" class="form-error">{{ errors.username }}</p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            placeholder="example@email.com"
            class="form-input"
            required
            aria-describedby="email-error"
            aria-label="Email address"
          />
          <p v-if="errors.email" id="email-error" class="form-error">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="Insert your password"
            class="form-input"
            required
            aria-describedby="password-error"
            aria-label="Password"
          />
          <p v-if="errors.password" id="password-error" class="form-error">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            v-model="form.confirmPassword"
            placeholder="Re-enter password"
            class="form-input"
            required
            aria-describedby="confirmPassword-error"
            aria-label="Confirm Password"
          />
          <p v-if="errors.confirmPassword" id="confirmPassword-error" class="form-error">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <button
          :disabled="loading"
          type="submit"
          class="btn-primary w-full py-3 mt-6"
          aria-label="Create new account"
        >
          Create Account
        </button>

        <div class="pt-6 text-center">
          <p class="text-gray-700 dark:text-gray-300">
            Already have an account?
            <RouterLink to="/login" class="btn-text" aria-label="Go to login page"
              >Log in</RouterLink
            >
          </p>
        </div>
      </fieldset>
    </form>
  </main>
</template>
