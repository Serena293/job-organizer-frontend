<script setup>
import BackButton from '@/components/BackButton.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const login = async (event) => {
  event.preventDefault() 

  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })

  if (response.ok) {
    const data = await response.json()
    authStore.login(data.token)
    router.push('/profile') 
  } else {
    console.log(response)
    console.log('Login failed')
  }
}
</script>

<template>
  <div class="bg-blue-50">
    <BackButton />
  </div>

  <section class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <form @submit="login">
      <fieldset class="flex flex-col border-2 py-10 px-20 rounded bg-white">
        <h2 class="text-center text-2xl font-semibold pb-5">Login</h2>

        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            v-model="username"
            class="border-2 px-2 mt-2 rounded"
          />
        </div>

        <div class="flex flex-col pb-5">
          <label for="password" class="font-semibold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Insert your password"
            v-model="password"
            class="border-2 px-2 mt-2 rounded"
          />
        </div>

        <button
          type="submit"
          class="border-1 rounded-full font-semibold bg-blue-900 hover:bg-blue-500 text-gray-300 py-1"
        >
          Login
        </button>

        <p class="pt-1">
          Don't have an account?
          <span class="text-blue-500 underline">
            <RouterLink to="/register">Sign up</RouterLink>
          </span>
        </p>
      </fieldset>
    </form>
  </section>
</template>
