<script setup>
import BackButton from '@/components/BackButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useInputClasses } from '@/utilities/useInputClasses'

const { normal, error, vaild } = useInputClasses()

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errors = reactive({
  email: '',
  password: '',
})
const serverError = ref(null)

const emailClass = computed(() => (errors.email ? error : normal))
const passClass = computed(()=>(errors.password? error :normal))

const validateForm = () => {
 errors.email = ''
 errors.password = ''

  if (!email.value.trim()) {
    errors.email = 'Mandatory field'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.email = 'Insert valid Email'
  }

  if (!password.value.trim()) {
    errors.password = 'Insert Password'
  } else if( password.value.length < 8 ){
    errors.password = 'Password to short'
  }
  
  // console.log(serverError.value)
  // console.log(Object.keys(errors).length)
  console.log(errors.email === '' || errors.password === '')
  
  return errors.email === '' && errors.password === ''
}

const login = async (event) => {
  event.preventDefault()
  serverError.value = ''
  // console.log(serverError.value)
  if (!validateForm()) { console.log('non validato'); return}
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value}),
    })

    if (response.ok) {
      const data = await response.json()
      authStore.login(data.token)
      router.push('/profile')
    } else {
      const errorData = await response.json()
      // console.log(errorData,'errorData')
      // console.log(errorData.error, 'error in error data')
      serverError.value = errorData.error || 'Incorrect Email or Password'
        // console.log(serverError.value, 'server error')      
      // console.error('Login failed', errorData)
      throw new Error(errorData.error || 'Incorrect Email or password')
    }
  } catch (error) {
    serverError.value = 'Incorrect Email or Password'
  
    console.error(error)
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
            v-model="email"
            class="border-2 px-2 mt-2 rounded"
            :class="emailClass"
          />
          <!-- {{ console.log(errors.email) }} -->
          <!-- {{ console.log(serverError.value, '...') }} -->
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div class="flex flex-col pb-5">
          <label for="password" class="font-semibold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Insert your password"
            v-model="password"
            class="border-2 px-2 mt-2 rounded"
            :class="passClass"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
           <p v-if="serverError" class="text-red-500 text-sm mt-1">{{ serverError}}</p>
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
        <p class="pt-1">
          Forgot your password?
          <span class="text-blue-500 underline">
            <RouterLink to="/forgot-password">Click here</RouterLink>
          </span>
        </p>
      </fieldset>
    </form>
  </section>
</template>
