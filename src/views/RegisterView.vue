<script setup>
import BackButton from '@/components/BackButton.vue'
</script>
<template>
  <div class="bg-blue-50">
    <BackButton />
  </div>
  <section class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <form>
      <fieldset class="flex flex-col border-2 py-10 px-20 rounded bg-white">
        <h2 class="text-center text-2xl font-semibold pb-5">Create Account</h2>
        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">First Name</label>
          <input
            id="first-name"
            placeholder="Your name"
            class="border-2 px-2 mt-2 rounded"
          />
        </div>

        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Last Name</label>
          <input
            id="last-name"
            placeholder="Your last name"
            class="border-2 px-2 mt-2 rounded"
          />
        </div>
        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Username</label>
          <input
            id="username"
            type="email"
            placeholder="Username"
            class="border-2 px-2 mt-2 rounded"
          />
        </div>
        
        <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            class="border-2 px-2 mt-2 rounded"
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
          />
          <div class="flex flex-col pb-5">
          <label for="email" class="font-semibold">Confirm Password</label>
          <input
            id="email"
            type="email"
            placeholder="Re-enter password"
            class="border-2 px-2 mt-2 rounded"
          />
        </div>
        </div>
        <button
          type="submit"
          class="border-1 rounded-full font-semibold bg-blue-900 hover:bg-blue-500 text-gray-300 py-1"
        >
          Login
        </button>
      </fieldset>
    </form>
  </section>
</template>
