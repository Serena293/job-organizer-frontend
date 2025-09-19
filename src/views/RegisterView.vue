<script setup>
import BackButton from '@/components/BackButton.vue'
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useInputClasses } from '@/utilities/useInputClasses'
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

const { normal, error } = useInputClasses()
const inputClass = (field) => (errors[field] ? error : normal)

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

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
  if (!validateForm()) return

  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (response.ok) {
      // const data = await response.json()
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User Created',
        life: 3000,
      })
      router.push('/login')
    } else {
     let errorData;
     try{
      errorData = await  response. json()
     }
     catch {
      errorData = {error: await response.text()}
     }
      if (errorData.error && errorData.error.toLowerCase().includes('email')) {
        errors.email = errorData.error 
      } else {
        serverError.value = errorData.error || 'Registration failed'
      }
      

      toast.add({
        severity: 'error',
        summary: 'error',
        detail: 'Error: ',
        life: 3000,
      })
      const text = await response.text()
      console.error('Server error:', text)
    }
  } catch (error) {
    serverError.value = 'Server connection errror'
    toast.add({ severity: 'error', summary: 'Error', detail: serverError.value, life: 3000 })
    console.error(error)
  }
  // throw new Error(`HTTP error! status: ${response.status}`)
}
</script>
<template>
  <div class="bg-blue-50">
    <BackButton />
  </div>
  <section class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <form @submit="createNewUser">
      <fieldset class="flex flex-col border-2 py-10 px-20 rounded bg-white">
        <h2 class="text-center text-2xl font-semibold pb-5">Create Account</h2>
        <div class="flex flex-col pb-5">
          <label for="first-name" class="font-semibold">First Name</label>
          <input
            v-model="form.firstName"
            id="first-name"
            placeholder="Your name"
            class="border-2 px-2 mt-2 rounded"
            :class="inputClass('firstName')"
          />
          <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
        </div>

        <div class="flex flex-col pb-5">
          <label for="last-name" class="font-semibold">Last Name</label>
          <input
            v-model="form.lastName"
            id="last-name"
            placeholder="Your last name"
            class="border-2 px-2 mt-2 rounded"
            :class="inputClass('lastName')"
          />
          <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
        </div>
        <div class="flex flex-col pb-5">
          <label for="username" class="font-semibold">Username</label>
          <input
            id="username"
            type="string"
            placeholder="Username"
            class="border-2 px-2 mt-2 rounded"
            v-model="form.username"
            :class="inputClass('username')"
          />
          <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
        </div>

        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            class="border-2 px-2 mt-2 rounded"
            v-model="form.email"
            :class="inputClass('email')"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div class="flex flex-col pb-5">
          <label for="password" class="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Insert your password"
            class="border-2 px-2 mt-2 rounded"
            v-model="form.password"
            :class="inputClass(password)"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>
        <div class="flex flex-col pb-5">
          <label for="confirm-password" class="font-semibold">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Re-enter password"
            class="border-2 px-2 mt-2 rounded"
            v-model="form.confirmPassword"
            :class="inputClass(confirmPassword)"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <button
          type="submit"
          class="border-1 rounded-full font-semibold bg-blue-900 hover:bg-blue-500 text-gray-300 py-1"
        >
          Create account
        </button>
        <p class="pt-1">
          Alreadey have an account?
          <span class="text-blue-500 underline"><RouterLink to="login">Log in </RouterLink></span>
        </p>
      </fieldset>
    </form>
  </section>
</template>
