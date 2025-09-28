<script setup>
import BackButton from '@/components/BackButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useInputClasses } from '@/utilities/useInputClasses'
import { API_BASE_URL } from '@/config/api'

const { normal, error } = useInputClasses()

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errors = reactive({
  email: '',
  password: '',
})
const serverError = ref('')

const emailClass = computed(() => (errors.email ? error : normal))
const passClass = computed(() => (errors.password ? error : normal))

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
  } else if (password.value.length < 8) {
    errors.password = 'Password to short'
  }

  return errors.email === '' && errors.password === ''
}

const login = async (event) => {
  event.preventDefault()
  serverError.value = ''
  // console.log(serverError.value)
  if (!validateForm()) {
    console.log('non validato')
    return
  }
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    if (response.ok) {
      const data = await response.json()
      authStore.login(data.token)
      router.push('/profile')
    } else {
      const errorData = await response.json()

      serverError.value = errorData.error || 'Incorrect Email or Password'

      throw new Error(errorData.error || 'Incorrect Email or password')
    }
  } catch (error) {
    serverError.value = 'Incorrect Email or Password'

    console.error(error)
  }
}
</script>

<template>
  <main class="min-screen-height bg-primary">
    <BackButton />
    <div class="container-responsive">
      <form
        @submit="login"
        class="form-container max-w-md mx-auto"
        role="form"
        aria-label="Login form"
      >
        <fieldset class="form-fieldset">
          <legend class="section-legend ">Login</legend>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              v-model="email"
              class="form-input"
              :class="emailClass"
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
              placeholder="Insert your password"
              v-model="password"
              class="form-input"
              :class="passClass"
              required
              aria-describedby="password-error server-error"
              aria-label="Password"
            />
            <p v-if="errors.password" id="password-error" class="form-error">
              {{ errors.password }}
            </p>
            <p v-if="serverError" id="server-error" class="form-error">{{ serverError }}</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="btn-primary w-full py-3 mt-4"
            aria-label="Log in to your account"
          >
            Login
          </button>

          <!-- Links -->
          <div class="pt-6 text-center">
            <p class="pb-2 text-gray-700 dark:text-gray-300">
              Don't have an account?
              <RouterLink to="/register" class="btn-text" aria-label="Sign up for a new account"
                >Sign up</RouterLink
              >
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Forgot your password?
              <RouterLink to="/forgot-password" class="btn-text" aria-label="Recover your password"
                >Click here</RouterLink
              >
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  </main>
</template>
