<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="flex justify-between items-center p-4 bg-gray-900 text-white text-center">
    <a
      href="https://github.com/Serena293"
      target="_blank"
      rel="noopener noreferrer"
      class="text-xl hover:text-gray-400"
    >
      <i class="fab fa-github"></i>
    </a>

    <p class="text-sm">&copy; {{ year }} - Serena Ferraro</p>
  </footer>
</template>
