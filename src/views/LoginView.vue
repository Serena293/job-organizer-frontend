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
    const response = await fetch('http://localhost:8080/auth/login', {
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
  <main class="min-screen-height bg-primary center-content">
    <form @submit="login" class="form-container" aria-label="Login form">
      <fieldset class="form-fieldset">
        <legend class="form-legend">Login</legend>

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
            aria-required="true"
          />
          <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
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
            aria-required="true"
          />
          <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
          <p v-if="serverError" class="form-error">{{ serverError }}</p>
        </div>

        <!-- Submit -->
        <button type="submit" class="btn-primary mt-4" aria-label="Log in">
          Login
        </button>

        <!-- Links -->
        <div class="pt-4 text-center text-nav">
          <p class="pt-2">
            Don't have an account?
            <RouterLink to="/register" class="btn-text">Sign up</RouterLink>
          </p>
          <p class="pt-1">
            Forgot your password?
            <RouterLink to="/forgot-password" class="btn-text">Click here</RouterLink>
          </p>
        </div>
      </fieldset>
    </form>
  </main>
</template>

