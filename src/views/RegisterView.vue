<script setup>
import BackButton from '@/components/BackButton.vue'
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const createNewUser = async (event) => {
  event.preventDefault()

  const newUser = {
    firstName: form.firstName,
    lastName: form.lastName,
    username: form.username,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
  }
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })

  if (response.ok) {
    const data = await response.json()
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User Created',
      life: 3000,
    })
    router.push('/profile')
  } else {
    toast.add({
      severity: 'error',
      summery: 'error',
      detail: 'Error: ',
      life: 3000,
    })
    throw new Error(`HTTP error! status: ${response.status}`)
  }
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
          <input v-model="form.firstName" id="first-name" placeholder="Your name" class="border-2 px-2 mt-2 rounded" />
        </div>

        <div class="flex flex-col pb-5">
          <label for="last-name" class="font-semibold">Last Name</label>
          <input v-model="form.lastName" id="last-name" placeholder="Your last name" class="border-2 px-2 mt-2 rounded" />
        </div>
        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Username</label>
          <input
            id="username"
            type="string"
            placeholder="Username"
            class="border-2 px-2 mt-2 rounded"
            v-model="form.username"
          />
        </div>

        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            class="border-2 px-2 mt-2 rounded"
            v-model="form.email"
          />
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
          />
          <div class="flex flex-col pb-5">
            <label for="confirm-password" class="font-semibold">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Re-enter password"
              class="border-2 px-2 mt-2 rounded"
              v-model="form.confirmPassword"
            />
          </div>
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
